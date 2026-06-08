import { BsPatchCheckFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import bg_image from "../../images/AB6AXuDUsjoI1vR6EmaHRSfR8n26_AUcq4DRE_5SZVKRCsAvMS_8wlz5dkaxCcosu03RA4AGonjLaBBkQlR2W24XuJH9IoLzwdOli2Z8qeefDHBZQZj1fbAD27iTGK2Fdqcfb5ARA1IzhNH3lKivvq-qMJQwfld6fbcTkma-rLeI2SWWZPDowthD39ZeXNK6R62eo8md4pbVW9VqrqZsr_F6yGkjKA2W9yfRyQpdyNVVU3kk7VODR00r.png";

const HeroSection = () => {
  return (
    <section
      id="hero-section"
      style={{ backgroundImage: `url(${bg_image})` }}
      className="h-150 w-full bg-cover bg-no-repeat flex justify-center items-center max-[687px]:px-5"
    >
      <div className="w-full max-w-3xl h-full flex flex-col justify-center items-center min-[687px]:gap-8 max-[687px]:gap-4">
        <div className="bg-[#0052cc9b] py-2 px-4 rounded-4xl flex items-center gap-2">
          <BsPatchCheckFill size={20} className="text-[#003e9b]" />
          <p className="text-[#003e9b] text-xs font-semibold">
            Trusted by 2M+ Households
          </p>
        </div>

        <h1 className="max-[481px]:text-[40px] max-[687px]:text-[54px] min-[687px]:text-[64px] font-semibold text-[#003D9B] max-w-[577.42px] w-full tracking-[-1.28px] text-center leading-normal">
          Powering Your Life,{" "}
          <span className="text-[#00687B]">Simplified.</span>
        </h1>

        <p className="text-[#434654] font-normal text-lg max-w-[668.16px] w-full text-center max-[687px]:text-sm">
          Manage your electricity and water payments in one secure, unified
          dashboard. Transparent billing, instant confirmations, and zero
          stress.
        </p>

        <Link
          to="/signUp"
          className="bg-[#003D9B] text-white w-[186.78px] h-14 rounded-lg flex items-center justify-center font-semibold"
        >
          Get Started
        </Link>
      </div>
    </section>
  );
};

export default HeroSection;
