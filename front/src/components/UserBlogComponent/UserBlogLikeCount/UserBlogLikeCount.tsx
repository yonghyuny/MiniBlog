type UserBlogLikeCountProps = {
  likeCount: number;
};
const UserBlogLikeCount = ({ likeCount }: UserBlogLikeCountProps) => {
  return (
    <div className="text-red-500">
      ♥️<span className="text-black">{likeCount}</span>
    </div>
  );
};

export default UserBlogLikeCount;
