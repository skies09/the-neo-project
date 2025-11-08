// src/App.tsx
import React from "react";
import NavBar from "./components/navBar";
import {
	BrowserRouter as Router,
	Routes,
	Route,
} from "react-router-dom";
import Home from "./pages/home";
import AllDogs from "./pages/adoption/allDogs";
import Adoption from "./pages/adoption/adoptionCalculator";
import BreedCalculator from "./pages/breedCalculator/breedCalculator";
import Breeds from "./pages/breeds/breedsHome";
import Contact from "./pages/contact";
import FAQ from "./pages/faq";
import Donate from "./pages/donate";
import Support from "./pages/support";
import KennelAccount from "./pages/kennel/kennelAccount";
import KennelAdmin from "./pages/kennel/kennelAdmin";
import PasswordReset from "./pages/kennel/passwordReset";
import BlogList from "./pages/blog/BlogList";
import BlogPostPage from "./pages/blog/BlogPost";
import ShopHome from "./pages/shop/ShopHome";
import ProductDetail from "./pages/shop/ProductDetail";
import CartPage from "./pages/shop/CartPage";
import CheckoutPage from "./pages/shop/CheckoutPage";
import ProtectedRoute from "./routes/ProtectedRoute";
import { ToastContainer } from "./components/ToastContainer";
import FloatingCartIcon from "./components/shop/FloatingCartIcon";
import ScrollToTop from "./components/ScrollToTop";
import Footer from "./components/homepage/Footer";

const CartIcon: React.FC = () => {
	return <FloatingCartIcon />;
};

const App: React.FC = () => (
	<ToastContainer>
		<Router>
			<ScrollToTop />
			<NavBar />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/allDogs" element={<AllDogs />} />
				<Route path="/adopt" element={<Adoption />} />
				<Route path="/breedCalculator" element={<BreedCalculator />} />
				<Route path="/breeds" element={<Breeds />} />
				<Route path="/contact" element={<Contact />} />
				<Route path="/faq" element={<FAQ />} />
				<Route path="/donate" element={<Donate />} />
				<Route path="/support" element={<Support />} />
				<Route path="/blog" element={<BlogList />} />
				<Route path="/blog/:id" element={<BlogPostPage />} />
				<Route path="/shop" element={<ShopHome />} />
				<Route path="/shop/products/:id" element={<ProductDetail />} />
				<Route path="/shop/cart" element={<CartPage />} />
				<Route path="/shop/checkout" element={<CheckoutPage />} />
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
			<CartIcon />
			<Footer />
		</Router>
	</ToastContainer>
);

export default App;
