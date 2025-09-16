import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

import { Colors } from '@/constants/Colors';

import type { IconProps } from './types';

function FaceIdIcon({ width, height, stroke, ...props }: IconProps) {
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
        d='M6.667 2.5H6.5c-1.4 0-2.1 0-2.635.272a2.5 2.5 0 00-1.093 1.093C2.5 4.4 2.5 5.1 2.5 6.5v.167M6.667 17.5H6.5c-1.4 0-2.1 0-2.635-.273a2.5 2.5 0 01-1.093-1.092C2.5 15.6 2.5 14.9 2.5 13.5v-.167m15-6.666V6.5c0-1.4 0-2.1-.273-2.635a2.5 2.5 0 00-1.092-1.093C15.6 2.5 14.9 2.5 13.5 2.5h-.167M17.5 13.333v.167c0 1.4 0 2.1-.273 2.635a2.5 2.5 0 01-1.092 1.092c-.535.273-1.235.273-2.635.273h-.167M6.25 6.667v1.25m7.5-1.25v1.25M9.167 10.5c.666 0 1.25-.583 1.25-1.25V6.667m2.25 6a3.822 3.822 0 01-5.417 0'
        stroke={stroke ?? Colors.icon.primary}
        strokeWidth={1.39167}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </Svg>
  );
}

export default React.memo(FaceIdIcon);
