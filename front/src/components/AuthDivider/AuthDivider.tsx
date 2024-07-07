import React from 'react';

const AuthDivider: React.FC = () => {
  return (
    <div className="flex items-center my-4">
      <hr className="flex-grow border-t border-gray-300" />
      <span className="mx-2 text-gray-500">OR</span>
      <hr className="flex-grow border-t border-gray-300" />
    </div>
  );
};

export default AuthDivider;
