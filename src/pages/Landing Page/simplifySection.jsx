import { useContext } from "react";
import { Link } from "react-router-dom";
import { FaCheck } from "react-icons/fa6";
import { UserContext } from "../../components/user";

const SimplifySection = () => {
  const { user } = useContext(UserContext);

  return (
    <section className="w-full flex items-center justify-center py-25 min-[582px]:px-25 max-[582px]:px-15 max-[481px]:px-10 max-[375px]:px-5">
      <div className="max-w-3xl w-full flex flex-col items-center justify-center gap-8">
        <h2 className="font-semibold text-[32px] text-[#091C35] text-center">
          Ready to simplify your life?
        </h2>

        <p className="text-[#434654] min-[481px]:text-lg max-[481px]:text-sm font-normal text-center">
          Join millions of users who trust UtilityPay for their monthly utility
          management.
        </p>

        <Link
          to={user ? "/dashboard" : "/signUp"}
          className="bg-[#003D9B] text-white w-[186.78px] h-14 rounded-lg flex items-center justify-center font-semibold"
        >
          Get Started
        </Link>

        <div className="font-semibold text-[#434654] text-xs flex items-center gap-9">
          <div className="flex gap-1.5 items-center">
            <FaCheck />
            <p>No hidden fees</p>
          </div>

          <div className="flex gap-1.5 items-center">
            <FaCheck />
            <p>Cancel anytime</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SimplifySection;
