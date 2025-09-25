import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

import { Colors } from '@/constants/Colors';

import { IconProps } from './types';

function PrinterIcon({ width, height, stroke, ...props }: IconProps) {
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
        d='M13.5 5.25V3.9c0-.84 0-1.26-.164-1.581a1.5 1.5 0 00-.655-.656c-.32-.163-.74-.163-1.581-.163H6.9c-.84 0-1.26 0-1.581.163a1.5 1.5 0 00-.656.656c-.163.32-.163.74-.163 1.581v1.35m0 8.25c-.697 0-1.046 0-1.332-.077a2.25 2.25 0 01-1.591-1.59C1.5 11.545 1.5 11.196 1.5 10.5V8.85c0-1.26 0-1.89.245-2.371a2.25 2.25 0 01.984-.984c.48-.245 1.11-.245 2.371-.245h7.8c1.26 0 1.89 0 2.371.245.424.216.768.56.984.984.245.48.245 1.11.245 2.371v1.65c0 .697 0 1.046-.077 1.332a2.25 2.25 0 01-1.59 1.591c-.287.077-.636.077-1.333.077m-2.25-5.625h2.25M6.9 16.5h4.2c.84 0 1.26 0 1.581-.163a1.5 1.5 0 00.655-.656c.164-.32.164-.74.164-1.581v-1.2c0-.84 0-1.26-.164-1.581a1.5 1.5 0 00-.655-.655c-.32-.164-.74-.164-1.581-.164H6.9c-.84 0-1.26 0-1.581.164a1.5 1.5 0 00-.656.655c-.163.32-.163.74-.163 1.581v1.2c0 .84 0 1.26.163 1.581a1.5 1.5 0 00.656.656c.32.163.74.163 1.581.163z'
        stroke={stroke || props.color || Colors.icon.black}
        strokeWidth={props.strokeWidth || 1.5}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </Svg>
  );
}

PrinterIcon.displayName = 'PrinterIcon';
export default React.memo(PrinterIcon);
