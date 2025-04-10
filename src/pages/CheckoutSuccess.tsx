import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Button from '../components/ui/button';

const CheckoutSuccess: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { orderNumber, email, orderDetails } = location.state || {};

  if (!orderNumber) {
    navigate('/');
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Order Confirmed!
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Thank you for your purchase. Your order has been received and is being processed.
          </p>
        </div>

        <div className="mt-8 bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Order Information
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              Order #{orderNumber}
            </p>
          </div>
          <div className="border-t border-gray-200">
            <dl>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Order Number</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 font-mono">
                  {orderNumber}
                </dd>
              </div>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Email</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {email}
                </dd>
              </div>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Status</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  Processing
                </dd>
              </div>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Total Amount</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  ${orderDetails?.total.toFixed(2)}
                </dd>
              </div>
            </dl>
          </div>
        </div>

        <div className="mt-8 text-center">
          <h2 className="text-xl font-semibold text-gray-900">Track Your Order</h2>
          <p className="mt-2 text-gray-600">
            You can track your order status using your order number.
          </p>
          <div className="mt-4">
            <Button
              onClick={() => navigate('/track-order')}
              className="bg-indigo-600 text-white hover:bg-indigo-700"
            >
              Track Order
            </Button>
          </div>
        </div>

        <div className="mt-8 text-center">
          <Button
            onClick={() => navigate('/')}
            variant="outline"
          >
            Continue Shopping
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutSuccess; 