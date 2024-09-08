import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Banner from "./components/banner";

import Home from "./pages/home";

export default function App() {
	return (
		<Router>
			<Banner />

			<Routes>
				<Route exact path="/" element={<Home />} />
			</Routes>
		</Router>
	);
}
