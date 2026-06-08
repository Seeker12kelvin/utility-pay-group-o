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
      navigate("/");
      setErrorMess(
        "I'm sorry but you do not have an account with us. Sign up?",
      );
      setAnimate(false);
      setLoginText(false);
      console.error(err);
    }
  };

  return (
    <main className="max-md:h-dvh md:h-screen w-full flex flex-col gap-5 p-5 justify-center items-center">
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
        className="max-w-110 w-full max-h-122.75 h-fit box max-[481px]:p-5 min-[481px]:p-10"
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
              <input type="checkbox" required />
              <p>Remember me for 30 days</p>
            </label>

            <button
              type="submit"
              className="w-full bg-[#003D9B] p-4 text-white text-xs font-semibold rounded-sm"
            >
              Login to Dashboard
            </button>

            <div className="flex gap-2 items-center justify-between">
              <hr className="border-[#C3C6D6] border max-[375px]:w-[25%] max-[481px]:w-[30%] min-[481px]:w-[30%]" />
              <p className="text-[#434654] text-sm text-center">
                or continue with
              </p>
              <hr className="border-[#C3C6D6] border max-[375px]:w-[25%] max-[481px]:w-[30%] min-[481px]:w-[30%]" />
            </div>

            <button className="border-[#091C35] border h-11.5 text-xs font-semibold flex gap-2 items-center justify-center">
              <FaGoogle size={20} />
              Google
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
        <Link to={"/"} className="text-[#003D9B]">
          Create an account
        </Link>
      </p>
    </main>
  );
};

export default LoginPage;
