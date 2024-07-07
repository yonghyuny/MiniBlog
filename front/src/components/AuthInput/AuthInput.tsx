import React, { forwardRef, ChangeEvent, KeyboardEvent } from 'react';

interface InputProps {
  placeholder: string;
  type: 'text' | 'password' | 'email';
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (event: KeyboardEvent<HTMLInputElement>) => void;
  className?: string;
  maxLength?: number;
}

const AuthInput = forwardRef<HTMLInputElement, InputProps>(({ placeholder, type, value, onChange, onKeyDown, className, maxLength }, ref) => {
  return (
    <input
      ref={ref}
      className={`w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 h-10 ${className}`}
      placeholder={placeholder}
      type={type}
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
      maxLength={maxLength}
    />
  );
});

export default AuthInput;
