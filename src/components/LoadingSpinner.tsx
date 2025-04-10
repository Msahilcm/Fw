import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-200 border-t-primary-500"></div>
    </div>
  );
};

export default LoadingSpinner; 