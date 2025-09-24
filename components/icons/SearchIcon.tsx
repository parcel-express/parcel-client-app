import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

import { Colors } from '@/constants/Colors';

import { IconProps } from './types';

function SearchIcon({ width, height, stroke, ...props }: IconProps) {
  return (
    <Svg
      width={width || 18}
      height={height || 18}
      viewBox='0 0 18 18'
      fill='none'
      accessibilityRole='image'
      {...props}
    >
      <Path
        d='M16.5 16.5l-2.917-2.917m2.084-5a7.083 7.083 0 11-14.167 0 7.083 7.083 0 0114.167 0z'
        stroke={stroke ?? props.color ?? Colors.icon.primary}
        strokeWidth={props.strokeWidth ?? 1.66667}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </Svg>
  );
}

SearchIcon.displayName = 'SearchIcon';
export default React.memo(SearchIcon);
