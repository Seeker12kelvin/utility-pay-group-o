import Layout from "./layout";
import LoginPage from "../pages/Login/loginPage";
import SignUpPage from "../pages/Sign-up/signUpPage";
import { createBrowserRouter } from "react-router-dom";
import LandingPage from "../pages/Landing Page/landingPage";
import DashboardPage from "../pages/Dashboard/dashboardPage";
import BillsPage from "../pages/Bills/billsPage";
import HistoryPage from "../pages/History/historyPage";
import SupportPage from "../pages/Support/supportPage";
import ProtectedLayouts from "./protectedLayouts";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: (
      <div className="w-full h-screen flex justify-center items-center text-6xl">
        404: Not Found
      </div>
    ),
    children: [
      {
        index: true,
        element: <LandingPage />,
      },
      {
        path: "dashboard",
        element: (
          <ProtectedLayouts>
            <DashboardPage />
          </ProtectedLayouts>
        ),
      },
      {
        path: "bills/:billInfo",
        element: (
          <ProtectedLayouts>
            <BillsPage />
          </ProtectedLayouts>
        ),
      },
      {
        path: "history",
        element: (
          <ProtectedLayouts>
            <HistoryPage />
          </ProtectedLayouts>
        ),
      },
      {
        path: "support",
        element: <SupportPage />,
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/signUp",
    element: <SignUpPage />,
  },
]);

export default routes;
