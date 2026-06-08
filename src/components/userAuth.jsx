import { UserContext } from "./user";
import { auth } from "../firebase/config";
import { onAuthStateChanged } from "firebase/auth";
import { fetchUsers } from "../firebase/firestore";
import { useCallback, useEffect, useMemo, useState } from "react";

const UserAuth = ({ children }) => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [userId, setUserId] = useState("");
  const [errorMess, setErrorMess] = useState("");
  const [networkError, setNetworkError] = useState("");
  const [canAccessExam, setCanAccessExam] = useState(false);
  const [activeExamTitle, setActiveExamTitle] = useState("");
  const [examNum, setExamNum] = useState(0);

  const handleExamNum = useCallback(() => {
    setExamNum((prev) => prev + 1);
  }, []);

  const [menuBtn, setMenuBtn] = useState(false);

  const [user, setUser] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const uid = user.uid;
        setUserId(uid);
        if (uid) {
          const userInfo = await fetchUsers(uid);
          if (!userInfo) {
            setNetworkError("Please check your internet connection...");
          } else {
            userInfo.map((data) => {
              setUserData((prev) => ({
                ...prev,
                name: data.name,
                email: data.email,
              }));
            });
          }
        }
        setUser(true);
      } else {
        setUser(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const contextValue = useMemo(
    () => ({
      userData,
      setUserData,
      menuBtn,
      setMenuBtn,
      user,
      examNum,
      setExamNum,
      handleExamNum,
      canAccessExam,
      setCanAccessExam,
      activeExamTitle,
      setActiveExamTitle,
      networkError,
      setNetworkError,
      userId,
      setUserId,
      errorMess,
      setErrorMess,
    }),
    [
      userData,
      menuBtn,
      user,
      examNum,
      handleExamNum,
      canAccessExam,
      setCanAccessExam,
      activeExamTitle,
      setActiveExamTitle,
      networkError,
      setNetworkError,
      userId,
      setUserId,
      errorMess,
      setErrorMess,
    ],
  );

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};

export default UserAuth;
