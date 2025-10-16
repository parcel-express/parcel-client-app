import * as React from 'react';
import { Defs, LinearGradient, Stop } from 'react-native-svg';

import { Colors } from '@/constants/Colors';

interface MainGradientProps {
  id?: string;
}

export const MainGradient = ({ id = 'mainGradient' }: MainGradientProps) => (
  <Defs>
    <LinearGradient id={id} x1='0' y1='0' x2='1' y2='1'>
      <Stop offset='0%' stopColor={Colors.gradient.primary.start} />
      <Stop offset='100%' stopColor={Colors.gradient.primary.end} />
    </LinearGradient>
  </Defs>
);
