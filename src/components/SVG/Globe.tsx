export const Globe = MyComponent;

function MyComponent() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <style>
        {`
          .icon:hover svg .Globe__path-1 {
            fill: #007fe1;
          }
        `}
      </style>
      <path
        d="M2 12H22M2 12C2 17.5228 6.47715 22 12 22M2 12C2 6.47715 6.47715 2 12 2M22 12C22 17.5228 17.5228 22 12 22M22 12C22 6.47715 17.5228 2 12 2M12 2C14.5013 4.73835 15.9228 8.29203 16 12C15.9228 15.708 14.5013 19.2616 12 22M12 2C9.49872 4.73835 8.07725 8.29203 8 12C8.07725 15.708 9.49872 19.2616 12 22"
        className="fill-grey-200 Globe__path-1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
