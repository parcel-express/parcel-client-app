import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

import { Colors } from '@/constants/Colors';

import { IconProps } from './types';

function TrashIcon({ width, height, stroke, ...props }: IconProps) {
  return (
    <Svg
      width={width ?? 14}
      height={height ?? 16}
      viewBox='0 0 14 16'
      fill='none'
      accessibilityRole='image'
      {...props}
    >
      <Path
        d='M9.667 4v-.533c0-.747 0-1.12-.146-1.405a1.333 1.333 0 00-.582-.583c-.286-.146-.659-.146-1.406-.146H6.467c-.747 0-1.12 0-1.406.146-.25.128-.455.332-.582.583-.146.285-.146.658-.146 1.405V4m1.334 3.667V11m2.666-3.333V11M1 4h12m-1.333 0v7.467c0 1.12 0 1.68-.218 2.108a2 2 0 01-.874.874c-.428.218-.988.218-2.108.218H5.533c-1.12 0-1.68 0-2.108-.218a2 2 0 01-.874-.874c-.218-.428-.218-.988-.218-2.108V4'
        stroke={stroke ?? props.color ?? Colors.icon.secondary}
        strokeWidth={props.strokeWidth ?? 1.5}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </Svg>
  );
}

TrashIcon.displayName = 'TrashIcon';
export default React.memo(TrashIcon);
