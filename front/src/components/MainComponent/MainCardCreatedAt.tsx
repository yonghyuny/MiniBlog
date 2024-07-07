// src/components/MainCardCreatedAt/MainCardCreatedAt.tsx
import React from "react";

type MainCardCreatedAtProps = {
  createdAt: string;
};

const MainCardCreatedAt: React.FC<MainCardCreatedAtProps> = ({ createdAt }) => {
  return (
    <small>{new Date(createdAt).toLocaleString()}</small>
  );
};

export default MainCardCreatedAt;
