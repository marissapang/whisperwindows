'use client';

import React from 'react';

interface LoadingButtonProps {
  children: React.ReactNode;
  isLoading: boolean;
  onClick: () => void;
  className?: string;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

export function LoadingButton({
  children,
  isLoading,
  onClick,
  className = '',
  disabled = false,
  type = 'button'
}: LoadingButtonProps) {
  const isDisabled = isLoading || disabled;
  
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isDisabled}
      className={`relative inline-flex items-center justify-center ${
        isDisabled 
          ? 'bg-gray-400 cursor-not-allowed' 
          : 'bg-blue-600 hover:bg-blue-700'
      } text-white font-medium py-2 px-4 rounded-md transition-colors duration-200 ${className}`}
    >
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
        </div>
      )}
      <span className={isLoading ? 'opacity-0' : 'opacity-100'}>
        {children}
      </span>
    </button>
  );
}
