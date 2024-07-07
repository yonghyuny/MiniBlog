import React from 'react';
import TestLabel from 'components/TestLabel/TestLabel';

const TestUserInfoSection = ({ nickname, date, likeCount }: { nickname: string, date: string, likeCount: string }) => {
  return (
    <div className="w-full flex">
      <div className='flex gap-4'>
        <div className="p-3 rounded-md bg-white shadow-md">
          <TestLabel text={nickname} />
          
        </div>
        <div className="p-3 rounded-md bg-white shadow-md">
          <TestLabel text={date} />
        </div>
      </div>
      <div className="ml-auto p-3 rounded-md bg-white shadow-md">
        {/* 예를 들어 좋아요 버튼이 들어갈 수 있는 자리 */}
        <TestLabel text={`❤️ ${likeCount}`} />
      </div>
      
    </div>
  );
};

export default TestUserInfoSection;