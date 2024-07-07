// src/components/MainCardLikeCount/MainCardLikeCount
import React from "react";

type MainCardLikeCountProps = {
  likeCount: number;
};

const MainCardLikeCount: React.FC<MainCardLikeCountProps> = ({ likeCount }) => {
  return (
    <div className="text-right">
      <span className="text-red-500">♥️ {likeCount}</span>
    </div>
  );
};

export default MainCardLikeCount;
