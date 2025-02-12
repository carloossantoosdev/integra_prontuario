import { Typography } from '@mui/material';

interface TitleProps {
  title: string;
}

export function Title({ title }: TitleProps) {
  return (
    <Typography
      variant="h6"
      marginTop={2}
      fontWeight="bold"
    >
      {title}
    </Typography>
  );
}
