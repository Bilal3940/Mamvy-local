// Image1Icon.tsx
const GridIcon1 =({ color, className }: { color?: string, className?:string }) => (
  <svg  className={className} width="28" height="24" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M0 8V0H8V8H0ZM0 18V10H8V18H0ZM10 8V0H18V8H10ZM10 18V10H18V18H10Z" fill={color}/>
  </svg>
);

export default GridIcon1;
