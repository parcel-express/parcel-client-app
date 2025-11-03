import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

import { Colors } from '@/constants/Colors';

import { IconProps } from './types';

function FileBack({ width, height, stroke, ...props }: IconProps) {
  return (
    <Svg
      width={width || 24}
      height={height || 24}
      viewBox='0 0 24 24'
      fill='none'
      accessibilityRole='image'
      {...props}
    >
      <Path
        d='M20 12.498v-5.7c0-1.68 0-2.52-.328-3.161a3 3 0 00-1.31-1.311c-.642-.327-1.482-.327-3.162-.327H8.8c-1.68 0-2.52 0-3.162.327a3 3 0 00-1.312 1.31C4 4.279 4 5.119 4 6.8v10.4c0 1.68 0 2.52.326 3.161a3 3 0 001.312 1.312c.641.326 1.481.326 3.161.326h3.7m1.5-11H8m2 4H8m8-8H8M18.001 15.999l-3 3m0 0l3 3m-3-3h6'
        stroke={stroke ?? Colors.icon.black}
        strokeWidth={props.strokeWidth ?? 2}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </Svg>
  );
}

FileBack.displayName = 'FileBack';
export default FileBack;
