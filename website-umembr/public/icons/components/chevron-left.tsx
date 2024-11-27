import React from 'react';

interface IconProps {
  color: string;
}

const ChevronLeftIconComponent: React.FC<IconProps> = ({ color }) => (
  <svg width='8' height='10' viewBox='0 0 8 12' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <path d='M6 12L0 6L6 0L7.4 1.4L2.8 6L7.4 10.6L6 12Z' fill={color} />
  </svg>
);

export default ChevronLeftIconComponent;
