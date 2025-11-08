import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import Cart from '../../components/shop/Cart';
import {
  updateCartItemRequest,
  updateCartItemSuccess,
  updateCartItemFailure,
  removeFromCartRequest,
  removeFromCartSuccess,
  removeFromCartFailure,
  clearCartRequest,
  clearCartSuccess,
  clearCartFailure,
} from '../../store/shop/actions';

const CartPage: React.FC = () => {
  const dispatch = useDispatch();
  const { cart } = useSelector((state: RootState) => state.shop);

  const handleUpdateQuantity = async (productId: number, quantity: number) => {
    dispatch(updateCartItemRequest());
    try {
      // Update cart item in Redux state
      const updatedItems = cart.items.map((item: any) => 
        item.product === productId 
          ? { ...item, quantity, total_price: (parseFloat(item.price) * quantity).toFixed(2) }
          : item
      );
      
      const totalItems = updatedItems.reduce((sum: number, item: any) => sum + item.quantity, 0);
      const totalPrice = updatedItems.reduce((sum: number, item: any) => sum + parseFloat(item.total_price), 0).toFixed(2);
      
      dispatch(updateCartItemSuccess({
        items: updatedItems,
        total_items: totalItems,
        total_price: totalPrice
      }));
    } catch (error: any) {
      dispatch(updateCartItemFailure(error.message || 'Failed to update cart item'));
    }
  };

  const handleRemoveItem = async (productId: number) => {
    dispatch(removeFromCartRequest());
    try {
      // Remove item from Redux state
      const updatedItems = cart.items.filter((item: any) => item.product !== productId);
      const totalItems = updatedItems.reduce((sum: number, item: any) => sum + item.quantity, 0);
      const totalPrice = updatedItems.reduce((sum: number, item: any) => sum + parseFloat(item.total_price), 0).toFixed(2);
      
      dispatch(removeFromCartSuccess({
        items: updatedItems,
        total_items: totalItems,
        total_price: totalPrice
      }));
    } catch (error: any) {
      dispatch(removeFromCartFailure(error.message || 'Failed to remove item from cart'));
    }
  };

  const handleClearCart = async () => {
    dispatch(clearCartRequest());
    try {
      // Clear cart in Redux state
      dispatch(clearCartSuccess({
        items: [],
        total_items: 0,
        total_price: '0.00'
      }));
    } catch (error: any) {
      dispatch(clearCartFailure(error.message || 'Failed to clear cart'));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-honeydew to-mintCream pt-16">
      <Cart
        cart={cart}
        loading={cart.loading}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />
    </div>
  );
};

export default CartPage;
