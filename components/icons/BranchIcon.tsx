import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

import { Colors } from '@/constants/Colors';

import { IconProps } from './types';

function BranchIcon({ width, height, ...props }: IconProps) {
  return (
    <Svg width={width || 19} height={height || 17} viewBox='0 0 19 17' fill='none' {...props}>
      <Path
        d='M5.417 7.5H3c-.467 0-.7 0-.878.091a.833.833 0 00-.364.364c-.091.178-.091.412-.091.879v7M12.917 7.5h2.416c.467 0 .7 0 .879.091.157.08.284.207.364.364.09.178.09.412.09.879v7m-3.75 0V3.5c0-.933 0-1.4-.181-1.756a1.667 1.667 0 00-.728-.729C11.65.833 11.183.833 10.25.833H8.083c-.933 0-1.4 0-1.756.182-.314.16-.569.415-.729.729-.181.356-.181.823-.181 1.756v12.334m12.083 0H.833m7.5-11.667H10M8.333 7.5H10m-1.667 3.334H10'
        stroke={props.color || Colors.icon.primary}
        strokeWidth={props.strokeWidth || 1.66667}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </Svg>
  );
}

BranchIcon.displayName = 'BranchIcon';
export default BranchIcon;
