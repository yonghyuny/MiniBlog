import UserBlogCardContent from "components/UserBlogComponent/UserBlogCardContent/UserBlogCardContent";
import UserBlogCardTitle from "components/UserBlogComponent/UserBlogCardTitle/UserBlogCardTitle";
import UserBlogCardBottomSection from "sections/UserBlogCardBottomSection/UserBlogCardBottomSection";

type UserBlogFormProps = {
  title: string;
  content: string;
  createdAt: string;
  commentCount: number;
  likeCount: number;
};

const UserBlogCardForm = ({
  title,
  content,
  createdAt,
  commentCount,
  likeCount,
}: UserBlogFormProps) => {
  return (
    <div className="h-60  border rounded shadow-xl p-4 mb-10 hover:shadow-custom hover:scale-105 cursor-pointer">
      <UserBlogCardTitle title={title} />
      <UserBlogCardContent content={content} />
      <UserBlogCardBottomSection
        createdAt={createdAt}
        commentCount={commentCount}
        likeCount={likeCount}
      />
    </div>
  );
};

export default UserBlogCardForm;
