import React from 'react';
import LoginForm from 'forms/SignInForm/SigninForm';

const LoginContainer: React.FC = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <LoginForm />
    </div>
  );
};

export default LoginContainer;
