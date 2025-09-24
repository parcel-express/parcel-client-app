import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

import { Colors } from '@/constants/Colors';

import { IconProps } from './types';

function QuestionCircleIcon({ width, height, stroke, ...props }: IconProps) {
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
        d='M6.817 6.75a2.25 2.25 0 014.373.75c0 1.5-2.25 2.25-2.25 2.25m.06 3h.008M16.5 9a7.5 7.5 0 11-15 0 7.5 7.5 0 0115 0z'
        stroke={stroke || props.color || Colors.icon.black}
        strokeWidth={props.strokeWidth || 1.5}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </Svg>
  );
}

QuestionCircleIcon.displayName = 'QuestionCircleIcon';
export default React.memo(QuestionCircleIcon);
