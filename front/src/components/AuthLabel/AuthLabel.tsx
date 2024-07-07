import React from 'react';

interface LabelProps {
  text: string;
}

const AuthLabel: React.FC<LabelProps> = ({ text }) => {
  return <label className="block mb-2 text-sm font-medium text-gray-700">{text}</label>;
};

export default AuthLabel;
