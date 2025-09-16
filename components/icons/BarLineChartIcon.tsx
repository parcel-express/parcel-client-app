import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

import { Colors } from '@/constants/Colors';

import type { IconProps } from './types';

function BarLineChartIcon({ width, height, stroke, ...props }: IconProps) {
  return (
    <Svg
      width={width ?? 20}
      height={height ?? 21}
      viewBox='0 0 20 21'
      fill='none'
      accessibilityRole='image'
      {...props}
    >
      <Path
        d='M16.666 17.167v-5.834M10 17.167V8.833m-6.667 8.334v-3.334m7.839-9.143l4.307 1.615M8.999 5L4.333 8.5M17.55 5.866a1.25 1.25 0 11-1.767 1.768 1.25 1.25 0 011.767-1.768zm-13.333 2.5a1.25 1.25 0 11-1.768 1.768 1.25 1.25 0 011.768-1.768zm6.667-5a1.25 1.25 0 11-1.768 1.768 1.25 1.25 0 011.768-1.768z'
        stroke={stroke ?? Colors.icon.primary}
        strokeWidth={props.strokeWidth ?? 1.39167}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </Svg>
  );
}

BarLineChartIcon.displayName = 'BarLineChartIcon';
export default React.memo(BarLineChartIcon);
