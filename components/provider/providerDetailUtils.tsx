import { Ionicons } from '@expo/vector-icons';
import { View } from 'react-native';

import { providerDetailStyles } from './providerDetailStyles';

export function renderProviderStars(value: number) {
  const safeValue = Math.max(0, Math.min(5, value));
  const rounded = Math.round(safeValue * 2) / 2;
  const fullStars = Math.floor(rounded);
  const hasHalfStar = rounded - fullStars === 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  const names: ('star' | 'star-half' | 'star-outline')[] = [
    ...Array.from({ length: fullStars }, () => 'star' as const),
    ...(hasHalfStar ? ['star-half' as const] : []),
    ...Array.from({ length: emptyStars }, () => 'star-outline' as const),
  ];

  return (
    <View style={providerDetailStyles.starsIconRow}>
      {names.map((name, index) => (
        <Ionicons key={`${name}-${index}`} name={name} size={16} color="#f2b400" />
      ))}
    </View>
  );
}

export function formatProviderReviewDate(isoDate: string) {
  return new Date(isoDate).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
}
