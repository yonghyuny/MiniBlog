type UserBlogCardTitleProps = {
  title: string;
};

const UserBlogCardTitle = ({ title }: UserBlogCardTitleProps) => {
  return (
    <h4 className="font-bold mb-8 text-xl pb-6 overflow-hidden line-clamp-1 h-3">
      {title}
    </h4>
  );
};

export default UserBlogCardTitle;
