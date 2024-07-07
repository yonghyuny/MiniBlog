// src/forms/TestForm/TestForm
import React from 'react';
import TestTitleSection from 'sections/TestTitleSection/TestTitleSection';
import TestUserInfoSection from 'sections/TestUserInfoSection/TestUserInfoSection';
import TestContentSection from 'sections/TestContentSection/TestContentSection';

type TestFormProps = {
  title: string;
  nickname: string;
  date: string;
  content: string;
  likeCount: string;
};

const TestForm = ({ title, nickname, date, content, likeCount}: TestFormProps) => {
  return (
    <div className="max-w-2xl mx-auto bg-gray-100 p-8 rounded-lg flex flex-col gap-4">
      <TestTitleSection text={title} />
      <TestUserInfoSection nickname={nickname} date={date} likeCount={likeCount}/>
      <TestContentSection content={content} />
    </div>
  );
};
export default TestForm;