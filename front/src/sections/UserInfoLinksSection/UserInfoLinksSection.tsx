import React from 'react';

const UserInfoLinksSection: React.FC = () => {
  return (
    <div className="flex space-x-2 text-sm text-indigo-600">
      <a href="/forgot-username" className="hover:underline">아이디 찾기</a>
      <span>|</span>
      <a href="/forgot-password" className="hover:underline">비밀번호 찾기</a>
    </div>
  );
};

export default UserInfoLinksSection;
