// ProtectedRoute.js
import React from "react";
import { Navigate } from "react-router-dom";
import { getKennel } from "../hooks/kennel.actions";

function ProtectedRoute({ children }) {
	const kennel = getKennel();
	return kennel ? children : <Navigate to="/kennelAdmin" />;
}

export default ProtectedRoute;
