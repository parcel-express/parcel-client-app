import * as React from 'react';
import Svg, { Circle, Defs, LinearGradient, Path, Stop } from 'react-native-svg';

function PinIcon({ ...props }) {
  return (
    <Svg width={69} height={69} viewBox='0 0 69 69' fill='none' {...props}>
      <Path
        d='M34.5 37.375a8.625 8.625 0 100-17.25 8.625 8.625 0 000 17.25z'
        fill='url(#paint0_linear_348_46432)'
      />
      <Path
        d='M34.5 63.25c11.5-11.5 23-21.797 23-34.5s-10.297-23-23-23-23 10.297-23 23 11.5 23 23 34.5z'
        fill='url(#paint1_linear_348_46432)'
      />
      <Circle cx={34.5} cy={26.1531} r={9.15306} fill='#fff' />
      <Defs>
        <LinearGradient
          id='paint0_linear_348_46432'
          x1={21.2963}
          y1={23.1198}
          x2={64.5406}
          y2={25.266}
          gradientUnits='userSpaceOnUse'
        >
          <Stop stopColor='#662D91' />
          <Stop offset={1} stopColor='#302E9C' />
        </LinearGradient>
        <LinearGradient
          id='paint1_linear_348_46432'
          x1={21.2963}
          y1={23.1198}
          x2={64.5406}
          y2={25.266}
          gradientUnits='userSpaceOnUse'
        >
          <Stop stopColor='#662D91' />
          <Stop offset={1} stopColor='#302E9C' />
        </LinearGradient>
      </Defs>
    </Svg>
  );
}
PinIcon.displayName = 'PinIcon';
export default PinIcon;
