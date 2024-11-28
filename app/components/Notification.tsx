import React, { useEffect } from 'react';

interface NotificationProps {
  message: string;
  type: 'error' | 'success';
  onClose: () => void;
  duration?: number;
}

export default function Notification({ message, type, onClose, duration = 5000 }: NotificationProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const baseStyles = "fixed top-4 right-4 p-4 rounded-lg shadow-lg max-w-md z-50 flex items-center justify-between";
  const typeStyles = type === 'error' 
    ? "bg-red-50 text-red-800 border border-red-200" 
    : "bg-green-50 text-green-800 border border-green-200";

  return (
    <div className={`${baseStyles} ${typeStyles} animate-slide-in`}>
      <div className="flex items-center gap-2">
        {type === 'error' ? (
          <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        ) : (
          <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        )}
        <p>{message}</p>
      </div>
      <button
        onClick={onClose}
        className="ml-4 text-gray-500 hover:text-gray-700"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
} 