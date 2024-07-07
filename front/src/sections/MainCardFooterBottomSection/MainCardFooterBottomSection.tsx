//src/sections/MainCardFooterBottomSection/MainCardFooterBottomSection

import React from "react";
import MainCardNickname from "components/MainComponent/MainCardNickname";
import MainCardLikeCount from "components/MainComponent/MainCardLikeCount";

type MainCardFooterBottomProps = {
  nickname: string;
  likeCount: number;
  onNicknameClick: (nickname: string) => void;
};

const MainCardFooterBottom: React.FC<MainCardFooterBottomProps> = ({ nickname, likeCount, onNicknameClick }) => {
  return (
    <div className="flex justify-between items-center p-3">
      <MainCardNickname nickname={nickname} onNicknameClick={onNicknameClick} />
      <MainCardLikeCount likeCount={likeCount} />
    </div>
  );
};

export default MainCardFooterBottom;
