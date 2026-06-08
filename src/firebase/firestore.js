import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  collection,
  getDocs,
  query,
  where,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { auth, db } from "./config";
import { signOut } from "firebase/auth";

// This function is for registering all the users' data to the database
export async function registerUser(name, email, password, uid, user) {
  try {
    await setDoc(doc(db, "users", uid), {
      name,
      email,
      password,
      createdAt: serverTimestamp(),
    });
  } catch (err) {
    console.error("Error registering user:", err);
    throw err;
  }
}

// This function is for fetching all of the users' data from the database
export async function fetchUsers(uid) {
  try {
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);
    const data = [];
    if (docSnap.exists()) {
      data.push(docSnap.data());
    } else {
      return console.log("User doesn't exist");
    }
    return data;
  } catch (err) {
    if (err.code === "unavailable") {
      return "Please check your internet connection";
    }
  }
}

// Initialize user bills (called on first login or setup)
export async function initializeUserBills(uid, name) {
  try {
    const userBillsRef = collection(db, "users", uid, "bills");

    // Check if bills already exist
    const existingBills = await getDocs(userBillsRef);
    if (existingBills.size > 0) {
      return; // Bills already initialized
    }

    // Create default bills for the user
    const defaultBills = [
      {
        name: "Electricity",
        amount: 142.5,
        dueDate: "Oct 5, 2024",
        status: "pending",
        accountNumber: "#4492-011",
        description: "Monthly electricity charges",
        createdAt: serverTimestamp(),
      },
      {
        name: "Water & Sewage",
        amount: 68.2,
        dueDate: "Oct 24, 2024",
        status: "pending",
        accountNumber: "#8831-402",
        description: "Water and sewage utilities",
        createdAt: serverTimestamp(),
      },
      {
        name: "Gas",
        amount: 45.75,
        dueDate: "Oct 10, 2024",
        status: "pending",
        accountNumber: "#5521-789",
        description: "Natural gas supply",
        createdAt: serverTimestamp(),
      },
      {
        name: "Internet",
        amount: 59.99,
        dueDate: "Oct 15, 2024",
        status: "pending",
        accountNumber: "#7742-156",
        description: "Broadband internet service",
        createdAt: serverTimestamp(),
      },
    ];

    // Add bills to Firestore
    for (const bill of defaultBills) {
      await addDoc(userBillsRef, bill);
    }
  } catch (err) {
    console.error("Error initializing user bills:", err);
  }
}

// Fetch all bills for a user
export async function fetchUserBills(uid) {
  try {
    const userBillsRef = collection(db, "users", uid, "bills");
    const querySnapshot = await getDocs(userBillsRef);
    const bills = [];
    querySnapshot.forEach((doc) => {
      bills.push({ id: doc.id, ...doc.data() });
    });
    return bills;
  } catch (err) {
    console.error("Error fetching bills:", err);
    return [];
  }
}

// Process a payment (save to transactions)
export async function processPayment(
  uid,
  billId,
  billName,
  amount,
  cardHolder,
) {
  try {
    const transactionsRef = collection(db, "users", uid, "transactions");

    // Create transaction record
    const transaction = {
      description: `${billName} Payment - ${new Date().toLocaleDateString("en-US", { month: "short" })}`,
      date: new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "2-digit",
      }),
      reference: `TXN-${Math.floor(Math.random() * 1000000)}`,
      status: "PAID",
      amount: `$${amount.toFixed(2)}`,
      cardHolder,
      billId,
      createdAt: serverTimestamp(),
    };

    const docRef = await addDoc(transactionsRef, transaction);

    // Update bill status to paid
    const billRef = doc(db, "users", uid, "bills", billId);
    await updateDoc(billRef, { status: "paid" });

    return docRef.id;
  } catch (err) {
    console.error("Error processing payment:", err);
    throw err;
  }
}

// Fetch transaction history
export async function fetchTransactionHistory(uid) {
  try {
    const transactionsRef = collection(db, "users", uid, "transactions");
    const q = query(transactionsRef);
    const querySnapshot = await getDocs(q);
    const transactions = [];
    querySnapshot.forEach((doc) => {
      transactions.push({ id: doc.id, ...doc.data() });
    });
    // Sort by date (newest first)
    return transactions.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
    );
  } catch (err) {
    console.error("Error fetching transactions:", err);
    return [];
  }
}

// Log Out function
export const handleLogOut = async () => {
  try {
    await signOut(auth);
  } catch (err) {
    console.error("Error logging out: ", err);
  }
};
