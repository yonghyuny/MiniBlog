import React from "react";
import CommonHeader from "components/CommonHeader/CommonHeader";
import CommonButton from "components/CommonButton/CommonButton";

type CommonHeaderSectionProps = {
  title: string;
  onHeaderClick: () => void;
  hasNickname: boolean;
  nickname: string | null;
  onLoginClick: () => void;
  onNicknameClick: () => void;
};

const CommonHeaderSection: React.FC<CommonHeaderSectionProps> = ({ title, onHeaderClick, hasNickname, nickname, onLoginClick, onNicknameClick }) => {
  return (
    <header className="flex bg-[#444444] text-white p-4 justify-between relative">
      <CommonHeader title={title} onClick={onHeaderClick} />
      {hasNickname && nickname ? (
        <div className="relative">
          <CommonButton text={nickname} onClick={onNicknameClick} />
        </div>
      ) : (
        <CommonButton text="로그인" onClick={onLoginClick} />
      )}
    </header>
  );
};

export default CommonHeaderSection;
