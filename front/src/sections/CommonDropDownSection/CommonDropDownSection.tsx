import React from "react";
import CommonButton from "components/CommonButton/CommonButton"; 

type CommonDropDownSectionProps = {
  onMyPageClick: () => void;
  onCreatePostClick: () => void;
  onLogoutClick: () => void;
  onDeleteAccountClick: () => void;
};

const CommonDropDownSection: React.FC<CommonDropDownSectionProps> = ({
  onMyPageClick,
  onCreatePostClick,
  onLogoutClick,
  onDeleteAccountClick,
}) => {
  return (
    <div className="relative">
      <div className="absolute right-0  w-48 bg-[#444444] border rounded shadow-lg z-10">
        <ul>
          <li>
            <CommonButton text="내 블로그" onClick={onMyPageClick} className="text-white" />
          </li>
          <li>
            <CommonButton text="새글작성" onClick={onCreatePostClick} className="text-white"/>
          </li>
          <li>
            <CommonButton text="로그아웃" onClick={onLogoutClick} className="text-white"/>
          </li>
          <li>
            <CommonButton text="회원탈퇴" onClick={onDeleteAccountClick} className="text-red-600" />
          </li>
        </ul>
      </div>
    </div>
    
  );
};

export default CommonDropDownSection;
