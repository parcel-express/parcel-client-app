import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

import { Colors } from '@/constants/Colors';

import { IconProps } from './types';

function BellIcon({ width, height, stroke, ...props }: IconProps) {
  return (
    <Svg
      width={width || 21}
      height={height || 21}
      viewBox='0 0 21 21'
      fill='none'
      accessibilityRole='image'
      {...props}
    >
      <Path
        d='M13 16.333a2.5 2.5 0 01-5 0M11.997 5.7a2.083 2.083 0 10-2.994 0M15.5 9.833c0-1.149-.527-2.251-1.464-3.064-.938-.812-2.21-1.269-3.536-1.269s-2.598.457-3.535 1.27C6.027 7.581 5.5 8.683 5.5 9.832c0 1.902-.471 3.293-1.06 4.288-.67 1.134-1.006 1.7-.992 1.836.015.155.043.204.168.296.11.08.662.08 1.766.08h10.236c1.104 0 1.656 0 1.766-.08.126-.092.154-.14.169-.296.013-.135-.322-.702-.993-1.836-.588-.995-1.06-2.386-1.06-4.288z'
        stroke={stroke || props.color || Colors.icon.black}
        strokeWidth={props.strokeWidth || 1.66667}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </Svg>
  );
}

BellIcon.displayName = 'BellIcon';
export default React.memo(BellIcon);
