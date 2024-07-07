type CardListTitleProps = {
  listTitle: string;
};
const CardListTitle = ({ listTitle }: CardListTitleProps) => {
  return <h3 className="text-2xl font-bold p-3">{listTitle}</h3>;
};
export default CardListTitle;
