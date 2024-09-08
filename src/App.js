import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/header";
import Home from "./pages/home";

export default function App() {
	return (
		<Router>
			<Header />

			<Routes>
				<Route exact path="/" element={<Home />} />
			</Routes>
		</Router>
	);
}
