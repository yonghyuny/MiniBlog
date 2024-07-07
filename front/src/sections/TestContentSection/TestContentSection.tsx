// src/sections/ContentSection/ContentSection.tsx
import React from 'react';
import TestLabel from 'components/TestLabel/TestLabel';

const TestContentSection = ({ content }: { content: string }) => {
  return (
    <div className="w-full p-4 rounded-md bg-white shadow-md">
      <TestLabel text={content} />
    </div>
  );
};

export default TestContentSection;
