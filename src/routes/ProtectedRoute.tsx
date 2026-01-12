// ProtectedRoute.js
import React from "react";
import { Navigate } from "react-router-dom";
import { getKennel } from "../hooks/kennel.actions";

interface ProtectedRouteProps {
	children: React.ReactNode;
}

function ProtectedRoute({ children }: ProtectedRouteProps): React.JSX.Element {
	const kennel = getKennel();
	return kennel ? <>{children}</> : <Navigate to="/kennel-admin" />;
}

export default ProtectedRoute;
