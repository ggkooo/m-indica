import { Image, Text, View } from 'react-native';

import { AnimatedStaggerItem } from '@/components/profile/AnimatedStaggerItem';
import { ScalePressable } from '@/components/profile/ScalePressable';
import { ServiceWithProvider } from '@/context/marketplace/types';

import { serviceDetailStyles } from './serviceDetailStyles';
import { renderServiceStars } from './serviceDetailUtils';

type ServiceSummaryCardProps = {
  service: ServiceWithProvider;
  averageRating: number;
  reviewCount: number;
  animationIndex?: number;
  onOpenChat: () => void;
};

export function ServiceSummaryCard({
  service,
  averageRating,
  reviewCount,
  animationIndex = 0,
  onOpenChat,
}: ServiceSummaryCardProps) {
  return (
    <AnimatedStaggerItem index={animationIndex} style={serviceDetailStyles.card}>
      <View style={serviceDetailStyles.headerRow}>
        <Image source={{ uri: service.providerAvatarUrl }} style={serviceDetailStyles.avatar} />
        <View style={serviceDetailStyles.headerTextWrap}>
          <Text style={serviceDetailStyles.serviceTitle}>{service.title}</Text>
          <Text style={serviceDetailStyles.providerName} numberOfLines={1}>
            {service.providerName} • {service.providerProfession}
          </Text>
          <Text style={serviceDetailStyles.cityText} numberOfLines={1}>{service.providerCity}</Text>
        </View>
      </View>

      <Text style={serviceDetailStyles.description} numberOfLines={4}>{service.description}</Text>
      <Text style={serviceDetailStyles.infoText}>Categoria: {service.category}</Text>
      <Text style={serviceDetailStyles.infoText}>Experiência: {service.providerExperience} anos</Text>
      <Text style={serviceDetailStyles.infoText}>Preço base: R$ {service.basePriceFrom}/m²</Text>

      <Text style={serviceDetailStyles.ratingSummary}>Nota média:</Text>
      <View style={serviceDetailStyles.ratingSummaryRow}>
        {renderServiceStars(averageRating)}
        <Text style={serviceDetailStyles.ratingSummaryMeta}>
          {averageRating.toFixed(1)} ({reviewCount} avaliações)
        </Text>
      </View>

      <Text style={serviceDetailStyles.providerBio} numberOfLines={3}>{service.providerBio}</Text>

      <ScalePressable style={serviceDetailStyles.chatButton} onPress={onOpenChat} haptic="selection">
        <Text style={serviceDetailStyles.chatButtonText}>Conversar com o prestador</Text>
      </ScalePressable>

      <Text style={serviceDetailStyles.chatHelperText}>
        O histórico da conversa fica salvo para mais segurança na contratação.
      </Text>
    </AnimatedStaggerItem>
  );
}
