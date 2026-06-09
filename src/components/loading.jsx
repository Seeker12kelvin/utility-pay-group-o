import gsap from "gsap";
import { UserContext } from "./user";
import { useGSAP } from "@gsap/react";
import animation from "../images/835.gif";
import { useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";

const Loading = ({ text }) => {
  const { networkError, user } = useContext(UserContext);

  const errorRef = useRef();
  const navigate = useNavigate();

  useGSAP(
    () => {
      if (!user) {
        navigate("/login");
      }
      gsap.fromTo(
        errorRef.current,
        {
          clipPath: "inset(0% 100% 0% 0%)",
        },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 1,
        },
      );
    },
    { scope: errorRef },
  );

  return (
    <div className="h-dvh w-full flex flex-col gap-3 justify-center items-center bg-[#ffffff49] border">
      <img src={animation} alt="Loading..." className="size-25" />
      {networkError ||
        (text && (
          <h1 ref={errorRef} className="text-lg text-[#ff0000b0] text-center">
            {networkError || text}
          </h1>
        ))}
    </div>
  );
};

export default Loading;
