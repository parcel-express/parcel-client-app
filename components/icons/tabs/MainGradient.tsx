import * as React from 'react';
import { Defs, LinearGradient, Stop } from 'react-native-svg';

interface MainGradientProps {
  id?: string;
}

export const MainGradient = ({ id = 'mainGradient' }: MainGradientProps) => (
  <Defs>
    <LinearGradient id={id} x1='0' y1='0' x2='1' y2='1'>
      <Stop offset='0%' stopColor='#662D91' />
      <Stop offset='100%' stopColor='#302E9C' />
    </LinearGradient>
  </Defs>
);
