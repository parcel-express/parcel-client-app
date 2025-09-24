import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

import { IconProps } from './types';

function SenderIcon({ width, height, stroke, ...props }: IconProps) {
  return (
    <Svg
      width={width || 18}
      height={height || 16}
      viewBox='0 0 18 16'
      fill='none'
      accessibilityRole='image'
      {...props}
    >
      <Path
        d='M14.25 14.75l2.25-2.25m0 0l-2.25-2.25m2.25 2.25H12m-3-1.875H5.625c-1.047 0-1.57 0-1.996.13a3 3 0 00-2 2c-.129.425-.129.948-.129 1.995m9.375-10.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0z'
        stroke={stroke || props.color || '#000'}
        strokeWidth={1.5}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </Svg>
  );
}

SenderIcon.displayName = 'SenderIcon';
export default React.memo(SenderIcon);
