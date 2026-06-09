import { useParams, Link, useNavigate } from "react-router-dom";
import { MdNavigateNext } from "react-icons/md";
import { useContext, useState, useEffect } from "react";
import { UserContext } from "../../components/user";
import { fetchUserBills, processPayment } from "../../firebase/firestore";

const BillsPage = () => {
  const { billInfo } = useParams();
  const navigate = useNavigate();
  const { userId } = useContext(UserContext);

  const [name, amount, billId] = billInfo.split("&&");
  const [bill, setBill] = useState(null);
  const [formData, setFormData] = useState({
    cardHolder: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    saveCard: false,
  });
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Get bill breakdown based on utility type
  const getBillBreakdown = (utilityName) => {
    const breakdowns = {
      Electricity: [
        { id: 1, label: "Previous Balance", price: 0.0 },
        { id: 2, label: "Standard Usage (420 kWh)", price: 58.8 },
        { id: 3, label: "Peak Time Surcharge", price: 12.45 },
        { id: 4, label: "Environmental Fee", price: 4.2 },
        { id: 5, label: "Service Tax (8%)", price: 6.03 },
      ],
      "Water & Sewage": [
        { id: 1, label: "Previous Balance", price: 0.0 },
        { id: 2, label: "Water Usage (45 m³)", price: 52.5 },
        { id: 3, label: "Sewage Processing Fee", price: 8.75 },
        { id: 4, label: "Environmental Levy", price: 2.95 },
        { id: 5, label: "Service Tax (8%)", price: 4.0 },
      ],
      Gas: [
        { id: 1, label: "Previous Balance", price: 0.0 },
        { id: 2, label: "Gas Usage (250 units)", price: 32.5 },
        { id: 3, label: "Fuel Surcharge", price: 5.25 },
        { id: 4, label: "Safety Equipment Fee", price: 2.5 },
        { id: 5, label: "Service Tax (8%)", price: 5.5 },
      ],
      Internet: [
        { id: 1, label: "Previous Balance", price: 0.0 },
        { id: 2, label: "Monthly Plan (100 Mbps)", price: 45.0 },
        { id: 3, label: "Equipment Fee", price: 5.99 },
        { id: 4, label: "Network Maintenance", price: 3.5 },
        { id: 5, label: "Service Tax (8%)", price: 5.5 },
      ],
    };
    return breakdowns[utilityName] || breakdowns.Electricity;
  };

  const billBreakdown = getBillBreakdown(name);
  const totalAmount = parseFloat(amount);

  useEffect(() => {
    // Fetch bill details from Firestore
    if (userId) {
      fetchUserBills(userId).then((bills) => {
        const foundBill = bills.find((b) => b.id === billId);
        if (foundBill) {
          setBill(foundBill);
        }
      });
    }
  }, [userId, billId]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const validateForm = () => {
    if (!formData.cardHolder.trim()) {
      setErrorMessage("Please enter cardholder name");
      return false;
    }
    if (!formData.cardNumber.trim() || formData.cardNumber.length !== 16) {
      setErrorMessage("Please enter a valid 16-digit card number");
      return false;
    }
    if (!formData.expiryDate.match(/^\d{2}\/\d{2}$/)) {
      setErrorMessage("Please enter expiry date in MM/YY format");
      return false;
    }
    if (!formData.cvv.trim() || formData.cvv.length !== 3) {
      setErrorMessage("Please enter a valid 3-digit CVV");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);

      // Process payment
      await processPayment(
        userId,
        billId,
        name,
        totalAmount,
        formData.cardHolder,
      );

      setSuccessMessage(
        `Payment of $${totalAmount.toFixed(2)} processed successfully!`,
      );

      // Redirect to dashboard after 2 seconds
      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);
    } catch (err) {
      console.error("Payment error:", err);
      setErrorMessage("Payment failed. Please try again.");
      setLoading(false);
    }
  };

  return (
    <section className="w-full flex flex-col items-start justify-start gap-6 sm:gap-8 px-4 sm:px-8 md:px-12 lg:px-20 py-4 sm:py-8">
      <div className="w-full flex flex-col sm:flex-row items-start sm:items-center gap-2 text-xs text-[#434654] mb-2 sm:mb-5 flex-wrap">
        <Link to="/dashboard">Dashboard</Link>{" "}
        <MdNavigateNext className="hidden sm:block" />{" "}
        <Link to="." className="">
          Bills
        </Link>
        <span className="hidden sm:inline">
          <MdNavigateNext />
        </span>{" "}
        <span className="text-xs font-bold text-[#091C35]">
          {name} - ${totalAmount.toFixed(2)}
        </span>
      </div>

      <div className="w-full flex flex-col lg:flex-row items-start gap-4 sm:gap-6">
        <div className="w-full flex flex-col items-start gap-4 sm:gap-6">
          <div className="box w-full lg:max-w-[643.33px] h-auto rounded-lg p-4 sm:p-6 lg:p-8 flex flex-col gap-3 sm:gap-4">
            <div className="w-full flex flex-col sm:flex-row items-start sm:items-center justify-between border-[#C3C6D6] border-b pb-3 sm:pb-4 gap-2 sm:gap-0">
              <div>
                <h2 className="text-xl sm:text-2xl font-medium text-[#091C35]">
                  {name}
                </h2>
                <p className="text-[#434654] text-xs sm:text-sm">
                  Account: {bill?.accountNumber || "#1234-5678-9012"}
                </p>
              </div>
              <div className="text-[#C4D2FF] text-xs font-semibold px-3 sm:px-4 py-1 rounded-4xl bg-[#0052CC] w-fit whitespace-nowrap">
                DUE {bill?.dueDate || "Oct 15, 2026"}
              </div>
            </div>

            <ul className="flex flex-col gap-3 sm:gap-4 border-[#C3C6D6] border-b pb-3 sm:pb-4">
              {billBreakdown.map((billItem) => (
                <li
                  key={billItem.id}
                  className="w-full flex items-center justify-between text-sm sm:text-base"
                >
                  <span className="text-[#091C35] font-normal">
                    {billItem.label}
                  </span>
                  <span className="text-[#091C35] font-normal text-xs sm:text-[13px]">
                    ${billItem.price.toFixed(2)}
                  </span>
                </li>
              ))}
            </ul>

            <div className="w-full flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0">
              <h3 className="text-xl sm:text-2xl font-medium text-[#091C35]">
                Total Amount
              </h3>
              <h4 className="text-xl sm:text-2xl font-medium text-[#003D9B]">
                ${totalAmount.toFixed(2)}
              </h4>
            </div>
          </div>
        </div>

        <div className="w-full lg:max-w-lg lg:w-full h-fit box flex flex-col gap-6 sm:gap-8 p-4 sm:p-6 lg:p-8">
          <h2 className="text-[#091C35] text-xl sm:text-2xl font-medium">
            Secure Payment
          </h2>

          {successMessage && (
            <div className="w-full bg-[#82F9BE] border border-green-500 text-green-700 px-3 sm:px-4 py-2 sm:py-3 rounded-lg text-xs sm:text-sm">
              {successMessage}
            </div>
          )}

          {errorMessage && (
            <div className="w-full bg-[#FFE0E0] border border-red-500 text-red-700 px-3 sm:px-4 py-2 sm:py-3 rounded-lg text-xs sm:text-sm">
              {errorMessage}
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="w-full flex flex-col gap-3 sm:gap-4"
          >
            <label className="flex flex-col gap-2 text-[#434654] text-xs font-semibold">
              Cardholder Name
              <input
                required
                type="text"
                name="cardHolder"
                placeholder="Johnathan Doe"
                value={formData.cardHolder}
                onChange={handleInputChange}
                disabled={loading}
                className="placeholder:text-[#6B7280] placeholder:text-sm sm:placeholder:text-[16px] placeholder:font-normal rounded-lg box px-3 sm:px-4 py-2 sm:py-3.25 outline-none w-full disabled:opacity-50 text-sm"
              />
            </label>

            <label className="flex flex-col gap-2 text-[#434654] text-xs font-semibold">
              Card Number
              <div className="rounded-lg box px-3 sm:px-4 py-2 sm:py-3.25">
                <input
                  required
                  type="text"
                  name="cardNumber"
                  maxLength="16"
                  placeholder="0000 0000 0000 0000"
                  value={formData.cardNumber}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\s/g, "");
                    if (/^\d*$/.test(value)) {
                      handleInputChange({
                        target: { name: "cardNumber", value },
                      });
                    }
                  }}
                  disabled={loading}
                  className="placeholder:text-[#6B7280] placeholder:text-sm sm:placeholder:text-[16px] placeholder:font-normal outline-none w-full disabled:opacity-50 text-sm"
                />
              </div>
            </label>

            <div className="flex items-center gap-3 sm:gap-4 w-full">
              <label className="flex flex-col gap-2 text-[#434654] text-xs font-semibold w-full">
                Expiry Date
                <input
                  required
                  type="text"
                  name="expiryDate"
                  placeholder="MM / YY"
                  value={formData.expiryDate}
                  onChange={(e) => {
                    let value = e.target.value.replace(/\D/g, "");
                    if (value.length >= 2) {
                      value = value.slice(0, 2) + "/" + value.slice(2, 4);
                    }
                    handleInputChange({
                      target: { name: "expiryDate", value },
                    });
                  }}
                  disabled={loading}
                  className="text-center placeholder:text-center placeholder:text-[#6B7280] placeholder:text-sm sm:placeholder:text-[16px] placeholder:font-normal rounded-lg box px-3 sm:px-4 py-2 sm:py-3.25 outline-none w-full disabled:opacity-50 text-sm"
                />
              </label>

              <label className="flex flex-col gap-2 text-[#434654] text-xs font-semibold w-full">
                CVV
                <input
                  required
                  type="password"
                  name="cvv"
                  maxLength="3"
                  placeholder="***"
                  value={formData.cvv}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, "");
                    handleInputChange({ target: { name: "cvv", value } });
                  }}
                  disabled={loading}
                  className="text-center placeholder:text-center placeholder:text-[#6B7280] placeholder:text-sm sm:placeholder:text-[16px] placeholder:font-normal rounded-lg box px-3 sm:px-4 py-2 sm:py-3.25 outline-none w-full disabled:opacity-50 text-sm"
                />
              </label>
            </div>

            <div className="flex gap-2 sm:gap-3 items-start w-full h-fit m-0 p-0">
              <input
                id="checkbox"
                type="checkbox"
                name="saveCard"
                checked={formData.saveCard}
                onChange={handleInputChange}
                disabled={loading}
                className="border disabled:opacity-50 mt-1 sm:mt-0"
              />
              <label
                htmlFor="checkbox"
                className="max-w-75 w-full text-xs sm:text-sm text-[#434654] leading-5 m-0"
              >
                Save card details for future payments. Your information is
                encrypted and stored securely.
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="bg-[#003D9B] w-full h-10 sm:h-12 rounded-sm text-white text-xs font-semibold disabled:opacity-50"
            >
              {loading ? "Processing..." : `Pay Now $${totalAmount.toFixed(2)}`}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default BillsPage;
