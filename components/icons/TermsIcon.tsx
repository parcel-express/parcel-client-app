import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

import { Colors } from '@/constants/Colors';

import type { IconProps } from './types';

function TermsIcon({ width, height, stroke, ...props }: IconProps) {
  return (
    <Svg
      width={width ?? 18}
      height={height ?? 17}
      viewBox='0 0 18 17'
      fill='none'
      accessibilityRole='image'
      {...props}
    >
      <Path
        d='M13.833 6.833c.934 0 1.4 0 1.757-.181.314-.16.569-.415.728-.729.182-.356.182-.823.182-1.756v-.5c0-.934 0-1.4-.182-1.757a1.666 1.666 0 00-.728-.728C15.233 1 14.767 1 13.833 1H4.167c-.934 0-1.4 0-1.757.182-.314.16-.569.414-.728.728-.182.357-.182.823-.182 1.757v.5c0 .933 0 1.4.182 1.756.16.314.414.569.728.729.357.181.823.181 1.757.181h9.666zM13.833 16c.934 0 1.4 0 1.757-.182.314-.16.569-.414.728-.728.182-.357.182-.823.182-1.757v-.5c0-.933 0-1.4-.182-1.756a1.666 1.666 0 00-.728-.729c-.357-.181-.823-.181-1.757-.181H4.167c-.934 0-1.4 0-1.757.181-.314.16-.569.415-.728.729-.182.356-.182.823-.182 1.756v.5c0 .934 0 1.4.182 1.757.16.314.414.569.728.728.357.182.823.182 1.757.182h9.666z'
        stroke={stroke ?? Colors.icon.primary}
        strokeWidth={1.39167}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </Svg>
  );
}

export default React.memo(TermsIcon);
