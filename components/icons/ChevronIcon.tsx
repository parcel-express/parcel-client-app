import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

import { Colors } from '@/constants/Colors';

import { IconProps } from './types';

function ChevronIcon({ width, height, stroke, ...props }: IconProps) {
  return (
    <Svg width={width || 20} height={height || 20} viewBox='0 0 20 20' fill='none' {...props}>
      <Path
        d='M5 7.5l5 5 5-5'
        stroke={stroke || Colors.icon.tertiary}
        strokeWidth={1.66667}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </Svg>
  );
}

ChevronIcon.displayName = 'ChevronIcon';
export default ChevronIcon;
