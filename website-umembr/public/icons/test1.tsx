// // Image1Icon.tsx
// const Text1Icon = ({ color = '#B3BED4' }: { color?: string }) => (
//   <svg width="30" height="30" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg">
// <path d="M0 0.75C0 0.335786 0.335786 0 0.75 0H13.25C13.6642 0 14 0.335786 14 0.75V2.75C14 3.16421 13.6642 3.5 13.25 3.5C12.8358 3.5 12.5 3.16421 12.5 2.75V1.5H7.75L7.75 14.5H9.25C9.66421 14.5 10 14.8358 10 15.25C10 15.6642 9.66421 16 9.25 16H4.75C4.33579 16 4 15.6642 4 15.25C4 14.8358 4.33579 14.5 4.75 14.5H6.25L6.25 1.5H1.5V2.75C1.5 3.16421 1.16421 3.5 0.75 3.5C0.335786 3.5 0 3.16421 0 2.75V0.75Z" fill={color}/>
// </svg>

// );

// export default Text1Icon;

const Text1Icon = ({ color = '#B3BED4', size = '30px' }: { color?: string; size?: string }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 14 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ maxWidth: '100%', height: 'auto' }} // Ensures SVG scales responsively
  >
    <path
      d="M0 0.75C0 0.335786 0.335786 0 0.75 0H13.25C13.6642 0 14 0.335786 14 0.75V2.75C14 3.16421 13.6642 3.5 13.25 3.5C12.8358 3.5 12.5 3.16421 12.5 2.75V1.5H7.75L7.75 14.5H9.25C9.66421 14.5 10 14.8358 10 15.25C10 15.6642 9.66421 16 9.25 16H4.75C4.33579 16 4 15.6642 4 15.25C4 14.8358 4.33579 14.5 4.75 14.5H6.25L6.25 1.5H1.5V2.75C1.5 3.16421 1.16421 3.5 0.75 3.5C0.335786 3.5 0 3.16421 0 2.75V0.75Z"
      fill={color}
    />
  </svg>
);

export default Text1Icon;

