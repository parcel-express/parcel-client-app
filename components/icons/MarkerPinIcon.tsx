import * as React from 'react';
import Svg, { ClipPath, Defs, G, Path } from 'react-native-svg';

import { Colors } from '@/constants/Colors';

import type { IconProps } from './BarLineChartIcon';

function MarkerPinIcon({ width, height, fill, ...props }: IconProps) {
  return (
    <Svg
      width={width || 20}
      height={height || 20}
      viewBox='0 0 20 20'
      fill='none'
      accessibilityRole='image'
      {...props}
    >
      <G clipPath='url(#clip0_346_40490)'>
        <Path
          d='M4.167 11.905c-1.543.68-2.5 1.63-2.5 2.678 0 2.071 3.731 3.75 8.333 3.75 4.603 0 8.334-1.679 8.334-3.75 0-1.049-.957-1.997-2.5-2.678M15 6.667c0 3.386-3.75 5-5 7.5-1.25-2.5-5-4.114-5-7.5a5 5 0 1110 0zm-4.166 0a.833.833 0 11-1.667 0 .833.833 0 011.667 0z'
          stroke={fill || Colors.icon.primary}
          strokeWidth={1.39167}
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </G>
      <Defs>
        <ClipPath id='clip0_346_40490'>
          <Path fill='#fff' d='M0 0H20V20H0z' />
        </ClipPath>
      </Defs>
    </Svg>
  );
}

export default MarkerPinIcon;
