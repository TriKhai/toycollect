import { useAppDispatch, useAppSelector } from "@/hooks/reduxHook";
import { fetchUserRole } from "@/store/actions/accountAction";
import { RootState } from "@/store/store";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  component: React.ComponentType;
  allowedRole: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  component: Component,
  allowedRole,
}) => {
  const dispatch = useAppDispatch();
  const { isAuthenticated, userRole } = useAppSelector(
    (state: RootState) => state.accountReducer
  );
  useEffect(() => {
    
  }, []);

  // console.log("isAuthenticated: ", isAuthenticated);
  // console.log("userRole: ", userRole);

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  if (!allowedRole.includes(userRole || "")) return <Navigate to="/" replace />;

  return <Component />;
};

export default ProtectedRoute;
