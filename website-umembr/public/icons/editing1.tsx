// Image1Icon.tsx
const EditIcon = ({ color, className }: { color?: string, className?:string })=> (
  <svg  className={className} width="28" height="24" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
   <path d="M0 16V12H4V16H0ZM6 16V12H20V16H6ZM0 10V6H4V10H0ZM6 10V6H20V10H6ZM0 4V0H4V4H0ZM6 4V0H20V4H6Z" fill={color}/>
  </svg>
);

export default EditIcon;
