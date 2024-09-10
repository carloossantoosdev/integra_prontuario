interface IconArrowLeftProps {
  size?: number;
}

export const IconArrowRight = ({ size = 24 }: IconArrowLeftProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9 15.8281L12.7215 12L9 8.17187L10.1392 7L15 12L10.1392 17L9 15.8281Z"
        fill="#05662B"
      />
    </svg>
  );
};
