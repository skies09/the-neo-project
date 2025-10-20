import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";

const FloatingCartIcon: React.FC = () => {
	return (
		<Link
			to="/shop/cart"
			className="fixed bottom-6 right-6 z-50 bg-skyBlue hover:bg-blue-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110"
		>
			<FontAwesomeIcon icon={faCartShopping} className="w-6 h-6" />
		</Link>
	);
};

export default FloatingCartIcon;
