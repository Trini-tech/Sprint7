import { Navigate, Outlet } from 'react-router-dom';

interface ProtectedRouteProps {
  isAuthenticated: boolean | undefined;
}

const ProtectedRoute = ({ isAuthenticated }: ProtectedRouteProps) => {
  console.log(isAuthenticated);
  if (!isAuthenticated) {
    return <Navigate to={'/login'} replace />;
  }
  return <Outlet />;
};

export default ProtectedRoute;
