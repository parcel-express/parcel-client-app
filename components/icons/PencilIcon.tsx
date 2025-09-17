import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

import { Colors } from '@/constants/Colors';

import { IconProps } from './types';

function PencilIcon({ width, height, stroke, ...props }: IconProps) {
  return (
    <Svg
      width={width ?? 16}
      height={height ?? 16}
      viewBox='0 0 16 16'
      fill='none'
      accessibilityRole='image'
      {...props}
    >
      <Path
        d='M1.917 12.077c.03-.275.046-.413.088-.542.037-.114.09-.223.155-.324.075-.113.173-.21.369-.407L11.333 2A1.886 1.886 0 0114 4.667L5.196 13.47c-.196.196-.295.294-.408.369-.1.066-.209.118-.323.155-.129.042-.267.057-.542.088l-2.256.25.25-2.256z'
        stroke={stroke ?? props.color ?? Colors.icon.secondary}
        strokeWidth={props.strokeWidth ?? 1.5}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </Svg>
  );
}

PencilIcon.displayName = 'PencilIcon';
export default React.memo(PencilIcon);
