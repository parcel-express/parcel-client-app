import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

import { Colors } from '@/constants/Colors';

import { IconProps } from './types';

function PackageIcon({ width, height, stroke, ...props }: IconProps) {
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
        d='M15.375 5.458L9 9m0 0L2.625 5.458M9 9v7.125m6.75-4.081V5.956c0-.257 0-.385-.038-.5a.75.75 0 00-.16-.273c-.082-.089-.195-.151-.42-.276l-5.55-3.083c-.212-.118-.318-.177-.43-.2a.75.75 0 00-.303 0c-.113.023-.22.082-.432.2l-5.55 3.083c-.224.125-.337.187-.419.276a.75.75 0 00-.16.273c-.038.115-.038.243-.038.5v6.088c0 .257 0 .385.038.5a.75.75 0 00.16.273c.082.089.195.151.42.276l5.55 3.083c.212.118.318.178.43.2.1.021.203.021.303 0 .113-.023.22-.082.432-.2l5.55-3.083c.224-.125.337-.187.419-.276a.75.75 0 00.16-.273c.038-.115.038-.243.038-.5z'
        stroke={stroke || props.color || Colors.icon.black}
        strokeWidth={1.5}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <Path
        d='M12.375 7.125l-6.75-3.75'
        stroke={stroke || props.color || Colors.icon.black}
        strokeWidth={2}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </Svg>
  );
}

PackageIcon.displayName = 'PackageIcon';
export default React.memo(PackageIcon);
