import gsap from "gsap";
import { UserContext } from "./user";
import { useGSAP } from "@gsap/react";
import { MdLogout } from "react-icons/md";
import { useContext, useRef } from "react";
import { IoMdClose } from "react-icons/io";
import { handleLogOut } from "../firebase/firestore";
import { Link, NavLink, useNavigate } from "react-router-dom";

const MobileMenu = () => {
  const lists = [
    { id: 1, text: "Dashboard" },
    { id: 2, text: "Bills" },
    { id: 3, text: "History" },
    { id: 4, text: "Support" },
  ];

  const { setMenuBtn, user, userData } = useContext(UserContext);
  const navigate = useNavigate();
  const handleLogoutClick = async () => {
    await handleLogOut();
    navigate("/");
  };

  const asideRef = useRef();

  useGSAP(
    () => {
      const menu = asideRef.current;
      const tl = gsap.timeline();

      tl.fromTo(menu, { xPercent: 100 }, { xPercent: 0, duration: 0.2 }).fromTo(
        ".animNav",
        { xPercent: 100 },
        { xPercent: 0, duration: 0.2, stagger: 0.1 },
      );
    },
    { scope: asideRef },
  );

  const exitAnimation = () => {
    const menu = asideRef.current;
    const tl = gsap.timeline();

    tl.fromTo(
      ".animNav",
      { xPercent: 0 },
      { xPercent: 100, duration: 0.2, stagger: 0.1, reversed: true },
    )
      .fromTo(menu, { xPercent: 0 }, { xPercent: 100, duration: 0.2 })
      .call(() => setMenuBtn(false));
  };

  return (
    <aside
      ref={asideRef}
      className="h-dvh min-[481px]:max-w-62.5 fixed right-0 w-fit bg-[#DFE8FF] flex flex-col z-100 gap-2 p-4 inset-y-0 min-[800px]:hidden"
    >
      <div className="h-fit w-full flex flex-col justify-center">
        <button onClick={() => exitAnimation()} className="p-2 self-center">
          <IoMdClose size={24} />
        </button>

        <div className="w-full p-4">
          <h1 className="text-[#003D9B] font-bold text-2xl">
            <Link to="/">UtilityPay</Link>
          </h1>
        </div>
      </div>

      <nav className="w-full">
        <ul className="flex flex-col items-center gap-8 w-full text-center">
          {lists.map((data) => (
            <li key={data.id} className="font-medium text-[#434654]">
              <NavLink
                onClick={() => exitAnimation()}
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

      <div className="flex flex-col gap-4 mt-auto">
        {user ? (
          <>
            <span className="text-[#434654] font-medium text-sm min-[481px]:hidden text-center">
              <span className="font-bold">Name:</span> {userData.name}
            </span>
            <button
              onClick={handleLogoutClick}
              className="text-white bg-[#BA1A1A] py-2 px-3 text-xs font-semibold rounded-sm flex items-center justify-center gap-2 h-8 min-[481px]:hidden"
            >
              <MdLogout size={16} />
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to={"/login"}
              className="font-medium text-sm text-[#434654] min-[481px]:hidden"
            >
              Login
            </Link>
            <Link
              to={"/signUp"}
              className="text-white bg-[#003D9B] py-5 px-2 text-xs font-semibold rounded-sm w-[85.14px] h-8 flex justify-center items-center min-[481px]:hidden"
            >
              Sign Up
            </Link>
          </>
        )}
      </div>
    </aside>
  );
};

export default MobileMenu;
