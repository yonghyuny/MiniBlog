export type SidebarListProps = {
  title: string;
};

const SidebarList = ({ title }: SidebarListProps) => {
  return (
    <>
      <ul className="flex flex-col justify-center gap-2">
        <li className="text-md  shadow-lg overflow-hidden hover:shadow-custom hover:scale-105 cursor-pointer m-2 p-2 border-b-2">
          {title}
          <div>
            {" "}
            <span></span>
          </div>
        </li>
      </ul>
    </>
  );
};
export default SidebarList;
