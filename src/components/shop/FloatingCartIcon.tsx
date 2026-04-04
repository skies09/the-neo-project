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
				aria-label={`Shopping cart, ${totalItems} items`}
				className="group relative inline-flex min-h-[52px] min-w-[52px] items-center justify-center rounded-full bg-gradient-to-r from-sark to-bayleaf p-4 text-honeydew shadow-neo-lg transition hover:shadow-neo-lg hover:brightness-[1.03] motion-safe:hover:scale-105"
			>
				<FontAwesomeIcon icon={faCartShopping} className="h-6 w-6" aria-hidden />
				{totalItems > 0 && (
					<span
						className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full border-2 border-honeydew bg-sunset text-xs font-bold text-oxfordBlue shadow-neo transition-colors"
						aria-hidden
					>
						{totalItems > 99 ? "99+" : totalItems}
					</span>
				)}
			</Link>
		</div>
	);
};

export default FloatingCartIcon;
