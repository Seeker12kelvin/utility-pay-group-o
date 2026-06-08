import { NavLink, Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "./user";
import { handleLogOut } from "../firebase/firestore";
import { MdLogout } from "react-icons/md";
import MenuBtn from "./menuBtn";

const Haeder = () => {
  const { user, userData } = useContext(UserContext);
  const navigate = useNavigate();

  const lists = [
    { id: 1, text: "Dashboard" },
    { id: 2, text: "History" },
    { id: 3, text: "Support" },
  ];

  const handleLogoutClick = async () => {
    await handleLogOut();
    navigate("/");
  };

  return (
    <header className="w-full flex items-center justify-between max-[481px]:px-5 max-[768px]:px-10 min-[768px]:px-20 py-10 h-10">
      <h1 className="text-[#003D9B] font-bold text-2xl">
        <Link to="/">UtilityPay</Link>
      </h1>

      <nav className="w-fit max-[800px]:hidden">
        <ul className="flex items-center gap-5 w-fit">
          {lists.map((data) => (
            <li key={data.id} className="font-medium text-[#434654]">
              <NavLink
                to={`/${data.text.toLowerCase()}`}
                style={({ isActive }) => ({
                  color: isActive ? "#003D9B" : "#434654",
                  paddingBottom: "10px",
                  fontWeight: isActive ? "700" : "400",
                  borderBottomWidth: isActive ? "3px" : "0px",
                  borderColor: isActive ? "#003D9B" : "#434654",
                })}
                className="hover:text-[#003D9B]"
              >
                {data.text}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className="flex gap-7 items-center">
        {user ? (
          <>
            <span className="text-[#434654] font-medium text-sm max-[481px]:hidden">
              {userData.name}
            </span>
            <button
              onClick={handleLogoutClick}
              className="text-white bg-[#BA1A1A] py-2 px-3 text-xs font-semibold rounded-sm flex items-center gap-2 h-8 max-[481px]:hidden"
            >
              <MdLogout size={16} />
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to={"/login"}
              className="font-medium text-sm text-[#434654] max-[481px]:hidden"
            >
              Login
            </Link>
            <Link
              to={"/signUp"}
              className="text-white bg-[#003D9B] py-5 px-2 text-xs font-semibold rounded-sm w-[85.14px] h-8 flex justify-center items-center max-[481px]:hidden"
            >
              Sign Up
            </Link>
          </>
        )}

        <MenuBtn />
      </div>
    </header>
  );
};

export default Haeder;
