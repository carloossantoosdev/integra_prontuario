interface IconArrowLeftProps {
  size?: number;
}

export const IconArrowLeft = ({ size = 24 }: IconArrowLeftProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M15 8.17188L11.2785 12L15 15.8281L13.8608 17L9 12L13.8608 7L15 8.17188Z"
        fill="#05662B"
      />
    </svg>
  );
};
