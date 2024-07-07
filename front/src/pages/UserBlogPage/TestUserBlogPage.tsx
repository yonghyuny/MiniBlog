import UserBlogContainer from 'containers/UserBlogContainer/UserBlogContainer';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const TestUserBlogPage: React.FC = () => {
  const { nickname } = useParams();
  useEffect(() => {
    console.log("게시글 ID:", nickname);
    // postId를 이용해 데이터 요청 및 출력 로직 작성
  }, [nickname]);
  return (
    <div>
      <UserBlogContainer/>
    </div>
  );
};

export default TestUserBlogPage;
