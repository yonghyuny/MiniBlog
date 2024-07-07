// src/sections/TitleSection/TitleSection.tsx
import React from 'react';
import TestLabel from 'components/TestLabel/TestLabel';

const TestTitleSection = ({ text }: { text: string }) => {
  return (
    <div className="w-full p-4 rounded-md bg-white shadow-md">
      <TestLabel text={text} />
    </div>
  );
};

export default TestTitleSection;