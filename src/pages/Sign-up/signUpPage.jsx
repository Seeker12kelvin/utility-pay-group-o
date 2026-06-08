import SignUpPageForm from "./signUpPageForm";
import { MdOutlineAccountBalanceWallet } from "react-icons/md";

const SignUpPage = () => {
  return (
    <main className="h-screen w-full flex flex-col max-sm:gap-1 sm:gap-4 p-5 justify-center items-center">
      <div className="flex flex-col gap-6 items-center w-full">
        <div className="bg-[#0052CC] text-white rounded-lg h-14 w-16 flex items-center justify-center">
          <MdOutlineAccountBalanceWallet size={24} />
        </div>

        <div className="flex flex-col justify-center items-center">
          <h1 className="text-[#002045] text-[32px] font-bold">
            Create Your Account
          </h1>

          <p className="text-[#434654] font-normal text-center">
            Secure access to your utility management
          </p>
        </div>

        <SignUpPageForm />
      </div>
    </main>
  );
};

export default SignUpPage;
