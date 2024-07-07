type UserBlogCardCreateAtProps = {
  createdAt: string;
};

const UserBlogCardCreateAt = ({ createdAt }: UserBlogCardCreateAtProps) => {
  return <div>{new Date(createdAt).toLocaleString()}</div>;
};

export default UserBlogCardCreateAt;
