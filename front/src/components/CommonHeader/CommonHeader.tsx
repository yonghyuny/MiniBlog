// components/CommonHeader/CommonHedaer

type CommonHeaderProps = {
  title: string;
  onClick?: () => void;
};

const CommonHeader = ({ title, onClick }: CommonHeaderProps) => {
  
  return (
    <header className=" font-custom">
      <h1 className="text-2xl cursor-pointer" onClick={onClick}>
        {title}
      </h1>
    </header>
  );
};
export default CommonHeader;
