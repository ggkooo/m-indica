import { useLocalSearchParams, useRouter } from 'expo-router';
import { ScrollView, Text, View } from 'react-native';

import { AnimatedStaggerItem } from '@/components/profile/AnimatedStaggerItem';
import { ProviderReviewsSection } from '@/components/provider/ProviderReviewsSection';
import { ProviderServicesSection } from '@/components/provider/ProviderServicesSection';
import { ProviderSummaryCard } from '@/components/provider/ProviderSummaryCard';
import { providerDetailStyles } from '@/components/provider/providerDetailStyles';
import { useProviderDetailScreen } from '@/hooks/useProviderDetailScreen';

export default function ProviderDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { scrollRef, provider, services, providerReviews } = useProviderDetailScreen(id);

  if (!provider) {
    return (
      <View style={providerDetailStyles.notFoundWrap}>
        <Text style={providerDetailStyles.notFoundTitle}>Prestador não encontrado</Text>
        <Text style={providerDetailStyles.notFoundText}>Volte para a tela inicial e selecione outro prestador.</Text>
      </View>
    );
  }

  return (
    <ScrollView ref={scrollRef} style={providerDetailStyles.screen} contentContainerStyle={providerDetailStyles.content}>
      <AnimatedStaggerItem index={0} style={providerDetailStyles.heroRow}>
        <Text style={providerDetailStyles.heroEyebrow}>Prestador</Text>
        <Text style={providerDetailStyles.heroTitle}>Perfil do prestador</Text>
        <Text style={providerDetailStyles.heroSubtitle}>
          Veja reputação, experiência e serviços antes de iniciar sua contratação.
        </Text>
      </AnimatedStaggerItem>

      <ProviderSummaryCard provider={provider} />
      <ProviderServicesSection
        services={services}
        onOpenService={(serviceId) =>
          router.push({ pathname: '/service/[id]', params: { id: serviceId } } as never)
        }
      />
      <ProviderReviewsSection reviews={providerReviews} />
    </ScrollView>
  );
}
