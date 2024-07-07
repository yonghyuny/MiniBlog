// src/components/MainCardImage/MainCardImage
import React from "react";

type MainCardImageProps = {
  url?: string; // URL이 optional로 변경
  postId: number;
  nickname: string;
  onPostClick: (postId: number, nickname: string) => void;
};

const MainCardImage: React.FC<MainCardImageProps> = ({ url, postId, nickname, onPostClick }) => {
  return url ? (
    <div className="h-40  w-full bg-red-200 cursor-pointer" onClick={() => onPostClick(postId, nickname)}>
      <img src={url} alt="Post" className="object-cover h-full w-full" />
    </div>
  ) : (
    <div className=" mb-4"></div>
  );
};

export default MainCardImage;