import * as Haptics from 'expo-haptics';
import { PropsWithChildren, useRef } from 'react';
import {
    Animated,
    GestureResponderEvent,
    Pressable,
    PressableProps,
    StyleProp,
    ViewStyle,
} from 'react-native';

type ScalePressableProps = PropsWithChildren<
  PressableProps & {
    style?: StyleProp<ViewStyle>;
    scaleTo?: number;
    haptic?: 'light' | 'medium' | 'heavy' | 'selection';
  }
>;

export function ScalePressable({
  children,
  onPressIn,
  onPressOut,
  onPress,
  style,
  scaleTo = 0.98,
  haptic,
  ...props
}: ScalePressableProps) {
  const scale = useRef(new Animated.Value(1)).current;

  const triggerHaptic = () => {
    if (!haptic) {
      return;
    }

    if (haptic === 'selection') {
      Haptics.selectionAsync();
      return;
    }

    const style =
      haptic === 'heavy'
        ? Haptics.ImpactFeedbackStyle.Heavy
        : haptic === 'medium'
          ? Haptics.ImpactFeedbackStyle.Medium
          : Haptics.ImpactFeedbackStyle.Light;

    Haptics.impactAsync(style);
  };

  const handlePressIn = (event: GestureResponderEvent) => {
    Animated.spring(scale, {
      toValue: scaleTo,
      useNativeDriver: true,
      speed: 40,
      bounciness: 4,
    }).start();

    onPressIn?.(event);
  };

  const handlePressOut = (event: GestureResponderEvent) => {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
      speed: 40,
      bounciness: 4,
    }).start();

    onPressOut?.(event);
  };

  const handlePress = (event: GestureResponderEvent) => {
    triggerHaptic();
    onPress?.(event);
  };

  return (
    <Pressable {...props} onPress={handlePress} onPressIn={handlePressIn} onPressOut={handlePressOut} style={style}>
      <Animated.View style={{ transform: [{ scale }] }}>{children}</Animated.View>
    </Pressable>
  );
}
