import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

import { MainGradient } from './MainGradient';

function ProfileIcon({ focused }: { focused?: boolean }) {
  return (
    <Svg width={22} height={22} viewBox='0 0 22 22' fill='none'>
      {focused && <MainGradient />}
      <Path
        d='M4.316 18.438A4.001 4.001 0 018 16h6a4.001 4.001 0 013.684 2.438M15 8.5a4 4 0 11-8 0 4 4 0 018 0zm6 2.5c0 5.523-4.477 10-10 10S1 16.523 1 11 5.477 1 11 1s10 4.477 10 10z'
        stroke={focused ? 'url(#mainGradient)' : '#535862'}
        strokeWidth={2}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </Svg>
  );
}

export default ProfileIcon;
