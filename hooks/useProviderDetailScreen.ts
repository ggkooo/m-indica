import { useMemo, useRef } from 'react';
import { ScrollView } from 'react-native';

import { useMarketplace } from '@/context/MarketplaceContext';
import { useScrollToTopOnFocus } from '@/hooks/useScrollToTopOnFocus';

export function useProviderDetailScreen(providerId: string) {
  const { getProviderById, getServicesByProviderId, reviews } = useMarketplace();
  const scrollRef = useRef<ScrollView>(null);

  useScrollToTopOnFocus(scrollRef);

  const provider = useMemo(() => getProviderById(providerId), [providerId, getProviderById]);
  const services = useMemo(
    () => getServicesByProviderId(providerId),
    [providerId, getServicesByProviderId]
  );

  const providerReviews = useMemo(() => {
    const serviceTitleById = new Map(services.map((service) => [service.id, service.title]));

    return reviews
      .filter((review) => serviceTitleById.has(review.serviceId))
      .map((review) => ({
        ...review,
        serviceTitle: serviceTitleById.get(review.serviceId) ?? 'Serviço',
      }))
      .sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt));
  }, [reviews, services]);

  return {
    scrollRef,
    provider,
    services,
    providerReviews,
  };
}
