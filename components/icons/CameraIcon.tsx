import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

import { Colors } from '@/constants/Colors';

import { IconProps } from './types';

function CameraIcon({ width, height, stroke, ...props }: IconProps) {
  return (
    <Svg width={width || 23} height={height || 22} viewBox='0 0 23 22' fill='none' {...props}>
      <Path
        d='M1.717 6.934a2.702 2.702 0 012.702-2.702c.775 0 1.463-.496 1.708-1.231l.09-.269c.042-.126.063-.19.086-.246a2 2 0 011.734-1.25c.06-.004.128-.004.26-.004h6.839c.133 0 .2 0 .26.004a2 2 0 011.735 1.25c.023.057.044.12.086.246l.09.269a1.801 1.801 0 001.708 1.231 2.702 2.702 0 012.702 2.702v8.498c0 1.68 0 2.52-.327 3.162a3 3 0 01-1.311 1.311c-.642.327-1.482.327-3.162.327h-10.4c-1.68 0-2.52 0-3.162-.327a3 3 0 01-1.311-1.31c-.327-.642-.327-1.482-.327-3.163V6.934z'
        stroke={stroke || props.color || Colors.icon.black}
        strokeWidth={props.strokeWidth || 2}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <Path
        d='M11.717 15.732a4.5 4.5 0 100-9 4.5 4.5 0 000 9z'
        stroke={stroke || props.color || Colors.icon.black}
        strokeWidth={props.strokeWidth || 2}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </Svg>
  );
}

CameraIcon.displayName = 'CameraIcon';
export default CameraIcon;
