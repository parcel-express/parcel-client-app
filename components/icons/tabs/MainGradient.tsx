import * as React from 'react';
import { Defs, LinearGradient, Stop } from 'react-native-svg';

import { Colors } from '@/constants/Colors';

interface MainGradientProps {
  id?: string;
}

export const MainGradient = ({ id = 'mainGradient' }: MainGradientProps) => (
  <Defs>
    <LinearGradient id={id} x1='0' y1='0.4' x2='1' y2='0.6'>
      <Stop offset='21.82%' stopColor={Colors.gradient.primary.start} />
      <Stop offset='100%' stopColor={Colors.gradient.primary.end} />
    </LinearGradient>
  </Defs>
);
