import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface TrackingHistoryEntry {
  date: string;
  status: string;
  location: string;
}

interface OrderStatus {
  status: string;
  estimatedDelivery: string;
  currentLocation: string;
  trackingHistory: TrackingHistoryEntry[];
}

const TrackOrder: React.FC = () => {
  const [orderId, setOrderId] = useState('');
  const [orderStatus, setOrderStatus] = useState<OrderStatus | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderId.trim()) return;

    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      // This would be replaced with actual API call
      const mockStatus: OrderStatus = {
        status: 'In Transit',
        estimatedDelivery: '2024-03-15',
        currentLocation: 'Warehouse',
        trackingHistory: [
          { date: '2024-03-10', status: 'Order Placed', location: 'Online Store' },
          { date: '2024-03-11', status: 'Processing', location: 'Warehouse' },
          { date: '2024-03-12', status: 'Shipped', location: 'Warehouse' },
          { date: '2024-03-13', status: 'In Transit', location: 'Distribution Center' },
        ],
      };
      setOrderStatus(mockStatus);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden"
      >
        <div className="px-6 py-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Track Your Order</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="orderId" className="block text-sm font-medium text-gray-700">
                Order ID
              </label>
              <input
                type="text"
                id="orderId"
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter your order ID"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            >
              {isLoading ? 'Tracking...' : 'Track Order'}
            </button>
          </form>

          {orderStatus && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8"
            >
              <h3 className="text-lg font-medium text-gray-900 mb-4">Order Status</h3>
              <div className="bg-gray-50 p-4 rounded-md">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm font-medium text-gray-500">Status</span>
                  <span className="text-sm font-medium text-indigo-600">{orderStatus.status}</span>
                </div>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm font-medium text-gray-500">Estimated Delivery</span>
                  <span className="text-sm font-medium text-gray-900">{orderStatus.estimatedDelivery}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-500">Current Location</span>
                  <span className="text-sm font-medium text-gray-900">{orderStatus.currentLocation}</span>
                </div>

                <div className="mt-6">
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Tracking History</h4>
                  <div className="space-y-4">
                    {orderStatus.trackingHistory.map((entry: TrackingHistoryEntry, index: number) => (
                      <div key={index} className="flex items-start">
                        <div className="flex-shrink-0">
                          <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center">
                            <span className="text-xs font-medium text-indigo-600">{index + 1}</span>
                          </div>
                        </div>
                        <div className="ml-4">
                          <p className="text-sm font-medium text-gray-900">{entry.status}</p>
                          <p className="text-xs text-gray-500">{entry.date}</p>
                          <p className="text-xs text-gray-500">{entry.location}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default TrackOrder; 