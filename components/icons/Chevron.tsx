import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

import { Colors } from '@/constants/Colors';

import { IconProps } from './types';

function Chevron({ width, height, stroke, ...props }: IconProps) {
  return (
    <Svg
      width={width || 8}
      height={height || 12}
      viewBox='0 0 8 12'
      fill='none'
      accessibilityRole='image'
      {...props}
    >
      <Path
        d='M6.5 11l-5-5 5-5'
        stroke={stroke ?? Colors.icon.secondary}
        strokeWidth={props.strokeWidth ?? 1.67}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </Svg>
  );
}

Chevron.displayName = 'Chevron';
export default React.memo(Chevron);
