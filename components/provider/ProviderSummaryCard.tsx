import { Image, Text, View } from 'react-native';

import { AnimatedStaggerItem } from '@/components/profile/AnimatedStaggerItem';
import { ProviderWithMetrics } from '@/context/marketplace/types';
import { getServiceCategoryPalette } from '@/data/mockData';

import { providerDetailStyles } from './providerDetailStyles';
import { renderProviderStars } from './providerDetailUtils';

type ProviderSummaryCardProps = {
  provider: ProviderWithMetrics;
};

export function ProviderSummaryCard({ provider }: ProviderSummaryCardProps) {
  return (
    <AnimatedStaggerItem index={0} style={providerDetailStyles.headerCard}>
      <View style={providerDetailStyles.headerTopRow}>
        <Image source={{ uri: provider.avatarUrl }} style={providerDetailStyles.avatar} />
        <View style={providerDetailStyles.headerTextWrap}>
          <Text style={providerDetailStyles.providerName}>{provider.name}</Text>
          <Text style={providerDetailStyles.professionLine} numberOfLines={1}>{provider.profession}</Text>
          <Text style={providerDetailStyles.cityLine} numberOfLines={1}>{provider.city}</Text>
        </View>
      </View>

      <Text style={providerDetailStyles.bioText} numberOfLines={3}>{provider.bio}</Text>

      <View style={providerDetailStyles.metricsRow}>
        <View style={providerDetailStyles.metricBox}>
          <Text style={providerDetailStyles.metricValue}>{provider.yearsExperience}</Text>
          <Text style={providerDetailStyles.metricLabel}>experiência</Text>
        </View>

        <View style={providerDetailStyles.metricBox}>
          <Text style={providerDetailStyles.metricValue}>{provider.services.length}</Text>
          <Text style={providerDetailStyles.metricLabel}>serviços</Text>
        </View>

        <View style={providerDetailStyles.metricBox}>
          <Text style={providerDetailStyles.metricValue}>{provider.averageRating.toFixed(1)}</Text>
          <Text style={providerDetailStyles.metricLabel}>avaliação</Text>
        </View>
      </View>

      <View style={providerDetailStyles.ratingLineWrap}>
        {renderProviderStars(provider.averageRating)}
        <Text style={providerDetailStyles.ratingMetaText}>({provider.reviewCount} avaliações)</Text>
      </View>

      <View style={providerDetailStyles.badgesWrap}>
        {provider.categories.map((category) => {
          const palette = getServiceCategoryPalette(category);

          return (
            <View
              key={category}
              style={[
                providerDetailStyles.badge,
                {
                  backgroundColor: palette.background,
                  borderColor: palette.border,
                },
              ]}
            >
              <Text style={[providerDetailStyles.badgeText, { color: palette.text }]}>{category}</Text>
            </View>
          );
        })}
      </View>
    </AnimatedStaggerItem>
  );
}
