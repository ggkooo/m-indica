import { Image, ScrollView, Text, View } from 'react-native';

import { AnimatedStaggerItem } from '@/components/profile/AnimatedStaggerItem';
import { Review } from '@/data/mockData';

import { serviceDetailStyles } from './serviceDetailStyles';
import { formatServiceReviewDate, renderServiceStars } from './serviceDetailUtils';

type ServiceReviewsSectionProps = {
  reviews: Review[];
  animationIndex?: number;
};

export function ServiceReviewsSection({ reviews, animationIndex = 2 }: ServiceReviewsSectionProps) {
  return (
    <AnimatedStaggerItem index={animationIndex} style={serviceDetailStyles.card}>
      <Text style={serviceDetailStyles.sectionTitle}>Avaliações ({reviews.length})</Text>
      {!!reviews.length && (
        <Text style={serviceDetailStyles.sectionSubtitle}>
          Veja o que outros clientes comentaram sobre este serviço.
        </Text>
      )}

      {!reviews.length && (
        <Text style={serviceDetailStyles.emptyText}>
          Ainda não há avaliações para este serviço. Seja a primeira pessoa a avaliar.
        </Text>
      )}

      {reviews.map((review) => (
        <View key={review.id} style={serviceDetailStyles.reviewCard}>
          <View style={serviceDetailStyles.reviewHeaderRow}>
            <Text style={serviceDetailStyles.reviewerName}>{review.contractorName}</Text>
            <Text style={serviceDetailStyles.reviewDate}>{formatServiceReviewDate(review.createdAt)}</Text>
          </View>

          <Text style={serviceDetailStyles.reviewStars}>{review.rating.toFixed(1)}</Text>
          <View style={serviceDetailStyles.reviewStarsRow}>{renderServiceStars(review.rating)}</View>

          <Text style={serviceDetailStyles.reviewComment}>{review.comment}</Text>

          {!!review.photoUrls.length && (
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={serviceDetailStyles.photosRow}
            >
              {review.photoUrls.map((url) => (
                <Image key={url} source={{ uri: url }} style={serviceDetailStyles.reviewPhoto} />
              ))}
            </ScrollView>
          )}
        </View>
      ))}
    </AnimatedStaggerItem>
  );
}
