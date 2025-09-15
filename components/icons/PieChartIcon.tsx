import * as React from 'react';
import Svg, { ClipPath, Defs, G, Path } from 'react-native-svg';

import { IconProps } from './BarLineChartIcon';

function PieChartIcon({ width, height, fill }: IconProps) {
  return (
    <Svg width={width || 20} height={height || 20} viewBox='0 0 20 20' fill='none'>
      <G clipPath='url(#clip0_346_40455)'>
        <Path
          d='M10 1.667A8.334 8.334 0 0118.334 10M10 1.667V10m0-8.333A8.333 8.333 0 1018.334 10M10 1.667A8.333 8.333 0 0118.334 10m0 0H10m8.334 0a8.333 8.333 0 01-3.435 6.742L10 10'
          stroke={fill || '#717680'}
          strokeWidth={1.39167}
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </G>
      <Defs>
        <ClipPath id='clip0_346_40455'>
          <Path fill='#fff' d='M0 0H20V20H0z' />
        </ClipPath>
      </Defs>
    </Svg>
  );
}

export default PieChartIcon;
