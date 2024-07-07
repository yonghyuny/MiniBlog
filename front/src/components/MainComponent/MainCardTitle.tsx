//src/components/MainCardTitle/MainCardTitle
import React from "react";

type MainCardTitleProps = {
  title: string;
  postId: number;
  nickname: string;
  onPostClick: (postId: number, nickname: string  ) => void;
};

const MainCardTitle: React.FC<MainCardTitleProps> = ({ title, postId, nickname, onPostClick }) => {
  return (
    <h2 className="overflow-hidden line-clamp-1 text-2xl font-bold mt-3 cursor-pointer"
    onClick={() => onPostClick(postId, nickname)}
    >
      {title}
    </h2>
    
  );
};

export default MainCardTitle;
