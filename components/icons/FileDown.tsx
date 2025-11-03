import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

import { Colors } from '@/constants/Colors';

import { IconProps } from './types';

function FileDown({ width, height, stroke, ...props }: IconProps) {
  return (
    <Svg
      width={width || 15}
      height={height || 17}
      viewBox='0 0 15 17'
      fill='none'
      accessibilityRole='image'
      {...props}
    >
      <Path
        d='M12.75 8.625V4.35c0-1.26 0-1.89-.245-2.371a2.25 2.25 0 00-.984-.984C11.041.75 10.412.75 9.15.75h-4.8c-1.26 0-1.89 0-2.371.245a2.25 2.25 0 00-.984.984C.75 2.459.75 3.089.75 4.35v7.8c0 1.26 0 1.89.245 2.371.216.424.56.768.984.984.48.245 1.11.245 2.37.245h2.776M8.25 7.5h-4.5m1.5 3h-1.5m6-6h-6m5.25 9l2.25 2.25m0 0l2.25-2.25m-2.25 2.25v-4.5'
        stroke={stroke || Colors.icon.black}
        strokeWidth={props.strokeWidth || 1.5}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </Svg>
  );
}

FileDown.displayName = 'FileDown';
export default FileDown;
