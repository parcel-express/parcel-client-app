import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

import { MainGradient } from './MainGradient';

function OrdersIcon({ focused }: { focused?: boolean }) {
  return (
    <Svg width={20} height={22} viewBox='0 0 20 22' fill='none'>
      {focused && <MainGradient />}
      <Path
        d='M18.5 6.278L10 11m0 0L1.5 6.278M10 11v9.5m9-5.441V6.942c0-.343 0-.514-.05-.667a1 1 0 00-.215-.364c-.109-.119-.258-.202-.558-.368l-7.4-4.111c-.284-.158-.425-.237-.575-.267a1 1 0 00-.403 0c-.15.03-.292.11-.576.267l-7.4 4.11c-.3.167-.45.25-.558.369a1 1 0 00-.215.364C1 6.428 1 6.599 1 6.942v8.117c0 .342 0 .514.05.666a1 1 0 00.215.364c.109.119.258.202.558.368l7.4 4.111c.284.158.425.237.576.268.132.027.27.027.402 0 .15-.031.292-.11.576-.268l7.4-4.11c.3-.167.45-.25.558-.369a.999.999 0 00.215-.364c.05-.152.05-.324.05-.666z'
        stroke={focused ? 'url(#mainGradient)' : '#9CA3AF'}
        strokeWidth={2}
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeOpacity={focused ? 1 : 0.8}
      />
    </Svg>
  );
}

OrdersIcon.displayName = 'OrdersIcon';
export default OrdersIcon;
