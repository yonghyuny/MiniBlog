// src/sections/MainCardFooterTopSection/MainCardFooterTopSection

import React from "react";
import MainCardCreatedAt from "components/MainComponent/MainCardCreatedAt";
import MainCardCommentCount from "components/MainComponent/MainCardCommentCount";

type MainCardFooterTopProps = {
  createdAt: string;
  commentCount: number;
};

const MainCardFooterTop: React.FC<MainCardFooterTopProps> = ({ createdAt, commentCount }) => {
  return (
    <div className="flex justify-between items-center p-3">
      <MainCardCreatedAt createdAt={createdAt} />
      <MainCardCommentCount commentCount={commentCount} />
    </div>
  );
};

export default MainCardFooterTop;
