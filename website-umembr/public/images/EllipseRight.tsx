import React from 'react';

const EllipseRightImage = ({ color = '#F1E0FF' , opacity = 0.15  }: { color?: string,opacity?: number }) => (
<svg width="933" height="1107" viewBox="0 0 933 1107" fill="none" xmlns="http://www.w3.org/2000/svg">
<g filter="url(#filter0_f_63_1612)">
<path d="M185.375 726.519C49.2985 559.038 340.62 314.14 508.101 178.064C675.582 41.9873 684.632 460.234 984.243 295.897C1264.9 341.557 1296.66 797.849 914.288 864.962C449.392 1167.36 490.279 618.144 185.375 726.519Z" fill={color} fill-opacity={opacity}/>
</g>
<defs>
<filter id="filter0_f_63_1612" x="0.221924" y="0.367188" width="1347.89" height="1106.59" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
<feGaussianBlur stdDeviation="75" result="effect1_foregroundBlur_63_1612"/>
</filter>
</defs>
</svg>
);

export default EllipseRightImage;
