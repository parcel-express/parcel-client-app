import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

import { MainGradient } from './MainGradient';

function HomeIcon({ focused }: { focused?: boolean }) {
  return (
    <Svg width={20} height={21} viewBox='0 0 20 21' fill='none'>
      {focused && <MainGradient />}

      <Path
        d='M6.126 13a4.002 4.002 0 007.748 0M9.018 1.764L2.235 7.04c-.453.353-.68.53-.843.75a2 2 0 00-.318.65C1 8.704 1 8.991 1 9.565V16.8c0 1.12 0 1.68.218 2.108a2 2 0 00.874.874C2.52 20 3.08 20 4.2 20h11.6c1.12 0 1.68 0 2.108-.218a2 2 0 00.874-.874C19 18.48 19 17.92 19 16.8V9.565c0-.574 0-.861-.074-1.126a2.002 2.002 0 00-.318-.65c-.163-.22-.39-.397-.843-.75l-6.783-5.275c-.351-.273-.527-.41-.72-.462a1 1 0 00-.523 0c-.194.052-.37.189-.721.462z'
        stroke={focused ? 'url(#mainGradient)' : '#9CA3AF'}
        strokeWidth={2}
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeOpacity={focused ? 1 : 0.8}
      />
    </Svg>
  );
}

export default HomeIcon;
