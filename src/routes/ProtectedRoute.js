import React from "react";
import { Navigate } from "react-router-dom";

import { getKennel } from "../hooks/kennel.actions";

function ProtectedRoute({ children }) {
	const kennel = getKennel();

	return kennel ? <div>{children}</div> : <Navigate to="/KennelAdmin/" />;
}

export default ProtectedRoute;
