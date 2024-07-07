import React from 'react';

interface ButtonProps {
  text: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
  className?: string;  // Add className prop
  style?: React.CSSProperties;  // Add style prop
}

const AuthButton: React.FC<ButtonProps> = ({ text, onClick, variant = 'primary', className,style  }) => {
  const baseStyle = "w-full p-2 rounded focus:outline-none focus:ring-2 ";
  const primaryStyle = "bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500";
  const secondaryStyle = "border border-indigo-600 text-indigo-600 hover:bg-indigo-700 hover:text-white focus:ring-indigo-500";

  const buttonStyle = variant === 'primary' ? primaryStyle : secondaryStyle;

  return (
    <button
      onClick={onClick}
      className={`${baseStyle} ${buttonStyle} ${className}`} 
      style={style} 
    >
      {text}
    </button>
  );
};

export default AuthButton;
