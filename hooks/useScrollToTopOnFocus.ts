import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';

type ScrollableRef = {
  scrollTo?: (options: { x?: number; y?: number; animated?: boolean }) => void;
};

export function useScrollToTopOnFocus(ref: { current: ScrollableRef | null }) {
  useFocusEffect(
    useCallback(() => {
      const frame = requestAnimationFrame(() => {
        ref.current?.scrollTo?.({ x: 0, y: 0, animated: false });
      });

      return () => cancelAnimationFrame(frame);
    }, [ref])
  );
}
