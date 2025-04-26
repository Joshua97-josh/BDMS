import React from 'react'

export function Button({ children, onClick, variant = 'default', size = 'md' }) {
    const base = 'rounded px-4 py-2 font-medium';
    const color =
      variant === 'destructive'
        ? 'bg-red-600 text-white'
        : variant === 'outline'
        ? 'border border-gray-400 text-gray-800'
        : 'bg-blue-600 text-white';
  
    return (
      <button onClick={onClick} className={`${base} ${color}`}>
        {children}
      </button>
    );
  }
  