import React from 'react';

const SaveUsernameSection: React.FC = () => {
  return (
    <label className="flex items-center">
      <input type="checkbox" className="form-checkbox" />
      <span className="ml-2 text-sm text-gray-600">아이디 저장</span>
    </label>
  );
};

export default SaveUsernameSection;
