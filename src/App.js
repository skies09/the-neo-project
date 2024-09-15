import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/header";
import Home from "./pages/home";
import Navbar from "./components/navBar";
import Adoption from "./pages/adoption/adoptionCalculator";
import BreedCalculator from "./pages/breedCalculator/breedCalculator";
import Breeds from "./pages/breeds/breedsHome";
import KennelAdmin from "./pages/kennel/kennelAdmin";

export default function App() {
	return (
		<>
			<Router>
				<Navbar />
				<Header />
				<Routes>
					<Route exact path="/" element={<Home />} />
					<Route path="/adopt" element={<Adoption />} />
					<Route
						path="/breedCalculator"
						element={<BreedCalculator />}
					/>
					<Route path="/breeds" element={<Breeds />} />
					<Route path="/kennelAdmin" element={<KennelAdmin />} />
				</Routes>
			</Router>
		</>
	);
}
