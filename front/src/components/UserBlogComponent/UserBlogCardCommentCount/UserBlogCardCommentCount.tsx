type UserBlogCardCommentCountProps = {
  commentCount: number;
};

const UserBlogCardCommentCount = ({
  commentCount,
}: UserBlogCardCommentCountProps) => {
  return <div>{commentCount}개의 댓글</div>;
};
export default UserBlogCardCommentCount;
