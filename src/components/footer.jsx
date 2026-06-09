const Footer = () => {
  return (
    <footer className="w-full flex flex-wrap items-start gap-10 justify-between bg-[#E7EEFF] py-8 max-[687px]:px-10 min-[687px]:px-20">
      <div className="flex flex-col gap-4 items-start">
        <h2 className="text-lg font-bold">UtilityPay</h2>
        <p className="text-sm font-normal text-[#434654] max-w-77 w-full">
          The world's most trusted platform for utility bill management.
        </p>
      </div>
      <div className="flex gap-30 items-start">
        <div className="text-[#434654] text-sm font-normal flex flex-col gap-2">
          <p>Privacy Policy</p>
          <p>Terms of Service</p>
        </div>

        <div className="text-[#434654] text-sm font-normal flex flex-col gap-2">
          <p>Security Guarantee</p>
          <p>Contact Us</p>
        </div>
      </div>
      <div>
        <p className="text-[#434654] text-sm font-normal">
          © 2026 UtilityPay Secure Systems.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
