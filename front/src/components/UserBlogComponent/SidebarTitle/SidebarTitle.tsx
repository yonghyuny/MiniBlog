export type SidebarTitleProps = {
  text: string;
};
const SidebarTitle = ({ text }: SidebarTitleProps) => {
  return <h3 className="text-2xl font-bold pb-2">{text}</h3>;
};

export default SidebarTitle;
