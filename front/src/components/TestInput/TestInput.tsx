//src/components/TestInput/TestInput
import React from 'react';

const Input = ({ value }: { value: string }) => {
  return (
    <input
      type="text"
      value={value}
      className="px-4 py-2 border rounded-md"
    />
  );
};

export default Input;