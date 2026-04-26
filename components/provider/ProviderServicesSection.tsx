import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { Text, View } from 'react-native';

import { AnimatedStaggerItem } from '@/components/profile/AnimatedStaggerItem';
import { ScalePressable } from '@/components/profile/ScalePressable';
import { ServiceWithProvider } from '@/context/marketplace/types';
import { getServiceCategoryPalette } from '@/data/mockData';

import { providerDetailStyles } from './providerDetailStyles';

type ProviderServicesSectionProps = {
  services: ServiceWithProvider[];
  onOpenService: (serviceId: string) => void;
};

export function ProviderServicesSection({
  services,
  onOpenService,
}: ProviderServicesSectionProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <AnimatedStaggerItem index={1} style={providerDetailStyles.servicesCard}>
      <Text style={providerDetailStyles.sectionTitle}>Serviços disponíveis</Text>
      <Text style={providerDetailStyles.sectionSubtitle}>
        Escolha um serviço para ver detalhes, avaliações e próximos passos.
      </Text>

      <ScalePressable
        style={providerDetailStyles.dropdownToggleButton}
        onPress={() => setExpanded((prev) => !prev)}
        haptic="selection"
      >
        <View style={providerDetailStyles.dropdownToggleContent}>
          <Text style={providerDetailStyles.dropdownToggleButtonText}>
            {expanded ? 'Ocultar serviços' : `Ver serviços disponíveis (${services.length})`}
          </Text>
          <Ionicons
            name={expanded ? 'chevron-up' : 'chevron-down'}
            size={18}
            color="#30557f"
          />
        </View>
      </ScalePressable>

      {!expanded && (
        <Text style={providerDetailStyles.dropdownHintText}>
          Toque para abrir a lista completa de serviços deste prestador.
        </Text>
      )}

      {expanded && !services.length && (
        <View style={providerDetailStyles.emptyStateCard}>
          <Text style={providerDetailStyles.emptyStateTitle}>Nenhum serviço disponível</Text>
          <Text style={providerDetailStyles.emptyStateText}>
            Este prestador ainda não cadastrou serviços para contratação.
          </Text>
        </View>
      )}

      {expanded && services.map((service) => {
        const palette = getServiceCategoryPalette(service.category);

        return (
          <View key={service.id} style={providerDetailStyles.serviceItem}>
            <View style={providerDetailStyles.serviceHeader}>
              <Text style={providerDetailStyles.serviceTitle}>{service.title}</Text>
              <View
                style={[
                  providerDetailStyles.categoryChip,
                  {
                    backgroundColor: palette.background,
                    borderColor: palette.border,
                  },
                ]}
              >
                <Text style={[providerDetailStyles.categoryChipText, { color: palette.text }]}>
                  {service.category}
                </Text>
              </View>
            </View>

            <Text style={providerDetailStyles.serviceDescription} numberOfLines={3}>{service.description}</Text>
            <Text style={providerDetailStyles.servicePrice}>A partir de R$ {service.basePriceFrom}/m²</Text>

            <ScalePressable
              style={providerDetailStyles.serviceButton}
              onPress={() => onOpenService(service.id)}
              haptic="selection"
            >
              <Text style={providerDetailStyles.serviceButtonText}>Ver detalhes do serviço</Text>
            </ScalePressable>
          </View>
        );
      })}
    </AnimatedStaggerItem>
  );
}
