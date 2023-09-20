import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

const PrivateRoute = ({ component: Component }) => {
  let { user } = useContext(AuthContext);
  const navigate = useNavigate();

  return user ? <Component /> : navigate("/login");
};

export default PrivateRoute;
