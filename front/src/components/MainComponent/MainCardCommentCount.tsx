// src/components/MainCardCommentCount/MainCardCommentCount.tsx
import React from "react";

type MainCardCommentCountProps = {
  commentCount: number;
};

const MainCardCommentCount: React.FC<MainCardCommentCountProps> = ({ commentCount }) => {
  return (
    <small>{commentCount}개의 댓글</small>
  );
};

export default MainCardCommentCount;
