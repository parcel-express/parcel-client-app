import * as React from 'react';
import Svg, { ClipPath, Defs, G, Path } from 'react-native-svg';

import { Colors } from '@/constants/Colors';

import type { IconProps } from './types';

function MessageChatCircleIcon({ width, height, fill, ...props }: IconProps) {
  const clipId = React.useId();
  return (
    <Svg
      width={width ?? 20}
      height={height ?? 20}
      viewBox='0 0 20 20'
      fill='none'
      accessibilityRole='image'
      {...props}
    >
      <G clipPath={`url(#${clipId})`}>
        <Path
          d='M5.079 9.357A6.676 6.676 0 015 8.333c0-3.682 3.005-6.666 6.71-6.666 3.707 0 6.711 2.984 6.711 6.666 0 .832-.153 1.628-.433 2.362a2.452 2.452 0 00-.1.289.752.752 0 00-.02.16c-.002.062.007.129.023.263l.336 2.725c.036.295.054.443.005.55a.417.417 0 01-.214.21c-.108.046-.256.024-.55-.019l-2.654-.389c-.139-.02-.208-.03-.271-.03a.748.748 0 00-.167.018c-.061.013-.14.042-.298.101a6.735 6.735 0 01-3.392.35m-4.326 3.41c2.47 0 4.474-2.052 4.474-4.583S8.83 9.167 6.36 9.167c-2.47 0-4.474 2.052-4.474 4.583 0 .509.081.998.23 1.456.064.193.095.29.106.356a.71.71 0 01.008.177c-.003.067-.02.142-.054.293l-.509 2.301 2.496-.34a2.04 2.04 0 01.263-.028c.063 0 .096.004.158.016.058.012.145.042.318.103a4.37 4.37 0 001.458.25z'
          stroke={fill || Colors.icon.primary}
          strokeWidth={1.39167}
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </G>
      <Defs>
        <ClipPath id={clipId}>
          <Path fill='#fff' d='M0 0H20V20H0z' />
        </ClipPath>
      </Defs>
    </Svg>
  );
}

export default React.memo(MessageChatCircleIcon);
