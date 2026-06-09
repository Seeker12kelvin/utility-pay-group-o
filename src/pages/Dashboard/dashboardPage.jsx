import { Link } from "react-router-dom";
import { FaBolt } from "react-icons/fa";
import { SlRefresh } from "react-icons/sl";
import { FaArrowRight } from "react-icons/fa";
import { UserContext } from "../../components/user";
import {
  fetchUserBills,
  fetchTransactionHistory,
  initializeUserBills,
} from "../../firebase/firestore";
import { useContext, useState, useEffect } from "react";

const DashboardPage = () => {
  const { userData, userId } = useContext(UserContext);
  const [bills, setBills] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [pendingCount, setPendingCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) return;

    const loadData = async () => {
      try {
        // Initialize bills on first login
        await initializeUserBills(userId, userData.name);

        // Fetch bills
        const userBills = await fetchUserBills(userId);
        setBills(userBills);

        // Count pending bills
        const pending = userBills.filter(
          (bill) => bill.status === "pending",
        ).length;
        setPendingCount(pending);

        // Fetch transactions
        const userTransactions = await fetchTransactionHistory(userId);
        setTransactions(userTransactions);

        setLoading(false);
      } catch (err) {
        console.error("Error loading dashboard data:", err);
        setLoading(false);
      }
    };

    loadData();
  }, [userId, userData.name]);

  const calculateDaysUntilDue = (dueDate) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getPendingBills = () => {
    return bills.filter((bill) => bill.status === "pending").slice(0, 2);
  };

  const getBillColor = (name) => {
    const colors = {
      Electricity: {
        icon: "bg-[#0052CC]",
        text: "text-[#003D9B]",
        border: "[#003D9B]",
      },
      "Water & Sewage": {
        icon: "bg-[#0052CC]",
        text: "text-[#00687B]",
        border: "[#00687B]",
      },
      Gas: {
        icon: "bg-[#0052CC]",
        text: "text-[#556B2F]",
        border: "[#556B2F]",
      },
      Internet: {
        icon: "bg-[#0052CC]",
        text: "text-[#663399]",
        border: "[#663399]",
      },
    };
    return colors[name] || colors["Electricity"];
  };

  return (
    <section className="h-full w-full px-4 sm:px-8 md:px-12 lg:px-20 py-4 sm:py-8 flex flex-col gap-6 sm:gap-8">
      <div className="w-full">
        <h1 className="text-[#091C35] text-2xl sm:text-[32px] font-semibold tracking-[-0.32px]">
          Good Morning, {userData.name || "User"}
        </h1>
        <p className="text-[#434654] font-normal text-sm sm:text-base">
          Here is an overview of your current utility status.
        </p>
      </div>

      {loading ? (
        <div className="w-full h-96 flex items-center justify-center">
          <p className="text-[#434654] text-lg">Loading your utilities...</p>
        </div>
      ) : (
        <div className="w-full flex flex-col gap-4 sm:gap-6">
          <div className="w-full flex flex-col lg:flex-row gap-4 sm:gap-6">
            <div className="w-full lg:flex-1 h-auto p-4 sm:p-6 bg-white box flex flex-col gap-4">
              <div className="flex flex-col sm:flex-row justify-between w-full items-start sm:items-center gap-2 sm:gap-0">
                <h2 className="text-[#091C35] text-xl sm:text-2xl font-medium">
                  Utilities
                </h2>

                <div className="bg-[#FFDAD6] rounded-4xl px-3 py-1 w-fit">
                  <p className="text-xs text-[#93000A] font-semibold">
                    {pendingCount} Bills Pending
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 w-full">
                {getPendingBills().length > 0 ? (
                  getPendingBills().map((bill) => {
                    const daysUntilDue = calculateDaysUntilDue(bill.dueDate);
                    const colors = getBillColor(bill.name);
                    return (
                      <div
                        key={bill.id}
                        className="w-full bg-[#E7EEFF] box p-3 sm:p-4 flex flex-col gap-3 sm:gap-4"
                      >
                        <div className="flex gap-2 items-start">
                          <div
                            className={`size-10 flex justify-center items-center rounded-sm ${colors.icon}`}
                          >
                            <FaBolt size={20} />
                          </div>

                          <div className="flex flex-col h-full">
                            <h3 className="text-lg font-bold text-[#091C35]">
                              {bill.name}
                            </h3>
                            <p className="font-semibold text-xs text-[#434654]">
                              Acct: {bill.accountNumber}
                            </p>
                          </div>
                        </div>

                        <div>
                          <p className="text-xs text-[#434654] font-semibold">
                            Amount Due
                          </p>
                          <h3 className={`${colors.text} text-2xl font-medium`}>
                            ${bill.amount.toFixed(2)}
                          </h3>
                          <p
                            className={
                              daysUntilDue < 0
                                ? "text-[#BA1A1A]"
                                : "text-[#434654]"
                            }
                            style={{ fontSize: "14px" }}
                          >
                            {daysUntilDue < 0
                              ? `Overdue by ${Math.abs(daysUntilDue)} days`
                              : `Due in ${daysUntilDue} days`}
                          </p>
                        </div>

                        <Link
                          to={`/bills/${bill.name}&&${bill.amount}&&${bill.id}`}
                          className={`text-xs font-semibold py-4 text-white rounded-sm flex items-center justify-center ${colors.text === "text-[#003D9B]" ? "bg-[#003D9B]" : "bg-transparent border-2 border-current"}`}
                          style={
                            colors.text !== "text-[#003D9B]"
                              ? {
                                  borderColor: colors.text.replace("text-", ""),
                                }
                              : {}
                          }
                        >
                          Pay Now
                        </Link>
                      </div>
                    );
                  })
                ) : (
                  <p className="w-full text-center text-[#434654]">
                    No pending bills
                  </p>
                )}
              </div>
            </div>
            <div className="w-full lg:w-80 flex flex-col gap-4 sm:gap-6">
              <div className="w-full h-auto sm:h-78.5 p-4 sm:p-6 bg-[#DFE8FF] box flex flex-col justify-between">
                <div className="flex flex-col gap-2">
                  <h2 className="text-2xl text-[#434654] font-medium">
                    Usage Insights
                  </h2>
                  <p className="text-sm font-normal text-[#434654]">
                    Your electricity consumption is 12% lower than last month.
                  </p>
                </div>

                <div className="flex flex-col gap-3">
                  <div className="flex w-full items-end justify-between">
                    <div className="bg-[#003e9b38] w-[55.08px] h-[76.8px]" />
                    <div className="bg-[#003e9b38] w-[55.08px] h-[102.39px]" />
                    <div className="bg-[#003e9b38] w-[55.08px] h-[57.59px]" />
                    <div className="bg-[#003e9b38] w-[55.08px] h-[115.19px]" />
                    <div className="bg-[#003D9B] w-[55.08px] h-[38.39px]" />
                  </div>
                  <p className="text-[#003D9B] text-xs font-semibold flex gap-2 items-center">
                    View Detailed Analytics{" "}
                    <span>
                      <FaArrowRight />
                    </span>
                  </p>
                </div>
              </div>
              <div className="bg-[#20314B] box rounded-lg p-4 sm:p-6 w-full h-auto sm:h-24 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-3 sm:gap-0">
                <div>
                  <p className="text-xs font-semibold text-[#ECF0FF] opacity-80">
                    Next Auto-Pay
                  </p>
                  <h2 className="text-[#ECF0FF] text-2xl font-medium">
                    Nov 01
                  </h2>
                </div>

                <button className="size-12 flex items-center justify-center text-white box rounded-xl bg-transparent">
                  <SlRefresh size={20} />
                </button>
              </div>
            </div>
          </div>

          {/* Recent Transactions */}
          <div className="w-full box bg-[#F0F3FF] overflow-x-auto">
            <div className="w-full flex flex-col sm:flex-row justify-between items-start sm:items-center px-4 sm:px-6 py-3 sm:py-4 gap-2">
              <h2 className="text-xl sm:text-2xl font-medium text-[#091C35]">
                Recent Transactions
              </h2>

              <Link className="text-[#003D9B] font-semibold text-xs whitespace-nowrap">
                View All History
              </Link>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full rounded-b-lg min-w-full">
                <thead className="w-full">
                  <tr className="text-left items-center w-full h-12.5 border-[#C3C6D6] border-t">
                    <th className="font-semibold text-[#434654] text-xs pl-6">
                      Description
                    </th>
                    <th className="font-semibold text-[#434654] text-xs">
                      Date
                    </th>
                    <th className="font-semibold text-[#434654] text-xs">
                      Reference
                    </th>
                    <th className="font-semibold text-[#434654] text-xs">
                      Status
                    </th>
                    <th className="font-semibold text-[#434654] text-xs">
                      Amount
                    </th>
                  </tr>
                </thead>

                <tbody className="bg-white ">
                  {transactions.length > 0 ? (
                    transactions.slice(0, 5).map((txn) => (
                      <tr
                        key={txn.id}
                        className="w-full h-16.25 border-[#C3C6D6] border-t"
                      >
                        <td className="text-[#091C35] font-medium pl-6">
                          {txn.description}
                        </td>
                        <td className="font-normal text-sm text-[#434654]">
                          {txn.date}
                        </td>
                        <td className="text-[13px] text-normal text-[#091C35]">
                          {txn.reference}
                        </td>
                        <td>
                          <div className="bg-[#82F9BE] px-3 py-1 text-[11px] font-bold rounded-4xl w-fit">
                            {txn.status}
                          </div>
                        </td>
                        <td className="font-bold text-[#091C35]">
                          {txn.amount}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="5"
                        className="text-center py-8 text-[#434654]"
                      >
                        No transactions yet
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default DashboardPage;
