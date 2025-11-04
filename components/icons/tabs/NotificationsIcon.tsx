import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

import { MainGradient } from './MainGradient';

function NotificationsIcon({ focused }: { focused?: boolean }) {
  return (
    <Svg width={23} height={22} viewBox='0 0 23 22' fill='none'>
      {focused && <MainGradient />}
      <Path
        d='M5.094 10.229A8.01 8.01 0 015 9c0-4.418 3.605-8 8.053-8 4.447 0 8.052 3.582 8.052 8 0 .998-.184 1.954-.52 2.835-.07.182-.105.274-.12.345a.897.897 0 00-.024.194c-.002.073.008.153.028.314l.403 3.27c.043.354.065.531.006.66a.5.5 0 01-.257.252c-.13.055-.306.03-.66-.022l-3.184-.467c-.167-.024-.25-.037-.326-.036a.898.898 0 00-.2.021c-.074.016-.169.051-.358.122a8.174 8.174 0 01-4.07.42M6.632 21C9.596 21 12 18.538 12 15.5S9.596 10 6.632 10c-2.965 0-5.369 2.462-5.369 5.5 0 .61.097 1.198.277 1.747.075.232.113.348.126.427.013.083.015.13.01.213-.005.08-.025.17-.065.351L1 21l2.995-.409c.163-.022.245-.034.316-.033.076 0 .115.005.19.02.07.013.173.05.381.123a5.246 5.246 0 001.75.299z'
        stroke={focused ? 'url(#mainGradient)' : '#9CA3AF'}
        strokeWidth={2}
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeOpacity={focused ? 1 : 0.8}
      />
    </Svg>
  );
}

export default NotificationsIcon;
