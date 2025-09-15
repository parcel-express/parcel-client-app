import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

import { IconProps } from './BarLineChartIcon';

function LogOutIcon({ width, height, fill }: IconProps) {
  return (
    <Svg width={width || 20} height={height || 20} viewBox='0 0 20 20' fill='none'>
      <Path
        d='M13.333 14.167L17.5 10m0 0l-4.167-4.167M17.5 10h-10m2.5 4.167c0 .246 0 .37-.01.476a2.5 2.5 0 01-2.002 2.238c-.105.02-.228.035-.473.062l-.85.094c-1.28.142-1.919.213-2.427.05a2.5 2.5 0 01-1.52-1.36C2.5 15.24 2.5 14.597 2.5 13.31V6.69c0-1.287 0-1.93.218-2.417a2.5 2.5 0 011.52-1.36c.508-.163 1.147-.092 2.426.05l.851.094c.245.027.368.041.473.062A2.5 2.5 0 019.99 5.357c.009.107.009.23.009.476'
        stroke={fill || '#717680'}
        strokeWidth={1.39167}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </Svg>
  );
}

export default LogOutIcon;
