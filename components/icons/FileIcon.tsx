import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

import { Colors } from '@/constants/Colors';

import type { IconProps } from './types';

function FileIcon({ width, height, fill, ...props }: IconProps) {
  return (
    <Svg
      width={width ?? 20}
      height={height ?? 21}
      viewBox='0 0 20 21'
      fill='none'
      accessibilityRole='image'
      {...props}
    >
      <Path
        d='M11.666 2.391v3.442c0 .467 0 .7.091.879.08.157.207.284.364.364.179.09.412.09.879.09h3.442m-4.776 7.5h-5m6.667-3.333H6.666m10-2.51v6.01c0 1.4 0 2.1-.272 2.635a2.5 2.5 0 01-1.093 1.093c-.534.272-1.235.272-2.635.272H7.333c-1.4 0-2.1 0-2.635-.272a2.5 2.5 0 01-1.093-1.093c-.272-.535-.272-1.235-.272-2.635V6.167c0-1.4 0-2.1.272-2.635a2.5 2.5 0 011.093-1.093c.535-.272 1.235-.272 2.635-.272h2.676c.612 0 .918 0 1.205.069a2.5 2.5 0 01.723.3c.252.154.469.37.9.802l2.658 2.657c.432.432.648.649.803.9.137.225.238.468.3.724.068.287.068.593.068 1.205z'
        stroke={fill || Colors.icon.primary}
        strokeWidth={1.39167}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </Svg>
  );
}

export default React.memo(FileIcon);
