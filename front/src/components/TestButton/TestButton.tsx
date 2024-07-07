// src/component/TestButton/TestButton

import React from 'react';

const TestButton = ({ content }: { content: React.ReactNode }) => {
  return (
    <button className="px-4 py-2 rounded-md">
      {content}
    </button>
  );
};

export default TestButton;