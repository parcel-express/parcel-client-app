import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

import { Colors } from '@/constants/Colors';

import { IconProps } from './types';

function UploadIcon({ width, height, stroke, ...props }: IconProps) {
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
        d='M19 13v1.2c0 1.68 0 2.52-.327 3.162a3 3 0 01-1.311 1.311C16.72 19 15.88 19 14.2 19H5.8c-1.68 0-2.52 0-3.162-.327a3 3 0 01-1.311-1.311C1 16.72 1 15.88 1 14.2V13m14-7l-5-5m0 0L5 6m5-5v12'
        stroke={stroke ?? props.color ?? Colors.icon.black}
        strokeWidth={props.strokeWidth ?? 2}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </Svg>
  );
}

export default React.memo(UploadIcon);
