import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

import { IconProps } from './types';

function AddIcon({ width, height, ...props }: IconProps) {
  return (
    <Svg width={width || 20} height={height || 20} viewBox='0 0 20 20' fill='none' {...props}>
      <Path
        d='M10 4.167v11.666M4.167 10h11.666'
        stroke='#717680'
        strokeWidth={1.66667}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </Svg>
  );
}

AddIcon.displayName = 'AddIcon';
export default AddIcon;
