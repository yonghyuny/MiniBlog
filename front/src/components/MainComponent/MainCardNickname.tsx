// src/components/MainCardNickname/MainCardNickname
import React from "react";

type MainCardNicknameProps = {
  nickname: string;
  onNicknameClick: (nickname: string) => void;
};

const MainCardNickname: React.FC<MainCardNicknameProps> = ({ nickname, onNicknameClick }) => {
  return (
    <div className="text-left cursor-pointer" onClick={() => onNicknameClick(nickname)}>
      by {nickname}
    </div>
  );
};

export default MainCardNickname;
