// src/App.tsx
import React from "react";
import NavBar from "./components/navBar.tsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home.tsx";
import AllDogs from "./pages/adoption/allDogs.tsx";
import Adoption from "./pages/adoption/adoptionCalculator.tsx";
import BreedCalculator from "./pages/breedCalculator/breedCalculator.tsx";
import Breeds from "./pages/breeds/breedsHome.tsx";
import Contact from "./pages/contact.tsx";
import KennelAccount from "./pages/kennel/kennelAccount.tsx";
import KennelAdmin from "./pages/kennel/kennelAdmin.tsx";
import PasswordReset from "./pages/kennel/passwordReset.tsx";
import ProtectedRoute from "./routes/ProtectedRoute.tsx";
import Header from "./components/header.tsx";
import { ToastContainer } from "./components/ToastContainer.tsx";

const App: React.FC = () => (
	<ToastContainer>
		<Router>
			<NavBar />
			<Header />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/allDogs" element={<AllDogs />} />
				<Route path="/adopt" element={<Adoption />} />
				<Route path="/breedCalculator" element={<BreedCalculator />} />
				<Route path="/breeds" element={<Breeds />} />
				<Route path="/contact" element={<Contact />} />
				<Route
					path="/kennelAccount"
					element={
						<ProtectedRoute>
							<KennelAccount />
						</ProtectedRoute>
					}
				/>
				<Route path="/kennelAdmin" element={<KennelAdmin />} />
				<Route
					path="/password-reset"
					element={
						<ProtectedRoute>
							<PasswordReset />
						</ProtectedRoute>
					}
				/>
			</Routes>
		</Router>
	</ToastContainer>
);

export default App;
