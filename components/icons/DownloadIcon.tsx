import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

import { Colors } from '@/constants/Colors';

import { IconProps } from './types';

function DownloadIcon({ width, height, stroke, ...props }: IconProps) {
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
        d='M16.5 16.5h-15M14 8.167l-5 5m0 0l-5-5m5 5V1.5'
        stroke={stroke || props.color || Colors.icon.tertiary}
        strokeWidth={props.strokeWidth || 1.66667}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </Svg>
  );
}

DownloadIcon.displayName = 'DownloadIcon';
export default React.memo(DownloadIcon);
