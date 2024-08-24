import { useContext } from "react";
import AuthContext from "../context/AuthProvider";

const UseAuthProvider = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default UseAuthProvider;
