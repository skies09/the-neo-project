import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../store/store';
import CheckoutForm from '../../components/shop/CheckoutForm';
import { shopAPI } from '../../services/shopApi';
import {
  createOrderRequest,
  createOrderSuccess,
  createOrderFailure,
  applyCouponRequest,
  applyCouponSuccess,
  applyCouponFailure,
  clearCoupon,
} from '../../store/shop/actions';

const CheckoutPage: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cart, appliedCoupon } = useSelector((state: RootState) => state.shop);

  const handleCreateOrder = async (orderData: any) => {
    dispatch(createOrderRequest());
    try {
      const response = await shopAPI.createOrder(orderData);
      dispatch(createOrderSuccess(response));
      navigate(`/shop`, { state: { order: response } });
    } catch (error: any) {
      dispatch(createOrderFailure(error.message || 'Failed to create order'));
    }
  };

  const handleApplyCoupon = async (code: string) => {
    dispatch(applyCouponRequest());
    try {
      const response = await shopAPI.applyCoupon(code, cart.totalPrice);
      dispatch(applyCouponSuccess(response));
    } catch (error: any) {
      dispatch(applyCouponFailure(error.message || 'Invalid coupon code'));
    }
  };

  const handleRemoveCoupon = () => {
    dispatch(clearCoupon());
  };

  // Redirect if cart is empty
  if (cart.items.length === 0 && !cart.loading) {
    navigate('/shop/cart');
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-honeydew to-mintCream pt-16">
      <CheckoutForm
        cart={cart}
        loading={cart.loading}
        onSubmit={handleCreateOrder}
        appliedCoupon={appliedCoupon.item}
        onApplyCoupon={handleApplyCoupon}
        onRemoveCoupon={handleRemoveCoupon}
      />
    </div>
  );
};

export default CheckoutPage;
