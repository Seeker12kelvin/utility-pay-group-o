import { useContext } from "react";
import { UserContext } from "./user";
import Loading from "./loading";

const ProtectedLayouts = ({ children }) => {
  const { user, userData } = useContext(UserContext);

  return user && userData.name ? children : <Loading />;
};

export default ProtectedLayouts;
