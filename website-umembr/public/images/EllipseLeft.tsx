import React from 'react';

const EllipseLeftImage = ({ color = '#166BE1', opacity = 0.2  }: { color?: string, opacity?: number}) => (
  <svg
    width="1165"
    height="1570"
    viewBox="0 0 1165 1570"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ mixBlendMode: 'multiply' }}
  >
    <g filter="url(#filter0_f_63_1611)">
      <path
        d="M965 894.49C965 1145.79 331.094 1370 79.8874 1370C-171.319 1370 40.9592 1042.62 40.9592 791.326C-891.278 940.948 326.435 -85.9091 252.676 278.922C429.562 503.013 344.192 796.791 965 894.49Z"
        fill={color}
        fillOpacity={opacity}
      />
    </g>
    <defs>
      <filter
        id="filter0_f_63_1611"
        x="-512"
        y="0"
        width="1677"
        height="1570"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur stdDeviation="100" result="effect1_foregroundBlur_63_1611" />
      </filter>
    </defs>
  </svg>
);

export default EllipseLeftImage;
