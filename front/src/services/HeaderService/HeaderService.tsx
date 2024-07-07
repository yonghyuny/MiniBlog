// src/services/HeaderService/HeaderService.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface HeaderContextProps {
  dropdownOpen: boolean;
  toggleDropdown: () => void;
}

const HeaderContext = createContext<HeaderContextProps | undefined>(undefined);

interface HeaderProviderProps {
  children: ReactNode;
}

export const HeaderProvider: React.FC<HeaderProviderProps> = ({ children }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(prev => !prev);
  };

  return (
    <HeaderContext.Provider value={{ dropdownOpen, toggleDropdown }}>
      {children}
    </HeaderContext.Provider>
  );
};

export const useHeader = () => {
  const context = useContext(HeaderContext);
  if (!context) {
    throw new Error('useHeader must be used within a HeaderProvider');
  }
  return context;
};
