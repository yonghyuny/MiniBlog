import UserBlogCardCommentCount from "components/UserBlogComponent/UserBlogCardCommentCount/UserBlogCardCommentCount";
import UserBlogCardCreateAt from "components/UserBlogComponent/UserBlogCardCreatedAt/UserBlogCardCreateAt";
import UserBlogLikeCount from "components/UserBlogComponent/UserBlogLikeCount/UserBlogLikeCount";

type UserBlogCardBottomSectionProps = {
  createdAt: string;
  likeCount: number;
  commentCount: number;
};

const UserBlogCardBottomSection = ({
  createdAt,
  commentCount,
  likeCount,
}: UserBlogCardBottomSectionProps) => {
  return (
    <div className="flex justify-between">
      <div className="flex gap-5 mt-10">
        <UserBlogCardCreateAt createdAt={createdAt} />
        <UserBlogCardCommentCount commentCount={commentCount} />
        <UserBlogLikeCount likeCount={likeCount} />
      </div>
    </div>
  );
};
export default UserBlogCardBottomSection;
