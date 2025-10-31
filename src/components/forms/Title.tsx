interface TitleProps {
  title: string;
}

export const Title = ({ title }: TitleProps) => {
  return <h2 className="text-xl font-bold mb-4 mt-6">{title}</h2>;
};
