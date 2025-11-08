import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";

const FloatingCartIcon: React.FC = () => {
	const shopState = useSelector((state: RootState) => state.shop);
	const cart = shopState?.cart || {
		items: [],
		totalItems: 0,
		totalPrice: "0.00",
		loading: false,
		error: null,
	};
	
	// Calculate total items from cart state or items array
	const totalItems = cart?.totalItems || (cart?.items && cart.items.length > 0 ? cart.items.length : 0);

	// Only show if there are items in the cart
	if (!totalItems || totalItems === 0) {
		return null;
	}

	return (
		<div className="fixed bottom-6 right-6 z-[60]">
			<Link
				to="/shop/cart"
				className="group bg-gradient-to-r from-highland to-sark text-honeydew p-4 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-110 hover:text-sunset relative inline-block"
			>
				<FontAwesomeIcon icon={faCartShopping} className="w-6 h-6" />
				{totalItems > 0 && (
					<span className="absolute -top-1 -right-1 bg-sunset text-white group-hover:text-oxfordBlue text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center shadow-lg border-2 border-honeydew transition-colors duration-300">
						{totalItems > 99 ? "99+" : totalItems}
					</span>
				)}
			</Link>
		</div>
	);
};

export default FloatingCartIcon;
