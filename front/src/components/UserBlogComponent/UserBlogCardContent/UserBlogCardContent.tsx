type UserBlogCardContentProps = {
  content: string;
};

const UserBlogCardContent = ({ content }: UserBlogCardContentProps) => {
  return <p className="overflow-hidden line-clamp-3">{content}</p>;
};
export default UserBlogCardContent;
