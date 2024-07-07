import React from 'react';
import SignUpForm from 'forms/SignUpForm/SignUpForm';

const SignUpContainer: React.FC = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <SignUpForm />
    </div>
  );
};

export default SignUpContainer;
