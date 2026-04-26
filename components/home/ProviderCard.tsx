import { Ionicons } from '@expo/vector-icons';
import { Image, StyleSheet, Text, View } from 'react-native';

import { ScalePressable } from '@/components/profile/ScalePressable';
import { getServiceCategoryPalette, ServiceCategory } from '@/data/mockData';
import { profileShadow } from '@/theme/profileTheme';

type ProviderService = {
  id: string;
  title: string;
  category: ServiceCategory;
};

type ProviderCardModel = {
  id: string;
  name: string;
  profession: string;
  city: string;
  yearsExperience: number;
  avatarUrl: string;
  bio: string;
  services: ProviderService[];
  averageRating: number;
  reviewCount: number;
};

type ProviderCardProps = {
  provider: ProviderCardModel;
  onPress: () => void;
};

function renderStars(value: number) {
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
    <View style={styles.starsIconRow}>
      {names.map((name, index) => (
        <Ionicons key={`${name}-${index}`} name={name} size={14} color="#f2b400" />
      ))}
    </View>
  );
}

export function ProviderCard({ provider, onPress }: ProviderCardProps) {
  const topServices = provider.services.slice(0, 2);

  return (
    <ScalePressable style={styles.card} haptic="light" onPress={onPress}>
      <View style={styles.cardTopAccent} />
      <View style={styles.cardTopRow}>
        <Image source={{ uri: provider.avatarUrl }} style={styles.avatar} />
        <View style={styles.cardTopTextWrap}>
          <Text style={styles.providerName}>{provider.name}</Text>
          <Text style={styles.providerText}>{provider.profession}</Text>

          <View style={styles.providerMetaRow}>
            <View style={styles.inlineMetaPill}>
              <Text style={styles.inlineMetaPillText}>{provider.yearsExperience} anos</Text>
            </View>
            <View style={styles.inlineMetaPill}>
              <Text style={styles.inlineMetaPillText}>{provider.city}</Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.cardDivider} />

      <Text style={styles.description} numberOfLines={3}>
        {provider.bio}
      </Text>

      <View style={styles.badgesWrap}>
        {topServices.map((service) => {
          const palette = getServiceCategoryPalette(service.category);

          return (
            <View
              key={service.id}
              style={[
                styles.badge,
                {
                  backgroundColor: palette.background,
                  borderColor: palette.border,
                },
              ]}
            >
              <Text style={[styles.badgeText, { color: palette.text }]}>{service.title}</Text>
            </View>
          );
        })}
        {provider.services.length > 2 && (
          <View style={styles.badgeMuted}>
            <Text style={styles.badgeMutedText}>+{provider.services.length - 2} serviços</Text>
          </View>
        )}
      </View>

      <View style={styles.cardBottomRow}>
        <View style={styles.cardMetricBlock}>
          <Text style={styles.cardMetricLabel}>Avaliação</Text>
          <View style={styles.ratingWrapInline}>
            {renderStars(provider.averageRating)}
            <Text style={styles.ratingMetaText}>
              {provider.averageRating.toFixed(1)} ({provider.reviewCount})
            </Text>
          </View>
        </View>

        <View style={styles.cardMetricBlockRight}>
          <Text style={styles.cardMetricLabel}>Serviços</Text>
          <Text style={styles.priceText}>{provider.services.length}</Text>
        </View>
      </View>

      <View style={styles.ctaRow}>
        <Text style={styles.openProfileText}>Toque para ver perfil e detalhes dos serviços</Text>
      </View>
    </ScalePressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#e0e6ee',
    padding: 16,
    gap: 14,
    ...profileShadow,
  },
  cardTopAccent: {
    marginTop: -2,
    marginBottom: 2,
    width: 40,
    height: 4,
    borderRadius: 999,
    backgroundColor: '#c7daf0',
  },
  cardTopRow: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
  },
  cardTopTextWrap: {
    flex: 1,
    gap: 7,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 999,
    backgroundColor: '#d9e3f2',
  },
  providerName: {
    fontSize: 17,
    fontWeight: '800',
    color: '#102339',
  },
  providerText: {
    fontSize: 14,
    color: '#355674',
    fontWeight: '700',
  },
  providerMetaRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  inlineMetaPill: {
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#d9e3f0',
    backgroundColor: '#f4f8fd',
    paddingHorizontal: 9,
    paddingVertical: 4,
  },
  inlineMetaPillText: {
    color: '#4a6686',
    fontSize: 11,
    fontWeight: '700',
  },
  cardDivider: {
    marginTop: 4,
    marginBottom: 2,
    height: 1,
    backgroundColor: '#e7edf5',
  },
  description: {
    color: '#304862',
    lineHeight: 21,
    marginTop: 2,
  },
  badgesWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginTop: 4,
    marginBottom: 2,
  },
  badge: {
    backgroundColor: '#f3f7fc',
    borderColor: '#d7e0ec',
    borderWidth: 1,
    borderRadius: 999,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  badgeText: {
    fontWeight: '600',
    fontSize: 10,
  },
  badgeMuted: {
    backgroundColor: '#f6f8fb',
    borderColor: '#e1e7f0',
    borderWidth: 1,
    borderRadius: 999,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  badgeMutedText: {
    color: '#6b7f97',
    fontWeight: '600',
    fontSize: 10,
  },
  cardBottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    gap: 8,
    marginTop: 6,
  },
  cardMetricBlock: {
    gap: 4,
    flex: 1,
  },
  cardMetricBlockRight: {
    gap: 4,
    alignItems: 'flex-end',
  },
  cardMetricLabel: {
    color: '#6a7f97',
    fontWeight: '700',
    fontSize: 11,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  priceText: {
    fontWeight: '800',
    color: '#135893',
    fontSize: 18,
  },
  ratingWrapInline: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flexWrap: 'wrap',
  },
  starsIconRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  ratingMetaText: {
    color: '#4f617a',
    fontWeight: '700',
    fontSize: 12,
  },
  openProfileText: {
    color: '#31557f',
    fontWeight: '700',
    fontSize: 12,
  },
  ctaRow: {
    marginTop: 6,
    paddingTop: 12,
    borderTopWidth: 1,
    borderColor: '#e7edf5',
  },
});
