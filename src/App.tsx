// src/App.tsx
import React from "react";
import NavBar from "./components/navBar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import AllDogs from "./pages/adoption/allDogs";
import Adoption from "./pages/adoption/adoptionCalculator";
import BreedCalculator from "./pages/breedCalculator/breedCalculator";
import Breeds from "./pages/breeds/breedsHome";
import Contact from "./pages/contact";
import FAQ from "./pages/faq";
import KennelAccount from "./pages/kennel/kennelAccount";
import KennelAdmin from "./pages/kennel/kennelAdmin";
import PasswordReset from "./pages/kennel/passwordReset";
import BlogList from "./pages/blog/BlogList";
import BlogPostPage from "./pages/blog/BlogPost";
import ProtectedRoute from "./routes/ProtectedRoute";
// import Header from "./components/header";
import { ToastContainer } from "./components/ToastContainer";

const App: React.FC = () => (
	<ToastContainer>
		<Router>
			<NavBar />
			{/* <Header /> */}
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/allDogs" element={<AllDogs />} />
				<Route path="/adopt" element={<Adoption />} />
				<Route path="/breedCalculator" element={<BreedCalculator />} />
				<Route path="/breeds" element={<Breeds />} />
				<Route path="/contact" element={<Contact />} />
				<Route path="/faq" element={<FAQ />} />
				<Route path="/blog" element={<BlogList />} />
				<Route path="/blog/:slug" element={<BlogPostPage />} />
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
