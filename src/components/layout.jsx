import Footer from "./footer";
import Haeder from "./haeder";
import { useContext } from "react";
import { UserContext } from "./user";
import MobileMenu from "./mobileMenu";
import { Outlet } from "react-router-dom";

const Layout = () => {
  const { menuBtn } = useContext(UserContext);
  return (
    <>
      <Haeder />
      <main className="w-screen min-h-screen h-fit flex flex-col items-center">
        {menuBtn && <MobileMenu />}
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Layout;
