import { useAuth } from "@/hooks";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const RequireAuth = () => {

	const { user } = useAuth();
	const location = useLocation();

	if (user && location.pathname === "/auth") {
        return <Navigate to="/" replace />;
    }

	return (
		user ? <Outlet /> : <Navigate to="/auth" state={{from: location}} replace />
	)
}

export default RequireAuth