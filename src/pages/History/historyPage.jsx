import { useContext, useState, useEffect } from "react";
import { UserContext } from "../../components/user";
import { fetchTransactionHistory } from "../../firebase/firestore";
import { MdNavigateNext } from "react-icons/md";
import { Link } from "react-router-dom";

const HistoryPage = () => {
  const { userId } = useContext(UserContext);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState("all");

  useEffect(() => {
    if (!userId) return;

    const loadTransactions = async () => {
      try {
        const userTransactions = await fetchTransactionHistory(userId);
        setTransactions(userTransactions);
        setLoading(false);
      } catch (err) {
        console.error("Error loading transaction history:", err);
        setLoading(false);
      }
    };

    loadTransactions();
  }, [userId]);

  const filteredTransactions = transactions.filter((txn) => {
    if (filterStatus === "all") return true;
    return txn.status.toLowerCase() === filterStatus.toLowerCase();
  });

  return (
    <section className="w-full flex flex-col items-start justify-start gap-6 sm:gap-8 px-4 sm:px-8 md:px-12 lg:px-20 py-4 sm:py-8">
      <div className="w-full flex items-center gap-2 text-xs text-[#434654] mb-2 sm:mb-5 flex-wrap">
        <Link to="/dashboard">Dashboard</Link>{" "}
        <MdNavigateNext className="hidden sm:block" />{" "}
        <span className="text-xs font-bold text-[#091C35]">
          Transaction History
        </span>
      </div>

      <div className="w-full">
        <h1 className="text-[#091C35] text-2xl sm:text-[32px] font-semibold tracking-[-0.32px]">
          Payment History
        </h1>
        <p className="text-[#434654] font-normal text-sm sm:text-base">
          View all your utility payment transactions.
        </p>
      </div>

      {loading ? (
        <div className="w-full h-64 sm:h-96 flex items-center justify-center">
          <p className="text-[#434654] text-base sm:text-lg">
            Loading transaction history...
          </p>
        </div>
      ) : (
        <div className="w-full flex flex-col gap-4 sm:gap-6">
          {/* Filter Buttons */}
          <div className="flex flex-wrap gap-2 sm:gap-3">
            <button
              onClick={() => setFilterStatus("all")}
              className={`px-3 sm:px-4 py-2 rounded-lg font-semibold text-xs sm:text-sm whitespace-nowrap ${
                filterStatus === "all"
                  ? "bg-[#003D9B] text-white"
                  : "bg-[#F0F3FF] text-[#003D9B]"
              }`}
            >
              All Transactions ({transactions.length})
            </button>
            <button
              onClick={() => setFilterStatus("paid")}
              className={`px-3 sm:px-4 py-2 rounded-lg font-semibold text-xs sm:text-sm whitespace-nowrap ${
                filterStatus === "paid"
                  ? "bg-[#003D9B] text-white"
                  : "bg-[#F0F3FF] text-[#003D9B]"
              }`}
            >
              Paid ({transactions.filter((t) => t.status === "PAID").length})
            </button>
          </div>

          {/* Transactions Table */}
          <div className="w-full box bg-[#F0F3FF] overflow-x-auto">
            {filteredTransactions.length > 0 ? (
              <>
                <div className="w-full px-3 sm:px-6 py-3 sm:py-4">
                  <h2 className="text-lg sm:text-2xl font-medium text-[#091C35]">
                    {filterStatus === "all"
                      ? "All Transactions"
                      : `${filterStatus.toUpperCase()} Transactions`}
                  </h2>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full rounded-b-lg min-w-full">
                    <thead className="w-full">
                      <tr className="text-left items-center w-full h-auto sm:h-12.5 border-[#C3C6D6] border-t text-xs sm:text-sm">
                        <th className="font-semibold text-[#434654] text-xs px-3 sm:pl-6 py-2 sm:py-0">
                          Description
                        </th>
                        <th className="font-semibold text-[#434654] text-xs px-2 sm:px-3 py-2 sm:py-0">
                          Date
                        </th>
                        <th className="font-semibold text-[#434654] text-xs px-2 sm:px-3 py-2 sm:py-0">
                          Reference
                        </th>
                        <th className="font-semibold text-[#434654] text-xs px-2 sm:px-3 py-2 sm:py-0 hidden sm:table-cell">
                          Cardholder
                        </th>
                        <th className="font-semibold text-[#434654] text-xs px-2 sm:px-3 py-2 sm:py-0">
                          Status
                        </th>
                        <th className="font-semibold text-[#434654] text-xs px-2 sm:px-3 py-2 sm:py-0">
                          Amount
                        </th>
                      </tr>
                    </thead>

                    <tbody className="bg-white">
                      {filteredTransactions.map((txn) => (
                        <tr
                          key={txn.id}
                          className="w-full h-auto sm:h-16.25 border-[#C3C6D6] border-t hover:bg-[#F9F9FF] text-xs sm:text-sm"
                        >
                          <td className="text-[#091C35] font-medium px-3 sm:pl-6 py-3 sm:py-0">
                            {txn.description}
                          </td>
                          <td className="font-normal text-xs sm:text-sm text-[#434654] px-2 sm:px-3 py-3 sm:py-0">
                            {txn.date}
                          </td>
                          <td className="text-[11px] sm:text-[13px] text-normal text-[#091C35] px-2 sm:px-3 py-3 sm:py-0">
                            {txn.reference}
                          </td>
                          <td className="text-xs sm:text-sm text-[#434654] px-2 sm:px-3 py-3 sm:py-0 hidden sm:table-cell">
                            {txn.cardHolder || "N/A"}
                          </td>
                          <td className="px-2 sm:px-3 py-3 sm:py-0">
                            <div className="bg-[#82F9BE] px-2 sm:px-3 py-1 text-[10px] sm:text-[11px] font-bold rounded-4xl w-fit">
                              {txn.status}
                            </div>
                          </td>
                          <td className="font-bold text-[#091C35] px-2 sm:px-3 py-3 sm:py-0">
                            {txn.amount}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            ) : (
              <div className="w-full py-8 sm:py-12 text-center">
                <p className="text-[#434654] text-base sm:text-lg">
                  {filterStatus === "all"
                    ? "No transactions found"
                    : `No ${filterStatus} transactions found`}
                </p>
              </div>
            )}
          </div>

          {/* Transaction Summary */}
          {filteredTransactions.length > 0 && (
            <div className="w-full bg-[#DFE8FF] box p-4 sm:p-6 rounded-lg">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                <div>
                  <p className="text-xs text-[#434654] font-semibold mb-2">
                    Total Transactions
                  </p>
                  <h3 className="text-2xl sm:text-3xl font-bold text-[#003D9B]">
                    {filteredTransactions.length}
                  </h3>
                </div>
                <div>
                  <p className="text-xs text-[#434654] font-semibold mb-2">
                    Total Amount Paid
                  </p>
                  <h3 className="text-2xl sm:text-3xl font-bold text-[#003D9B]">
                    $
                    {filteredTransactions
                      .reduce(
                        (sum, txn) =>
                          sum + parseFloat(txn.amount.replace("$", "")),
                        0,
                      )
                      .toFixed(2)}
                  </h3>
                </div>
                <div>
                  <p className="text-xs text-[#434654] font-semibold mb-2">
                    Average Payment
                  </p>
                  <h3 className="text-2xl sm:text-3xl font-bold text-[#003D9B]">
                    $
                    {(
                      filteredTransactions.reduce(
                        (sum, txn) =>
                          sum + parseFloat(txn.amount.replace("$", "")),
                        0,
                      ) / filteredTransactions.length
                    ).toFixed(2)}
                  </h3>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </section>
  );
};

export default HistoryPage;
