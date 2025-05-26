import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./routes/ProtectedRoute";

import Header from "./components/header";
import Home from "./pages/home";
import Navbar from "./components/navBar";
import Adoption from "./pages/adoption/adoptionCalculator";
import BreedCalculator from "./pages/breedCalculator/breedCalculator";
import Breeds from "./pages/breeds/breedsHome";
import KennelAdmin from "./pages/kennel/kennelAdmin";
import KennelAccount from "./pages/kennel/kennelAccount";
import Contact from "./pages/contact";
import AllDogs from "./pages/adoption/allDogs";

export default function App() {
	return (
		<>
			<Router>
				<Navbar />
				<Header />
				<Routes>
					<Route exact path="/" element={<Home />} />
					<Route path="/allDogs" element={<AllDogs />} />
					<Route path="/adopt" element={<Adoption />} />
					<Route
						path="/breedCalculator"
						element={<BreedCalculator />}
					/>
					<Route path="/breeds" element={<Breeds />} />
					<Route
						path="/kennelAccount"
						element={
							<ProtectedRoute>
								<KennelAccount />
							</ProtectedRoute>
						}
					/>
					<Route path="/kennelAdmin" element={<KennelAdmin />} />

					<Route path="/Contact" element={<Contact />} />
				</Routes>
			</Router>
		</>
	);
}
