import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import { Link } from 'react-router-dom';
import {
  UserCircleIcon,
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  CalendarIcon,
  Cog6ToothIcon,
  ArrowRightOnRectangleIcon,
  PencilIcon,
} from '@heroicons/react/24/outline';
import { updateProfile } from '../store/slices/authSlice';

interface Order {
  id: string;
  date: string;
  status: string;
  total: number;
  items: {
    name: string;
    quantity: number;
    price: number;
  }[];
}

const Profile: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.auth.user);
  const [activeTab, setActiveTab] = useState<'profile' | 'orders' | 'settings'>('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    address: user?.address || '',
  });

  // Mock order history data
  const orders: Order[] = [
    {
      id: 'ORD-12345',
      date: '2024-03-10',
      status: 'Delivered',
      total: 299.99,
      items: [
        { name: 'Modern Sofa', quantity: 1, price: 299.99 },
      ],
    },
    {
      id: 'ORD-12346',
      date: '2024-03-15',
      status: 'In Transit',
      total: 599.98,
      items: [
        { name: 'Dining Table', quantity: 1, price: 399.99 },
        { name: 'Chair Set', quantity: 4, price: 199.99 },
      ],
    },
  ];

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      await dispatch(updateProfile(editedProfile));
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to update profile:', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditedProfile(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white shadow rounded-lg overflow-hidden"
        >
          {/* Profile Header */}
          <div className="bg-indigo-600 px-6 py-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <UserCircleIcon className="h-16 w-16 text-white" />
                <div>
                  <h1 className="text-2xl font-bold text-white">{user?.name || 'User'}</h1>
                  <p className="text-indigo-100">{user?.email}</p>
                </div>
              </div>
              {!isEditing && (
                <button
                  onClick={handleEdit}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50"
                >
                  <PencilIcon className="h-5 w-5 mr-2" />
                  Edit Profile
                </button>
              )}
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              <button
                onClick={() => setActiveTab('profile')}
                className={`${
                  activeTab === 'profile'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } w-1/3 py-4 px-1 text-center border-b-2 font-medium text-sm`}
              >
                Profile
              </button>
              <button
                onClick={() => setActiveTab('orders')}
                className={`${
                  activeTab === 'orders'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } w-1/3 py-4 px-1 text-center border-b-2 font-medium text-sm`}
              >
                Orders
              </button>
              <button
                onClick={() => setActiveTab('settings')}
                className={`${
                  activeTab === 'settings'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } w-1/3 py-4 px-1 text-center border-b-2 font-medium text-sm`}
              >
                Settings
              </button>
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'profile' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-6"
              >
                <div>
                  <h2 className="text-lg font-medium text-gray-900">Personal Information</h2>
                  <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Full Name</label>
                      {isEditing ? (
                        <input
                          type="text"
                          name="name"
                          value={editedProfile.name}
                          onChange={handleChange}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                      ) : (
                        <p className="mt-1 text-sm text-gray-900">{user?.name || 'Not set'}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Email</label>
                      <p className="mt-1 text-sm text-gray-900">{user?.email}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Phone</label>
                      {isEditing ? (
                        <input
                          type="tel"
                          name="phone"
                          value={editedProfile.phone}
                          onChange={handleChange}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                      ) : (
                        <p className="mt-1 text-sm text-gray-900">{user?.phone || 'Not set'}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Member Since</label>
                      <p className="mt-1 text-sm text-gray-900">{user?.createdAt || 'Not available'}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h2 className="text-lg font-medium text-gray-900">Shipping Address</h2>
                  <div className="mt-4">
                    {isEditing ? (
                      <textarea
                        name="address"
                        value={editedProfile.address}
                        onChange={handleChange}
                        rows={3}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    ) : (
                      <p className="text-sm text-gray-900">
                        {user?.address || 'No shipping address saved'}
                      </p>
                    )}
                  </div>
                </div>

                {isEditing && (
                  <div className="flex justify-end space-x-3">
                    <button
                      onClick={() => setIsEditing(false)}
                      className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSave}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                    >
                      Save Changes
                    </button>
                  </div>
                )}
              </motion.div>
            )}

            {activeTab === 'orders' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-6"
              >
                <h2 className="text-lg font-medium text-gray-900">Order History</h2>
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div
                      key={order.id}
                      className="border border-gray-200 rounded-lg p-4 hover:border-indigo-500 transition-colors"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-sm font-medium text-gray-900">Order #{order.id}</h3>
                          <p className="text-sm text-gray-500">Placed on {order.date}</p>
                        </div>
                        <span
                          className={`px-2 py-1 text-xs font-medium rounded-full ${
                            order.status === 'Delivered'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}
                        >
                          {order.status}
                        </span>
                      </div>
                      <div className="mt-4">
                        {order.items.map((item, index) => (
                          <div key={index} className="flex justify-between text-sm">
                            <span>
                              {item.name} x {item.quantity}
                            </span>
                            <span>${item.price.toFixed(2)}</span>
                          </div>
                        ))}
                      </div>
                      <div className="mt-4 flex justify-between items-center">
                        <Link
                          to={`/track-order?orderId=${order.id}`}
                          className="text-sm text-indigo-600 hover:text-indigo-500"
                        >
                          Track Order
                        </Link>
                        <span className="text-sm font-medium text-gray-900">
                          Total: ${order.total.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'settings' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-6"
              >
                <h2 className="text-lg font-medium text-gray-900">Account Settings</h2>
                <div className="space-y-4">
                  <button className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700">
                    <Cog6ToothIcon className="h-5 w-5 mr-2" />
                    Change Password
                  </button>
                  <button className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700">
                    <ArrowRightOnRectangleIcon className="h-5 w-5 mr-2" />
                    Delete Account
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Profile; 