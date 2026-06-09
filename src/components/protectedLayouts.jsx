import { useContext } from "react";
import { UserContext } from "./user";
import Loading from "./loading";

const ProtectedLayouts = ({ children }) => {
  const { user, userData } = useContext(UserContext);

  if (user && userData.name) {
    return children;
  } else {
    return <Loading />;
  }
};

export default ProtectedLayouts;
