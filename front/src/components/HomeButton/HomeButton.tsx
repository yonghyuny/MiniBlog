// src/components/BackButton/BackButton.tsx
import React from 'react';
import { GoHome } from "react-icons/go";
import useNavigateHelper from 'utils/NavigationUtil/navigationUtil';

const HomeButton: React.FC = () => {
  const { navigateToHome } = useNavigateHelper(); 
  return (
    <button onClick={() => navigateToHome()} className="text-xl text-gray-600 hover:text-gray-800">
      <GoHome />
    </button>
  );
};

export default HomeButton;