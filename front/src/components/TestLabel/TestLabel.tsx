//src/components/TestLabel/TestLabel
import React from 'react';


type TestLabelProps = {
    text: string;
  };

const TestLabel = ({ text }: TestLabelProps) => {
  return (
    <label className="block text-sm font-medium"
    dangerouslySetInnerHTML={{ __html: text }}>
      
    </label>
  );
};

export default TestLabel;