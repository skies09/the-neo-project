import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../services/shopApi';

interface ProductCardProps {
  product: Product;
  onAddToCart?: (productId: number, quantity: number) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  const handleAddToCart = () => {
    if (onAddToCart && product.is_in_stock) {
      onAddToCart(product.id, 1);
    }
  };

  const formatPrice = (price: string) => {
    return `£${parseFloat(price).toFixed(2)}`;
  };

  const getDiscountPercentage = () => {
    if (product.discount_percentage) {
      return `${product.discount_percentage}% OFF`;
    }
    return null;
  };

  const getCategoryDisplay = (category: string) => {
    const categoryMap: { [key: string]: string } = {
      'FOOD': 'Dog Food',
      'TOYS': 'Toys',
      'ACCESSORIES': 'Accessories',
      'HEALTH': 'Health & Wellness',
      'GROOMING': 'Grooming',
      'TRAINING': 'Training',
      'BEDDING': 'Bedding',
      'TRAVEL': 'Travel',
      'SAFETY': 'Safety',
      'OTHER': 'Other'
    };
    return categoryMap[category] || category;
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
      {/* Product Image */}
      <div className="relative">
        <Link to={`/shop/products/${product.id}`}>
          <img
            src={product.primary_image || '/images/dog1.jpg'}
            alt={product.name}
            className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
          />
        </Link>
        
        {/* Discount Badge */}
        {product.discount_percentage && (
          <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-md text-sm font-semibold">
            {getDiscountPercentage()}
          </div>
        )}
        
        {/* Bestseller Badge */}
        {product.is_bestseller && (
          <div className="absolute top-2 right-2 bg-yellow-500 text-white px-2 py-1 rounded-md text-sm font-semibold">
            Bestseller
          </div>
        )}
        
        {/* Stock Status */}
        {!product.is_in_stock && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="text-white font-semibold text-lg">Out of Stock</span>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-4">
        {product.brand && (
          <div className="mb-2">
            <span className="text-sm text-gray-500 font-medium">{product.brand}</span>
          </div>
        )}
        
        <Link to={`/shop/products/${product.id}`}>
          <h3 className="text-lg font-semibold text-gray-800 hover:text-skyBlue transition-colors duration-200 mb-2 line-clamp-2">
            {product.name}
          </h3>
        </Link>
        
        <div className="mb-3">
          <span className="text-sm text-gray-600">{getCategoryDisplay(product.category)}</span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2 mb-4">
          <span className="text-xl font-bold text-gray-900">
            {formatPrice(product.price)}
          </span>
          {product.compare_price && (
            <span className="text-sm text-gray-500 line-through">
              {formatPrice(product.compare_price)}
            </span>
          )}
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          disabled={!product.is_in_stock}
          className={`w-full py-2 px-4 rounded-md font-semibold transition-colors duration-200 ${
            product.is_in_stock
              ? 'bg-skyBlue text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-skyBlue focus:ring-offset-2'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          {product.is_in_stock ? 'Add to Cart' : 'Out of Stock'}
        </button>

        {/* Stock Indicator */}
        {product.is_low_stock && product.is_in_stock && (
          <p className="text-orange-600 text-sm mt-2 text-center">
            Only {product.stock_quantity} left in stock!
          </p>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
