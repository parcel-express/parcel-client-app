import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

import { Colors } from '@/constants/Colors';

import { IconProps } from './types';

function XIcon({ width, height, stroke, ...props }: IconProps) {
  return (
    <Svg
      width={width ?? 14}
      height={height ?? 14}
      viewBox='0 0 14 14'
      fill='none'
      accessibilityRole='image'
      {...props}
    >
      <Path
        d='M13 1L1 13M1 1l12 12'
        stroke={stroke ?? props.color ?? Colors.icon.black}
        strokeWidth={props.strokeWidth ?? 2}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </Svg>
  );
}

XIcon.displayName = 'XIcon';
export default React.memo(XIcon);
