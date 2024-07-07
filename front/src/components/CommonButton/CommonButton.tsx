// components/CommonButton/CommonButton
export type CommonButtonProps = {
  onClick?: () => void;
  text: string;
  className?: string;
};

const CommonButton = ({ onClick, text, className }: CommonButtonProps) => {
  return (
    <button
      className={`text-left px-4 py-2 ${className}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default CommonButton;
