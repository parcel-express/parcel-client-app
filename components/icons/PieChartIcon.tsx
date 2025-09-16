import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

import { Colors } from '@/constants/Colors';

import type { IconProps } from './types';

function PieChartIcon({ width, height, stroke, ...props }: IconProps) {
  return (
    <Svg
      width={width ?? 20}
      height={height ?? 20}
      viewBox='0 0 20 20'
      fill='none'
      accessibilityRole='image'
      {...props}
    >
      <Path
        d='M10 1.667A8.334 8.334 0 0118.334 10M10 1.667V10m0-8.333A8.333 8.333 0 1018.334 10M10 1.667A8.333 8.333 0 0118.334 10m0 0H10m8.334 0a8.333 8.333 0 01-3.435 6.742L10 10'
        stroke={stroke ?? props.color ?? Colors.icon.primary}
        strokeWidth={1.39167}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </Svg>
  );
}

PieChartIcon.displayName = 'PieChartIcon';
export default React.memo(PieChartIcon);
