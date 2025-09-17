import * as React from 'react';
import Svg, { Defs, LinearGradient, Path, Stop } from 'react-native-svg';

import { IconProps } from './types';

function PlusIcon({ width, height, ...props }: IconProps) {
  return (
    <Svg
      width={width ?? 16}
      height={height ?? 16}
      viewBox='0 0 16 16'
      fill='none'
      accessibilityRole='image'
      {...props}
    >
      <Path
        d='M8 1v14M1 8h14'
        stroke='url(#paint0_linear_346_40846)'
        strokeWidth={2}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <Defs>
        <LinearGradient
          id='paint0_linear_346_40846'
          x1={3.98148}
          y1={5.22917}
          x2={17.1246}
          y2={6.04455}
          gradientUnits='userSpaceOnUse'
        >
          <Stop stopColor='#662D91' />
          <Stop offset={1} stopColor='#302E9C' />
        </LinearGradient>
      </Defs>
    </Svg>
  );
}

PlusIcon.displayName = 'PlusIcon';
export default React.memo(PlusIcon);
