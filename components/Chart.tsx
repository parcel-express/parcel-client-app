import { useFont } from '@shopify/react-native-skia';
import React from 'react';
import { StyleSheet } from 'react-native';
import { CartesianChart, StackedBar } from 'victory-native';

import { Colors } from '@/constants/Colors';

import CardView from './ui/CardView';
const minHeight = 260;
export default function StackedBarWithAxes({
  data,
  colors,
}: {
  data: { listenCount: number; like: number; dislike: number; month: string }[];
  colors: string[];
}) {
  const font = useFont(require('../assets/fonts/SpaceMono-Regular.ttf'), 12);
  const maxValue = Math.max(...data.map(data => data.listenCount + data.like + data.dislike)) + 20;
  return (
    <CardView style={[{ minHeight }, styles.container]}>
      <CartesianChart
        data={data}
        frame={{ lineWidth: 0 }}
        xKey='month'
        yKeys={['listenCount', 'like', 'dislike']}
        domainPadding={{ left: 22, right: 22, bottom: 0, top: 0 }}
        domain={{ y: [0, maxValue] }}
        axisOptions={{
          labelColor: Colors.text.tertiary,
          labelOffset: 4,
          font,
          formatXLabel: t => (t ? t : ''),
          lineColor: Colors.border.tertiary,
          lineWidth: {
            grid: { x: 0, y: 1 },
            frame: 0,
          },
        }}
      >
        {({ points, chartBounds }) => {
          return (
            <StackedBar
              animate={{ type: 'timing', duration: 500 }}
              points={[points.dislike, points.like, points.listenCount]}
              chartBounds={chartBounds}
              barWidth={16}
              colors={colors}
              barOptions={({ isTop }) => {
                return {
                  roundedCorners: {
                    topLeft: isTop ? 4 : 0,
                    topRight: isTop ? 4 : 0,
                    bottomLeft: 0,
                    bottomRight: 0,
                  },
                };
              }}
            />
          );
        }}
      </CartesianChart>
    </CardView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 16,
    paddingBottom: 24,
    paddingLeft: 24,
    paddingRight: 16,
  },
});
