import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

import { Colors } from '@/constants/Colors';

import { IconProps } from './types';

function CalendarIcon({
  width,
  height,
  stroke,
  'aria-hidden': ariaHidden,
  ...props
}: IconProps & { 'aria-hidden'?: boolean }) {
  return (
    <Svg
      width={width || 20}
      height={height || 20}
      viewBox='0 0 20 20'
      fill='none'
      accessibilityRole={ariaHidden ? undefined : 'image'}
      aria-hidden={ariaHidden}
      {...props}
    >
      <Path
        d='M17.5 8.333h-15m10.833-6.666V5M6.667 1.667V5M6.5 18.333h7c1.4 0 2.1 0 2.635-.272a2.5 2.5 0 001.092-1.093c.273-.535.273-1.235.273-2.635v-7c0-1.4 0-2.1-.273-2.635a2.5 2.5 0 00-1.092-1.092c-.535-.273-1.235-.273-2.635-.273h-7c-1.4 0-2.1 0-2.635.273a2.5 2.5 0 00-1.093 1.092C2.5 5.233 2.5 5.933 2.5 7.333v7c0 1.4 0 2.1.272 2.635a2.5 2.5 0 001.093 1.093c.535.272 1.235.272 2.635.272z'
        stroke={stroke ?? Colors.icon.tertiary}
        strokeWidth={props.strokeWidth ?? 1.66667}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </Svg>
  );
}

CalendarIcon.displayName = 'CalendarIcon';
export default React.memo(CalendarIcon);
