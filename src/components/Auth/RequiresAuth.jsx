import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const RequiresAuth = ({ children }) => {
  const { encodedToken } = useSelector((store) => store.auth);
  const location = useLocation();

  return encodedToken ? (
    children
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export { RequiresAuth };
