import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

import { MainGradient } from './MainGradient';

function NewOrderIcon({ focused }: { focused?: boolean }) {
  return (
    <Svg width={22} height={22} viewBox='0 0 22 22' fill='none'>
      {focused && <MainGradient />}
      <Path
        d='M11 7v8m-4-4h8m6 0c0 5.523-4.477 10-10 10S1 16.523 1 11 5.477 1 11 1s10 4.477 10 10z'
        stroke={focused ? 'url(#mainGradient)' : '#535862'}
        strokeWidth={2}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </Svg>
  );
}

export default NewOrderIcon;
