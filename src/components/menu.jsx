import gsap from "gsap";
import { UserContext } from "./user";
import { useGSAP } from "@gsap/react";
import { useContext, useRef } from "react";
import { MdDashboard } from "react-icons/md";
import { HiChartBar } from "react-icons/hi2";
import { IoPersonSharp } from "react-icons/io5";
import { handleLogOut } from "../firebase/firestore";
import { NavLink, useNavigate } from "react-router-dom";

const Menu = () => {
  const navBar = [
    { text: "Dashboard", icon: <MdDashboard size={24} />, to: "." },
    { text: "Performance", icon: <HiChartBar size={24} />, to: "performance" },
  ];

  const styling = {
    background: "#D6E0F6",
    color: "#002045",
  };

  const { userData } = useContext(UserContext);
  const { name, department } = userData;
  const userName = [...name.split(" ")];
  const fullName =
    userName.length > 2
      ? `${name.split(" ")[0]} ${name.split(" ")[2]}`
      : userName.length > 1
        ? `${name.split(" ")[0]} ${name.split(" ")[1]}`
        : name.split(" ")[0];
  const navigate = useNavigate();
  const asideRef = useRef();

  useGSAP(
    () => {
      const menu = asideRef.current;
      const tl = gsap.timeline();

      tl.fromTo(
        menu,
        { xPercent: -100 },
        { xPercent: 0, duration: 0.5 },
      ).fromTo(
        ".animNav",
        { xPercent: -100 },
        { xPercent: 0, duration: 0.5, stagger: 0.25 },
      );
    },
    { scope: asideRef },
  );

  return (
    <aside
      ref={asideRef}
      className="min-h-screen h-full max-w-[256px] w-full bg-[#EFF4F9] flex flex-col gap-4 max-[768px]:hidden p-4"
    >
      <div className="w-full pb-0 p-5">
        <h1 className="text-[28px] font-bold text-[#002045]">EduTest Pro</h1>
      </div>

      <hr />

      <nav className="w-full h-full">
        <ul className="w-full h-fit flex flex-col items-start justify-start">
          {navBar.map((data, index) => (
            <NavLink
              style={({ isActive }) => (isActive ? styling : null)}
              to={data.to}
              key={index}
              end={index > 0 ? false : true}
              className="animNav p-4 flex gap-3 items-center text-[#586377] h-full w-full rounded-sm"
            >
              {data.icon}
              <li className="text-xs font-semibold">{data.text}</li>
            </NavLink>
          ))}
        </ul>
      </nav>

      <div className="flex flex-col gap-4 animNav">
        <div className="flex gap-2 items-center">
          <IoPersonSharp size={34} />
          <div className="flex flex-col">
            <p className="text-[#43474E] text-sm font-bold">{fullName}</p>
            <p className="text-[10px] text-[#43474E] font-bold">
              Department: {department}
            </p>
          </div>
        </div>

        <button
          className="px-6 py-3 min-[481px]:w-full bg-[#002045] rounded-lg text-white"
          onClick={() => {
            handleLogOut();
            navigate("/login");
          }}
        >
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Menu;
