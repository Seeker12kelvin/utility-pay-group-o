import routes from "./components/routes";
import UserAuth from "./components/userAuth";
import { RouterProvider } from "react-router-dom";

function App() {
  return (
    <UserAuth>
      <RouterProvider router={routes} />
    </UserAuth>
  );
}

export default App;
