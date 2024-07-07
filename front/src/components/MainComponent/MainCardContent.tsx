//src/components/MainCardContent/MainCardContent
import React from "react";

type MainCardContentProps = {
  content: string;
  hasImage: boolean;
  postId: number;
  nickname: string;
  onPostClick: (postId: number, nickname: string) => void;
};

const MainContentText: React.FC<MainCardContentProps> = ({ content, hasImage, postId, nickname, onPostClick }) => {
  return (
    <p className={`overflow-hidden mt-3 ${hasImage ? 'line-clamp-4' : 'line-clamp-6'} cursor-pointer`}
    onClick={() => onPostClick(postId, nickname)}
    dangerouslySetInnerHTML={{ __html: content}}
    >
    </p>
  );
};

export default MainContentText;