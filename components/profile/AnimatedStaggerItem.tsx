import { PropsWithChildren, useEffect, useRef } from 'react';
import { Animated, Easing, StyleProp, ViewStyle } from 'react-native';

type AnimatedStaggerItemProps = PropsWithChildren<{
  index?: number;
  style?: StyleProp<ViewStyle>;
}>;

export function AnimatedStaggerItem({ children, index = 0, style }: AnimatedStaggerItemProps) {
  const animated = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    animated.setValue(0);

    Animated.timing(animated, {
      toValue: 1,
      delay: Math.min(index, 12) * 95,
      duration: 520,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start();
  }, [animated, index]);

  return (
    <Animated.View
      style={[
        style,
        {
          opacity: animated,
          transform: [
            {
              translateY: animated.interpolate({
                inputRange: [0, 1],
                outputRange: [10, 0],
              }),
            },
          ],
        },
      ]}
    >
      {children}
    </Animated.View>
  );
}
