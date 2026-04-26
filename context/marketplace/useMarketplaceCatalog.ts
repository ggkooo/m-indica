import { useCallback, useMemo, useState } from 'react';

import { roundToSingleDecimal } from '@/context/marketplace/constants';
import {
    CreateReviewInput,
    ProviderWithMetrics,
    ServiceWithProvider,
} from '@/context/marketplace/types';
import { initialReviews, providers } from '@/data/mockData';

export function useMarketplaceCatalog() {
  const [reviews, setReviews] = useState(initialReviews);

  const services = useMemo<ServiceWithProvider[]>(() => {
    return providers.flatMap((provider) =>
      provider.services.map((service) => ({
        ...service,
        providerId: provider.id,
        providerName: provider.name,
        providerProfession: provider.profession,
        providerCity: provider.city,
        providerAvatarUrl: provider.avatarUrl,
        providerBio: provider.bio,
        providerExperience: provider.yearsExperience,
      }))
    );
  }, []);

  const categories = useMemo(() => {
    return Array.from(new Set(services.map((service) => service.category)));
  }, [services]);

  const providersList = useMemo<ProviderWithMetrics[]>(() => {
    return providers.map((provider) => {
      const serviceIds = provider.services.map((service) => service.id);
      const providerReviews = reviews.filter((review) => serviceIds.includes(review.serviceId));
      const totalRating = providerReviews.reduce((sum, review) => sum + review.rating, 0);

      return {
        ...provider,
        categories: Array.from(new Set(provider.services.map((service) => service.category))),
        averageRating: providerReviews.length
          ? roundToSingleDecimal(totalRating / providerReviews.length)
          : 0,
        reviewCount: providerReviews.length,
      };
    });
  }, [reviews]);

  const getProviderById = useCallback(
    (providerId: string) => {
      return providersList.find((provider) => provider.id === providerId);
    },
    [providersList]
  );

  const getServicesByProviderId = useCallback(
    (providerId: string) => {
      return services.filter((service) => service.providerId === providerId);
    },
    [services]
  );

  const getServiceById = useCallback(
    (serviceId: string) => {
      return services.find((service) => service.id === serviceId);
    },
    [services]
  );

  const getReviewsByServiceId = useCallback(
    (serviceId: string) => {
      return reviews
        .filter((review) => review.serviceId === serviceId)
        .sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt));
    },
    [reviews]
  );

  const getAverageRatingByServiceId = useCallback(
    (serviceId: string) => {
      const serviceReviews = reviews.filter((review) => review.serviceId === serviceId);
      if (!serviceReviews.length) {
        return 0;
      }

      const total = serviceReviews.reduce((sum, review) => sum + review.rating, 0);
      return roundToSingleDecimal(total / serviceReviews.length);
    },
    [reviews]
  );

  const addReview = useCallback((input: CreateReviewInput) => {
    const nextReview = {
      id: `r-${Date.now()}`,
      serviceId: input.serviceId,
      contractorName: input.contractorName,
      rating: Math.max(0, Math.min(5, input.rating)),
      comment: input.comment,
      photoUrls: input.photoUrls,
      createdAt: new Date().toISOString(),
    };

    setReviews((prev) => [nextReview, ...prev]);
  }, []);

  return {
    services,
    categories,
    providersList,
    reviews,
    getProviderById,
    getServicesByProviderId,
    getServiceById,
    getReviewsByServiceId,
    getAverageRatingByServiceId,
    addReview,
  };
}
