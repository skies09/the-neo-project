import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { shopAPI } from "../../services/shopApi";
import {
	fetchProductRequest,
	fetchProductSuccess,
	fetchProductFailure,
	addToCartRequest,
	addToCartSuccess,
	addToCartFailure,
} from "../../store/shop/actions";

const ProductDetail: React.FC = () => {
	const { id } = useParams<{ id: string }>();
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { currentProduct, cart } = useSelector(
		(state: RootState) => state.shop
	);
	const [selectedImage, setSelectedImage] = useState(0);
	const [quantity, setQuantity] = useState(1);

	useEffect(() => {
		if (id) {
			fetchProduct(parseInt(id));
		}
	}, [id]);

	const fetchProduct = async (productId: number) => {
		dispatch(fetchProductRequest());
		try {
			const response = await shopAPI.getProduct(productId);
			dispatch(fetchProductSuccess(response));
		} catch (error: any) {
			dispatch(
				fetchProductFailure(error.message || "Failed to fetch product")
			);
		}
	};

	const handleAddToCart = async () => {
		if (!currentProduct.item) return;

		dispatch(addToCartRequest());
		try {
			// Find the product in the current products list
			const product = currentProduct.item;
			if (product) {
				// Create a cart item object
				const cartItem = {
					product: product.id,
					product_name: product.name,
					product_sku: product.sku,
					price: product.price,
					quantity: quantity,
					total_price: (parseFloat(product.price) * quantity).toFixed(
						2
					),
				};

				// Update Redux state directly
				dispatch(
					addToCartSuccess({
						items: [...cart.items, cartItem],
						total_items: cart.totalItems + quantity,
						total_price: (
							parseFloat(cart.totalPrice) +
							parseFloat(cartItem.total_price)
						).toFixed(2),
					})
				);
			}
		} catch (error: any) {
			dispatch(
				addToCartFailure(error.message || "Failed to add item to cart")
			);
		}
	};

	const formatPrice = (price: string) => {
		return `£${parseFloat(price).toFixed(2)}`;
	};

	const getDiscountPercentage = () => {
		if (currentProduct.item?.discount_percentage && parseFloat(currentProduct.item.discount_percentage.toString()) > 0) {
			const discount = Math.round(parseFloat(currentProduct.item.discount_percentage.toString()));
			return `${discount}% OFF`;
		}
		return null;
	};

	const hasValidDiscount = () => {
		return currentProduct.item?.discount_percentage && parseFloat(currentProduct.item.discount_percentage.toString()) > 0;
	};

	if (currentProduct.loading) {
		return (
			<div className="min-h-screen bg-gradient-to-br from-honeydew to-mintCream pt-16 flex justify-center items-center">
				<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-highland border-t-transparent"></div>
			</div>
		);
	}

	if (currentProduct.error || !currentProduct.item) {
		return (
			<div className="min-h-screen bg-gradient-to-br from-honeydew to-mintCream pt-16 flex justify-center items-center">
				<div className="text-center">
					<div className="bg-gradient-to-br from-tara to-mintCream rounded-2xl shadow-xl p-8 max-w-2xl mx-auto border-2 border-oxfordBlue/10">
						<h2 className="text-2xl font-bold text-oxfordBlue font-delius mb-4">
							Product Not Found
						</h2>
						<p className="text-oxfordBlue/70 font-poppins mb-8">
							The product you're looking for doesn't exist.
						</p>
						<button
							onClick={() => navigate("/shop")}
							className="bg-gradient-to-r from-highland to-sark text-honeydew px-6 py-3 rounded-full font-fredoka font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105 hover:text-sunset"
						>
							Back to Shop
						</button>
					</div>
				</div>
			</div>
		);
	}

	const product = currentProduct.item;
	const images = [
		product.primary_image,
		product.image_2,
		product.image_3,
		product.image_4,
	].filter(Boolean);

	return (
		<div className="min-h-screen bg-gradient-to-br from-honeydew to-mintCream pt-16">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
				{/* Breadcrumb */}
				<nav className="mb-8">
					<ol className="flex items-center space-x-2 text-sm text-oxfordBlue/70 font-poppins">
						<li>
							<button
								onClick={() => navigate("/shop")}
								className="hover:text-highland transition-colors"
							>
								Shop
							</button>
						</li>
						<li>/</li>
						<li>
							<button
								onClick={() => navigate("/shop")}
								className="hover:text-highland transition-colors"
							>
								{product.category_display}
							</button>
						</li>
						<li>/</li>
						<li className="text-oxfordBlue font-semibold">{product.name}</li>
					</ol>
				</nav>

				<div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
					{/* Product Images */}
					<div className="space-y-4">
						{/* Main Image */}
						<div className="aspect-square bg-gradient-to-br from-tara to-mintCream rounded-2xl shadow-xl overflow-hidden border-2 border-oxfordBlue/10">
							{/* <img
								src={
									images[selectedImage] || "/images/dog1.jpg"
								}
								alt={product.name}
								className="w-full h-full object-cover"
							/> */}
						</div>

						{/* Thumbnail Images */}
						{images.length > 1 && (
							<div className="grid grid-cols-4 gap-2">
								{images.map((image, index) => (
									<button
										key={index}
										onClick={() => setSelectedImage(index)}
										className={`aspect-square bg-gradient-to-br from-tara to-mintCream rounded-lg shadow-md overflow-hidden border-2 transition-all duration-300 ${
											selectedImage === index
												? "border-highland shadow-lg scale-105"
												: "border-transparent hover:border-oxfordBlue/30"
										}`}
									>
										{/* <img
                      src={image || '/images/dog1.jpg'}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    /> */}
									</button>
								))}
							</div>
						)}
					</div>

					{/* Product Info */}
					<div className="space-y-6 bg-gradient-to-br from-tara to-mintCream rounded-2xl shadow-xl p-8 border-2 border-oxfordBlue/10">
						{/* Brand and Category */}
						<div>
							<span className="text-sm text-oxfordBlue/70 font-medium font-poppins">
								{product.brand}
							</span>
							<span className="text-sm text-oxfordBlue/40 mx-2">
								•
							</span>
							<span className="text-sm text-oxfordBlue/70 font-poppins">
								{product.category_display}
							</span>
						</div>

						{/* Product Name */}
						<h1 className="text-3xl font-bold text-oxfordBlue font-delius">
							{product.name}
						</h1>

						{/* Price */}
						<div className="flex items-center gap-4">
							<span className="text-3xl font-bold text-oxfordBlue font-poppins">
								{formatPrice(product.price)}
							</span>
							{product.compare_price && (
								<span className="text-xl text-oxfordBlue/50 line-through font-poppins">
									{formatPrice(product.compare_price)}
								</span>
							)}
							{hasValidDiscount() && (
								<span className="bg-gradient-to-r from-highland to-sark text-honeydew px-3 py-1 rounded-full text-sm font-semibold font-poppins shadow-md">
									{getDiscountPercentage()}
								</span>
							)}
						</div>

						{/* Stock Status */}
						<div className="flex items-center space-x-2">
							{product.is_in_stock ? (
								<span className="text-green-600 font-medium font-poppins">
									In Stock
								</span>
							) : (
								<span className="text-red-600 font-medium font-poppins">
									Out of Stock
								</span>
							)}
							{product.is_low_stock && product.is_in_stock && (
								<span className="text-orange-600 text-sm font-poppins">
									(Only {product.stock_quantity} left!)
								</span>
							)}
						</div>

						{/* Description */}
						{product.description && (
							<div>
								<h3 className="text-lg font-semibold text-oxfordBlue mb-2 font-delius">
									Description
								</h3>
								<p className="text-oxfordBlue/70 leading-relaxed font-poppins">
									{product.description}
								</p>
							</div>
						)}

						{/* Product Details */}
						<div className="grid grid-cols-2 gap-4">
							{product.weight && (
								<div>
									<span className="text-sm font-medium text-oxfordBlue font-poppins">
										Weight:
									</span>
									<span className="text-sm text-oxfordBlue/70 ml-2 font-poppins">
										{product.weight}kg
									</span>
								</div>
							)}
							{product.dimensions && (
								<div>
									<span className="text-sm font-medium text-oxfordBlue font-poppins">
										Dimensions:
									</span>
									<span className="text-sm text-oxfordBlue/70 ml-2 font-poppins">
										{product.dimensions}
									</span>
								</div>
							)}
							<div>
								<span className="text-sm font-medium text-oxfordBlue font-poppins">
									SKU:
								</span>
								<span className="text-sm text-oxfordBlue/70 ml-2 font-poppins">
									{product.sku}
								</span>
							</div>
							{product.tags && (
								<div>
									<span className="text-sm font-medium text-oxfordBlue font-poppins">
										Tags:
									</span>
									<span className="text-sm text-oxfordBlue/70 ml-2 font-poppins">
										{product.tags}
									</span>
								</div>
							)}
						</div>

						{/* Quantity and Add to Cart */}
						<div className="space-y-4">
							<div className="flex items-center space-x-4">
								<label className="text-sm font-medium text-oxfordBlue font-poppins">
									Quantity:
								</label>
								<div className="flex items-center space-x-2">
									<button
										onClick={() =>
											setQuantity(
												Math.max(1, quantity - 1)
											)
										}
										className="w-10 h-10 rounded-full border-2 border-oxfordBlue/20 flex items-center justify-center hover:bg-oxfordBlue hover:text-honeydew transition-all duration-300 font-poppins"
									>
										<span className="text-oxfordBlue">-</span>
									</button>
									<span className="w-12 text-center font-medium font-poppins text-oxfordBlue">
										{quantity}
									</span>
									<button
										onClick={() =>
											setQuantity(
												Math.min(
													product.stock_quantity,
													quantity + 1
												)
											)
										}
										className="w-10 h-10 rounded-full border-2 border-oxfordBlue/20 flex items-center justify-center hover:bg-oxfordBlue hover:text-honeydew transition-all duration-300 font-poppins"
										disabled={
											quantity >= product.stock_quantity
										}
									>
										<span className="text-oxfordBlue">+</span>
									</button>
								</div>
							</div>

							<button
								onClick={handleAddToCart}
								disabled={!product.is_in_stock}
								className={`w-full py-4 px-6 rounded-full font-semibold text-lg transition-all duration-300 font-fredoka ${
									product.is_in_stock
										? "bg-gradient-to-r from-highland to-sark text-honeydew hover:shadow-lg transform hover:scale-105 hover:text-sunset"
										: "bg-gray-300 text-gray-500 cursor-not-allowed"
								}`}
							>
								{product.is_in_stock
									? "Add to Cart"
									: "Out of Stock"}
							</button>
						</div>

						{/* Bestseller Badge */}
						{product.is_bestseller && (
							<div className="flex items-center space-x-2 text-highland">
								<svg
									className="w-5 h-5"
									fill="currentColor"
									viewBox="0 0 20 20"
								>
									<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
								</svg>
								<span className="text-sm font-medium font-poppins">
									Bestseller
								</span>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProductDetail;
