import gsap from "gsap";
import { auth } from "../../firebase/config";
import animation from "../../images/835.gif";
import { MdOutlineEmail } from "react-icons/md";
import { MdOutlinePerson } from "react-icons/md";
import { UserContext } from "../../components/user";
import { Link, useNavigate } from "react-router-dom";
import { IoLockClosedOutline } from "react-icons/io5";
import { registerUser } from "../../firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";

const SignUpPageForm = () => {
  const { userData, setUserData, errorMess, setErrorMess } =
    useContext(UserContext);
  const [passVis, setPassVis] = useState(false);
  const [animate, setAnimate] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!navigator.onLine) {
      return setErrorMess(
        "I'm sorry but you are offline. Please come back online to continue this process.",
      );
    }

    const { name, email, password } = userData;

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/;

    const isPasswordTrue = passwordRegex.test(password);

    if (isPasswordTrue) {
      try {
        setAnimate(true);
        // This is for registering the users' email and password
        const userCrendentials = await createUserWithEmailAndPassword(
          auth,
          email,
          password,
        );

        const user = userCrendentials.user;
        const uid = user.uid;

        // This is calling the registerUser function
        try {
          await registerUser(name, email, password, uid, user);
          navigate("/login");
        } catch (err) {
          setAnimate(false);
          try {
            await user.delete();
          } catch (err) {
            console.log(err);
          }

          setErrorMess("Network error, please try again");

          if (err.code?.includes("unavailable")) {
            setErrorMess(
              "Network error: please make sure you are connected to the internet",
            );
          }
        }
      } catch (err) {
        if (err.code === "auth/email-already-in-use") {
          const tl = gsap.timeline();

          tl.fromTo(
            "emailError",
            { opacity: 0, xPercent: 50, zIndex: 0 },
            { opacity: 1, xPercent: 0, zIndex: 10, duration: 0.5 },
          ).to(
            "emailError",
            { opacity: 0, xPercent: -50, zIndex: 0, duration: 0.5 },
            "+=3",
          );
        } else {
          if (err.code === "unavailable") {
            setErrorMess(
              "Network error: please make sure you are connected to the internet",
            );
            setAnimate(false);
          }
        }
      }
    } else {
      const tl = gsap.timeline();
      tl.fromTo(
        ".passwarn",
        { opacity: 0, xPercent: 50, zIndex: 0 },
        { opacity: 1, xPercent: 0, zIndex: 10, duration: 0.5 },
      ).to(
        ".passwarn",
        { opacity: 0, xPercent: -50, zIndex: 0, duration: 0.5 },
        "+=5",
      );
    }
  };

  useEffect(() => {
    if (errorMess != "") {
      const tl = gsap.timeline();
      tl.fromTo(
        ".errorwarn",
        { opacity: 0, xPercent: 50 },
        { opacity: 1, xPercent: 0, duration: 0.5 },
      )
        .to(".errorwarn", { opacity: 0, xPercent: -50, duration: 0.5 }, "+=3")
        .call(() => setErrorMess(""));
    }
  }, [errorMess, setErrorMess]);

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-120 w-full max-h-139.25 h-fit box max-[481px]:p-5 min-[481px]:p-10 relative"
    >
      {!animate ? (
        <div className="h-fit w-full flex flex-col gap-6">
          <div className="h-fit w-full flex flex-col gap-4">
            <label className="text-[#43474E] font-bold text-xs flex flex-col gap-2">
              Full Name
              <div className="border border-[#C3C6D6] bg-[#F9F9FF] h-12 rounded-sm px-4 flex gap-2 justify-between items-center">
                <MdOutlinePerson size={20} />
                <input
                  required
                  type="text"
                  placeholder="Enter your full name"
                  name="student-full-name"
                  onChange={(e) =>
                    setUserData((prev) => ({ ...prev, name: e.target.value }))
                  }
                  className="placeholder:text-[#6B7280] outline-none w-full placeholder:text-[16px] placeholder:font-normal"
                />
              </div>
            </label>

            <label className="text-[#43474E] font-bold text-xs flex flex-col gap-2">
              Email Address
              <div className="border border-[#C3C6D6] bg-[#F9F9FF] h-12 rounded-sm px-4 flex gap-2 justify-between items-center">
                <MdOutlineEmail size={20} />

                <input
                  required
                  type="email"
                  name="student-email"
                  placeholder="example@utilitypay.com"
                  onChange={(e) =>
                    setUserData((prev) => ({ ...prev, email: e.target.value }))
                  }
                  className="placeholder:text-[#6B7280] outline-none w-full placeholder:text-[16px] placeholder:font-normal"
                />
              </div>
              <div className="absolute bottom-20 -translate-x-1/2 emailError h-fit bg-[#cddeee] p-2 rounded-sm max-w-85.5 w-full opacity-0 -z-1">
                <p className="text-sm text-[red]">Email already exists</p>
              </div>
            </label>

            <label className="text-[#43474E] font-bold text-xs flex flex-col gap-2">
              Password
              <div className="border border-[#C3C6D6] bg-[#F9F9FF] h-12 rounded-sm px-4 flex gap-2 justify-between items-center">
                <IoLockClosedOutline size={20} />
                <input
                  required
                  type={passVis ? "text" : "password"}
                  placeholder="Min. 8 characters"
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
              <div className="absolute bottom-20 -translate-x-1/2 passwarn h-fit bg-[#cddeee] p-2 rounded-sm max-w-85.5 w-full opacity-0 -z-1 flex flex-col gap-2">
                <p className="text-sm text-[#43474E]">
                  Password must contain at least one of the following:
                </p>
                <ul className="leading-5 ml-3.5">
                  <li className="text-xs text-[#666] list-disc">
                    At least one lowercase letter
                  </li>
                  <li className="text-xs text-[#666] list-disc">
                    At least one uppercase letter
                  </li>
                  <li className="text-xs text-[#666] list-disc">
                    At least one digit
                  </li>
                  <li className="text-xs text-[#666] list-disc">
                    At least one special character
                  </li>
                  <li className="text-xs text-[#666] list-disc">
                    Minimum of 8 characters
                  </li>
                </ul>
              </div>
            </label>
          </div>

          <button
            type="submit"
            className="w-full bg-[#003D9B] py-4 text-white text-sm font-semibold flex justify-center items-center rounded-sm"
          >
            CREATE ACCOUNT
          </button>
          <label className="flex gap-2 items-center">
            <input type="checkbox" required />
            <p className="text-sm text-[#434654] font-normal max-[481px]:text-xs">
              I agree to the{" "}
              <span className="text-[#003D9B]">Terms of Service</span> and{" "}
              <span className="text-[#003D9B]">Privacy Policy.</span>
            </p>
          </label>

          <hr />

          <p className="text-sm text-[#434654] font-normal max-[481px]:text-xs text-center">
            Already have an account?{" "}
            <Link to={"/login"} className="text-[#003D9B]">
              Log In
            </Link>
          </p>
        </div>
      ) : (
        <div className="h-full w-full flex flex-col gap-3 justify-center items-center bg-[#ffffff49]">
          <img src={animation} alt="Loading..." className="size-25" />
          {errorMess && (
            <h1 className="text-lg text-[#ff0000b0] text-center">
              {errorMess}
            </h1>
          )}
        </div>
      )}

      {errorMess && (
        <div className="absolute bottom-1/2 -translate-y-1/2 errorwarn h-fit bg-[#cddeee] p-2 rounded-sm max-w-85.5 w-full">
          <p className="text-lg text-[#002045] text-center font-semibold">
            {errorMess}
          </p>
        </div>
      )}
    </form>
  );
};

export default SignUpPageForm;
