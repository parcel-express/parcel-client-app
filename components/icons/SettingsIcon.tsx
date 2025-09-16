import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

import { Colors } from '@/constants/Colors';

import type { IconProps } from './types';

function SettingsIcon({ width, height, stroke, ...props }: IconProps) {
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
        d='M10 12.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z'
        stroke={stroke ?? props.color ?? Colors.icon.primary}
        strokeWidth={props.strokeWidth ?? 1.39167}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <Path
        d='M15.606 12.273a1.25 1.25 0 00.25 1.379l.046.045a1.514 1.514 0 01-.492 2.473 1.514 1.514 0 01-1.652-.33l-.046-.044a1.25 1.25 0 00-1.378-.25 1.25 1.25 0 00-.758 1.143v.13a1.515 1.515 0 01-3.03 0v-.069a1.25 1.25 0 00-.818-1.144 1.25 1.25 0 00-1.38.25l-.045.046a1.514 1.514 0 01-2.472-.492 1.515 1.515 0 01.328-1.652l.046-.046a1.25 1.25 0 00.25-1.379 1.25 1.25 0 00-1.144-.757h-.129a1.515 1.515 0 010-3.03h.068a1.25 1.25 0 001.144-.819 1.25 1.25 0 00-.25-1.379L4.1 6.303a1.515 1.515 0 112.144-2.144l.045.046a1.25 1.25 0 001.379.25h.06a1.25 1.25 0 00.758-1.144v-.13a1.515 1.515 0 013.03 0v.069a1.25 1.25 0 00.758 1.144 1.25 1.25 0 001.379-.25l.045-.045a1.514 1.514 0 012.589 1.071 1.514 1.514 0 01-.445 1.072l-.045.046a1.25 1.25 0 00-.25 1.379v.06a1.25 1.25 0 001.144.758h.128a1.515 1.515 0 110 3.03h-.068a1.25 1.25 0 00-1.144.758z'
        stroke={stroke ?? props.color ?? Colors.icon.primary}
        strokeWidth={props.strokeWidth ?? 1.39167}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </Svg>
  );
}

SettingsIcon.displayName = 'SettingsIcon';
export default React.memo(SettingsIcon);
