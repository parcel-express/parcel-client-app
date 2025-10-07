import { LinearGradient } from 'expo-linear-gradient';
import React, { useRef } from 'react';
import { Animated, Easing, Pressable, StyleSheet, View } from 'react-native';

import { Colors } from '@/constants/Colors';
import { Shadows } from '@/constants/Shadows';

type Props = {
  value: boolean;
  onValueChange: (val: boolean) => void;
  disabled?: boolean;
};

const SWITCH_WIDTH = 36;
const SWITCH_HEIGHT = 20;
const THUMB_SIZE = 16;
const PADDING = 2;

const INACTIVE_COLOR = Colors.background.imagePlaceholder;
const THUMB_COLOR = Colors.background.white;

const CustomSwitch: React.FC<Props> = ({ value, onValueChange, disabled }) => {
  const [internalValue, setInternalValue] = React.useState(value);
  const [internalDisabled, setInternalDisabled] = React.useState(!!disabled);
  const anim = useRef(new Animated.Value(value ? 1 : 0)).current;

  React.useEffect(() => {
    Animated.timing(anim, {
      toValue: value ? 1 : 0,
      duration: 500,
      useNativeDriver: false,
      easing: Easing.out(Easing.exp),
    }).start();
  }, [value, anim]);

  React.useEffect(() => {
    setInternalValue(value);
  }, [value]);

  React.useEffect(() => {
    setInternalDisabled(!!disabled);
  }, [disabled]);

  // Thumb translation
  const translateX = anim.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [
      PADDING,
      (SWITCH_WIDTH - THUMB_SIZE - PADDING) / 2,
      SWITCH_WIDTH - THUMB_SIZE - PADDING,
    ],
  });

  const handlePress = () => {
    if (disabled) return;
    const next = !value;
    setInternalValue(next);
    setInternalDisabled(true);

    Animated.timing(anim, {
      toValue: next ? 1 : 0,
      duration: 500,
      useNativeDriver: false,
      easing: Easing.out(Easing.exp),
    }).start(() => {
      onValueChange(next);
      setInternalDisabled(false);
    });
  };

  // Thumb stretching (scaleX)
  const scaleX = anim.interpolate({
    inputRange: [0, 0.3, 0.7, 1],
    outputRange: [1, 1.35, 1.35, 1],
  });

  return (
    <Pressable
      onPress={handlePress}
      disabled={disabled || internalDisabled}
      style={({ pressed }) => [
        styles.container,
        disabled && { opacity: 0.5 },
        pressed && { opacity: 0.8 },
      ]}
      accessibilityRole='switch'
      accessibilityState={{ checked: value, disabled: disabled || internalDisabled }}
    >
      {internalValue ? (
        <LinearGradient
          colors={[Colors.gradient.primary.start, Colors.gradient.primary.end]}
          style={styles.track}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
        />
      ) : (
        <View style={[styles.track, { backgroundColor: INACTIVE_COLOR }]} />
      )}
      <Animated.View
        style={[
          styles.thumb,
          {
            transform: [{ translateX }, { scaleX }],
          },
        ]}
      />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: SWITCH_WIDTH,
    height: SWITCH_HEIGHT,
    justifyContent: 'center',
  },
  track: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: SWITCH_HEIGHT / 2,
  },
  thumb: {
    width: THUMB_SIZE,
    height: THUMB_SIZE,
    borderRadius: THUMB_SIZE / 2,
    backgroundColor: THUMB_COLOR,
    position: 'absolute',
    top: 2,
    left: 0,
    ...Shadows.shadow_xs,
  },
});

export default CustomSwitch;
