import { useLocalSearchParams, useRouter } from 'expo-router';
import { ScrollView, Text, View } from 'react-native';

import { AnimatedStaggerItem } from '@/components/profile/AnimatedStaggerItem';
import { ServiceReviewForm } from '@/components/service/ServiceReviewForm';
import { ServiceReviewsSection } from '@/components/service/ServiceReviewsSection';
import { ServiceSummaryCard } from '@/components/service/ServiceSummaryCard';
import { serviceDetailStyles } from '@/components/service/serviceDetailStyles';
import { useServiceDetailScreen } from '@/hooks/useServiceDetailScreen';

export default function ServiceDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const {
    scrollRef,
    service,
    reviews,
    averageRating,
    contractorName,
    comment,
    rating,
    photoUrls,
    setContractorName,
    setComment,
    setRating,
    addMockPhoto,
    removePhoto,
    submitReview,
  } = useServiceDetailScreen(id);

  if (!service) {
    return (
      <View style={serviceDetailStyles.notFoundWrap}>
        <Text style={serviceDetailStyles.notFoundTitle}>Serviço não encontrado</Text>
        <Text style={serviceDetailStyles.notFoundText}>Volte para a tela inicial e selecione outro serviço.</Text>
      </View>
    );
  }

  return (
    <ScrollView ref={scrollRef} style={serviceDetailStyles.screen} contentContainerStyle={serviceDetailStyles.content}>
      <AnimatedStaggerItem index={0} style={serviceDetailStyles.heroRow}>
        <Text style={serviceDetailStyles.heroEyebrow}>Serviço</Text>
        <Text style={serviceDetailStyles.heroTitle}>Detalhes do serviço</Text>
        <Text style={serviceDetailStyles.heroSubtitle}>
          Confira o escopo, avaliações e negocie com segurança pelo chat interno.
        </Text>
      </AnimatedStaggerItem>

      <ServiceSummaryCard
        service={service}
        averageRating={averageRating}
        reviewCount={reviews.length}
        animationIndex={1}
        onOpenChat={() =>
          router.push({ pathname: '/chat/[serviceId]', params: { serviceId: service.id } } as never)
        }
      />

      <ServiceReviewForm
        contractorName={contractorName}
        comment={comment}
        rating={rating}
        photoUrls={photoUrls}
        onChangeContractorName={setContractorName}
        onChangeComment={setComment}
        onChangeRating={setRating}
        onAddMockPhoto={addMockPhoto}
        onRemovePhoto={removePhoto}
        onSubmit={submitReview}
        animationIndex={2}
      />

      <ServiceReviewsSection reviews={reviews} animationIndex={3} />
    </ScrollView>
  );
}
