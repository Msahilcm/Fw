import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline';
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ 
  variant = 'default', 
  children, 
  className = '',
  ...props 
}) => {
  const baseStyles = 'inline-flex items-center justify-center px-4 py-2 border text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#8b7355]';
  
  const variantStyles = {
    default: 'border-transparent text-white bg-[#8b7355] hover:bg-[#7a634a]',
    outline: 'border-[#8b7355] text-[#8b7355] bg-white hover:bg-[#f5f2f0]'
  };

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button; 