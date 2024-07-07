// src/forms/MainCardForm/MainCardForm.tsx
import React from "react";
import MainCardImage from "components/MainComponent/MainCardImage";
import MainCardBodySection from "sections/MainCardBodySection/MainCardBodySection";
import MainCardFooterTop from "sections/MainCardFooterTopSection/MainCardFooterTopSection";
import MainCardFooterBottom from "sections/MainCardFooterBottomSection/MainCardFooterBottomSection";

type MainCardFormProps = {
  title: string;
  content: string;
  createdAt: string;
  nickname: string;
  postId: number;
  likeCount: number;
  commentsCount: number;
  imageUrl?: string;
  onPostClick: (postId: number, nickname: string) => void;
  onNicknameClick: (nickname: string) => void;
};

const MainCardForm: React.FC<MainCardFormProps> = ({
  title,
  content,
  createdAt,
  nickname,
  postId,
  likeCount,
  commentsCount,
  imageUrl,
  onPostClick,
  onNicknameClick,
}) => {
  return (
    <div className=" mb-4 border rounded shadow-2xl hover:shadow-custom hover:scale-105 font-custom max-w-xs h-110 flex flex-col justify-between">
      {imageUrl && <MainCardImage url={imageUrl} postId={postId} nickname={nickname} onPostClick={onPostClick} />}
      <div className={`flex-1 ${!imageUrl ? 'h-full' : ''} flex flex-col `}>
        <MainCardBodySection title={title} content={content} hasImage={!!imageUrl} postId={postId} nickname={nickname} onPostClick={onPostClick} />      
        <div className="mt-auto">
          <MainCardFooterTop createdAt={createdAt} commentCount={commentsCount} />
          <hr className="border-gray-300" />
          <MainCardFooterBottom nickname={nickname} likeCount={likeCount} onNicknameClick={onNicknameClick} />
        </div>
      </div>
    </div>
  );
};

export default MainCardForm;
