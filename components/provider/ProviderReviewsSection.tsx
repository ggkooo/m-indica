import { useEffect, useMemo, useState } from 'react';
import { Image, ScrollView, Text, View } from 'react-native';

import { AnimatedStaggerItem } from '@/components/profile/AnimatedStaggerItem';
import { ScalePressable } from '@/components/profile/ScalePressable';

import { providerDetailStyles } from './providerDetailStyles';
import { formatProviderReviewDate, renderProviderStars } from './providerDetailUtils';

type ProviderReviewItem = {
  id: string;
  contractorName: string;
  rating: number;
  comment: string;
  photoUrls: string[];
  createdAt: string;
  serviceTitle: string;
};

type ProviderReviewsSectionProps = {
  reviews: ProviderReviewItem[];
};

export function ProviderReviewsSection({ reviews }: ProviderReviewsSectionProps) {
  const reviewsStep = 4;
  const [visibleCount, setVisibleCount] = useState(reviewsStep);

  useEffect(() => {
    setVisibleCount(reviewsStep);
  }, [reviews.length]);

  const visibleReviews = useMemo(() => reviews.slice(0, visibleCount), [reviews, visibleCount]);
  const hasMoreReviews = visibleCount < reviews.length;
  const canShowLess = visibleCount > reviewsStep && reviews.length > reviewsStep;

  return (
    <AnimatedStaggerItem index={2} style={providerDetailStyles.reviewsCard}>
      <Text style={providerDetailStyles.sectionTitle}>Avaliações de clientes ({reviews.length})</Text>
      {!!reviews.length && (
        <Text style={providerDetailStyles.sectionSubtitle}>
          Comentários reais de quem já contratou este prestador.
        </Text>
      )}

      {!reviews.length && (
        <View style={providerDetailStyles.emptyStateCard}>
          <Text style={providerDetailStyles.emptyStateTitle}>Sem avaliações por enquanto</Text>
          <Text style={providerDetailStyles.emptyStateText}>
            Este prestador ainda não recebeu avaliações públicas.
          </Text>
        </View>
      )}

      {visibleReviews.map((review) => (
        <View key={review.id} style={providerDetailStyles.reviewCard}>
          <View style={providerDetailStyles.reviewHeaderRow}>
            <Text style={providerDetailStyles.reviewerName}>{review.contractorName}</Text>
            <Text style={providerDetailStyles.reviewDate}>{formatProviderReviewDate(review.createdAt)}</Text>
          </View>

          <View style={providerDetailStyles.reviewServiceChip}>
            <Text style={providerDetailStyles.reviewServiceChipText}>{review.serviceTitle}</Text>
          </View>

          <View style={providerDetailStyles.reviewRatingRow}>
            {renderProviderStars(review.rating)}
            <Text style={providerDetailStyles.reviewRatingValue}>{review.rating.toFixed(1)}</Text>
          </View>

          <Text style={providerDetailStyles.reviewComment}>{review.comment}</Text>

          {!!review.photoUrls.length && (
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={providerDetailStyles.reviewPhotosRow}
            >
              {review.photoUrls.map((url) => (
                <Image key={url} source={{ uri: url }} style={providerDetailStyles.reviewPhoto} />
              ))}
            </ScrollView>
          )}
        </View>
      ))}

      {(hasMoreReviews || canShowLess) && (
        <View style={providerDetailStyles.loadMoreRow}>
          {hasMoreReviews && (
            <ScalePressable
              style={providerDetailStyles.loadMoreButton}
              onPress={() => setVisibleCount((prev) => prev + reviewsStep)}
              haptic="selection"
            >
              <Text style={providerDetailStyles.loadMoreButtonText}>Mostrar mais avaliações</Text>
            </ScalePressable>
          )}

          {canShowLess && (
            <ScalePressable
              style={providerDetailStyles.loadLessButton}
              onPress={() => setVisibleCount(reviewsStep)}
              haptic="selection"
            >
              <Text style={providerDetailStyles.loadLessButtonText}>Mostrar menos</Text>
            </ScalePressable>
          )}
        </View>
      )}
    </AnimatedStaggerItem>
  );
}
