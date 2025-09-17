import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

import { Colors } from '@/constants/Colors';

import type { IconProps } from './types';

function MarkerPinIconLarge({ width, height, stroke, ...props }: IconProps) {
  return (
    <Svg
      width={width ?? 66}
      height={height ?? 66}
      viewBox='0 0 66 66'
      fill='none'
      accessibilityRole='image'
      {...props}
    >
      <Path
        d='M12.584 39.669c-5.4 2.382-8.75 5.701-8.75 9.373 0 7.248 13.058 13.125 29.166 13.125s29.167-5.877 29.167-13.125c0-3.672-3.35-6.992-8.75-9.373M50.5 21.333c0 11.853-13.125 17.5-17.5 26.25-4.375-8.75-17.5-14.397-17.5-26.25 0-9.665 7.835-17.5 17.5-17.5s17.5 7.835 17.5 17.5zm-14.583 0a2.917 2.917 0 11-5.833 0 2.917 2.917 0 015.833 0z'
        stroke={stroke ?? props.color ?? Colors.icon.primary}
        strokeWidth={props.strokeWidth ?? 5.83333}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </Svg>
  );
}

MarkerPinIconLarge.displayName = 'MarkerPinIconLarge';
export default React.memo(MarkerPinIconLarge);
