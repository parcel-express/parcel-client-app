import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

import { Colors } from '@/constants/Colors';

import { IconProps } from './types';

function UserIcon({ width, height, stroke, ...props }: IconProps) {
  return (
    <Svg
      width={width || 16}
      height={height || 18}
      viewBox='0 0 16 18'
      fill='none'
      {...props}
      accessibilityRole='image'
      {...props}
    >
      <Path
        d='M14.667 16.5c0-1.163 0-1.745-.144-2.218a3.333 3.333 0 00-2.222-2.222c-.473-.143-1.055-.143-2.218-.143H5.917c-1.163 0-1.745 0-2.218.143a3.333 3.333 0 00-2.222 2.222c-.144.473-.144 1.055-.144 2.218M11.75 5.25a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z'
        stroke={stroke || props.color || Colors.icon.primary}
        strokeWidth={props.strokeWidth || 1.66667}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </Svg>
  );
}

export default UserIcon;
