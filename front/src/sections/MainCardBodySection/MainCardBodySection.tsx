//src/sections/MainCardBodySection/MainCardBodySection
import React from "react";
import MainCardTitle from "components/MainComponent/MainCardTitle";
import MainCardText from "components/MainComponent/MainCardContent";

type MainCardBodySectionProps = {
  title: string;
  content: string;
  hasImage: boolean;
  postId: number;
  nickname: string
  onPostClick: (postId: number, nickname: string) => void;
};

const MainCardBodySection: React.FC<MainCardBodySectionProps> = ({ title, content, hasImage, postId, nickname, onPostClick }) => {
  return (
    <div className="pl-3 pr-3">
      <MainCardTitle title={title} postId={postId} nickname={nickname} onPostClick={onPostClick} />
      <MainCardText content={content} hasImage={hasImage} postId={postId} nickname={nickname} onPostClick={onPostClick} />
    </div>
  );
};

export default MainCardBodySection;
