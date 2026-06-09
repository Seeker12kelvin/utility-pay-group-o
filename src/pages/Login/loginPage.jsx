import { FaGoogle } from "react-icons/fa";
import animation from "../../images/835.gif";
import { useContext, useState } from "react";
import { auth } from "../../firebase/config";
import { UserContext } from "../../components/user";
import { Link, useNavigate } from "react-router-dom";
import { IoLockClosedOutline } from "react-icons/io5";
import { signInWithEmailAndPassword } from "firebase/auth";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { MdOutlineAccountBalanceWallet, MdOutlineEmail } from "react-icons/md";
import gsap from "gsap";

const LoginPage = () => {
  const { userData, setUserData, setErrorMess } = useContext(UserContext);
  const [loginText, setLoginText] = useState(false);
  const [passVis, setPassVis] = useState(false);
  const [animate, setAnimate] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = userData;

    try {
      setAnimate(true);
      await signInWithEmailAndPassword(auth, email, password);
      setLoginText(true);
      navigate("/dashboard");
    } catch (err) {
      console.error("Login error:", err.code);
      if (err.code === "auth/invalid-credential") {
        const tl = gsap.timeline();
        tl.fromTo(
          ".passerr",
          { opacity: 0, xPercent: 50, zIndex: 0 },
          { opacity: 1, xPercent: 0, zIndex: 10, duration: 0.5 },
        ).to(
          ".passerr",
          { opacity: 0, xPercent: -50, zIndex: 0, duration: 0.5 },
          "+=5",
        );
      }

      setErrorMess(
        "I'm sorry but you do not have an account with us. Sign up?",
      );
      setAnimate(false);
      setLoginText(false);
      console.error(err);
    }
  };

  return (
    <main className="max-md:h-dvh md:h-screen w-full flex flex-col gap-5 p-5 justify-center items-center relative">
      <div className="bg-[#003D9B] text-white rounded-lg h-fit w-fit p-2 flex items-center justify-center">
        <MdOutlineAccountBalanceWallet size={30} />
      </div>

      <div className="flex flex-col justify-center items-center">
        <h1 className="text-[#003D9B] text-[32px] font-bold">UtilityPay</h1>

        <p className="text-[#434654] font-normal text-center">
          Manage your services securely
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="max-w-110 w-full max-h-122.75 h-fit box max-[481px]:p-5 min-[481px]:p-10 relative"
      >
        {!animate ? (
          <div className="h-fit w-full flex flex-col gap-5">
            <label className="text-[#43474E] font-bold text-xs flex flex-col gap-2">
              Email Address
              <div className="border border-[#C3C6D6] bg-[#F9F9FF] h-12 rounded-sm px-4 flex gap-2 justify-between items-center">
                <MdOutlineEmail size={20} />

                <input
                  required
                  type="email"
                  name="student-email"
                  placeholder="name@company.com"
                  onChange={(e) =>
                    setUserData((prev) => ({ ...prev, email: e.target.value }))
                  }
                  className="placeholder:text-[#6B7280] outline-none w-full placeholder:text-[16px] placeholder:font-normal"
                />
              </div>
            </label>

            <label className="text-[#43474E] font-bold text-xs flex flex-col gap-2">
              Password
              <div className="border border-[#C3C6D6] bg-[#F9F9FF] h-12 rounded-sm px-4 flex gap-2 justify-between items-center">
                <IoLockClosedOutline size={20} />
                <input
                  required
                  type={passVis ? "text" : "password"}
                  placeholder="••••••••"
                  name="student-password"
                  onChange={(e) =>
                    setUserData((prev) => ({
                      ...prev,
                      password: e.target.value,
                    }))
                  }
                  className="h-full placeholder:text-[#6B7280] outline-none w-full placeholder:text-[16px] placeholder:font-normal "
                />
                <button
                  type="button"
                  onClick={() => setPassVis((prev) => !prev)}
                >
                  {passVis ? (
                    <IoEyeOutline size={20} />
                  ) : (
                    <IoEyeOffOutline size={20} />
                  )}
                </button>
              </div>
            </label>

            <label className="flex gap-2 items-center text-sm text-[#434654] font-normal max-md:text-xs">
              <input type="checkbox" />
              <p>Remember me for 30 days?</p>
            </label>

            <button
              type="submit"
              className="w-full bg-[#003D9B] p-4 text-white text-xs font-semibold rounded-sm"
            >
              Login to Dashboard
            </button>
          </div>
        ) : (
          <div className="h-full w-full flex justify-center items-center bg-[#ffffff49]">
            <img src={animation} alt="Loading..." className="size-25" />
            {loginText && <p>Login Successful...</p>}
          </div>
        )}
      </form>

      <p className="text-sm text-[#002045] text-center">
        Don't have an account yet?{" "}
        <Link to={"/signup"} className="text-[#003D9B]">
          Create an account
        </Link>
      </p>

      <div className="absolute bottom-1/3 -translate-x-1/2 passerr h-fit bg-[#cddeee] p-2 rounded-sm max-w-85.5 w-fit opacity-0 z-1 flex flex-col gap-2">
        <p className="text-[red] text-sm text-center">
          Incorrect password or email
        </p>
      </div>
    </main>
  );
};

export default LoginPage;
