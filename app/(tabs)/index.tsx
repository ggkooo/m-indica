import { useRouter } from 'expo-router';
import { useRef } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

import { HomeFiltersPanel } from '@/components/home/HomeFiltersPanel';
import { ProviderCard } from '@/components/home/ProviderCard';
import { AnimatedStaggerItem } from '@/components/profile/AnimatedStaggerItem';
import { ScalePressable } from '@/components/profile/ScalePressable';
import { UserAvatar } from '@/components/profile/UserAvatar';
import { useMarketplace } from '@/context/MarketplaceContext';
import { useHomeProviderFilters } from '@/hooks/useHomeProviderFilters';
import { useScrollToTopOnFocus } from '@/hooks/useScrollToTopOnFocus';
import { profileShadow, profileTheme } from '@/theme/profileTheme';

export default function HomeScreen() {
  const router = useRouter();
  const { providersList, userSettings } = useMarketplace();
  const scrollRef = useRef<ScrollView>(null);

  useScrollToTopOnFocus(scrollRef);

  const {
    search,
    setSearch,
    filtersOpen,
    setFiltersOpen,
    selectedState,
    setSelectedState,
    selectedCity,
    setSelectedCity,
    selectedService,
    setSelectedService,
    minimumRating,
    setMinimumRating,
    states,
    cities,
    loadingStates,
    loadingCities,
    serviceOptions,
    filteredProviders,
    activeFilterCount,
    resetFilters,
  } = useHomeProviderFilters(providersList, {
    state: userSettings.state,
    city: userSettings.city,
  });

  return (
    <ScrollView ref={scrollRef} style={styles.screen} contentContainerStyle={styles.content}>
      <View pointerEvents="none" style={styles.ambientTopOrb} />
      <View pointerEvents="none" style={styles.ambientMiddleOrb} />

      <AnimatedStaggerItem index={0} style={styles.heroCard}>
        <View style={styles.heroTopRow}>
          <View style={styles.heroPill}>
            <Text style={styles.heroPillText}>Marketplace verificado</Text>
          </View>
          <UserAvatar name={userSettings.name} avatarUri={userSettings.avatarUri} size={42} />
        </View>
        <Text style={styles.title}>Prestadores confiáveis para sua obra</Text>
        <Text style={styles.subtitle}>
          Visual limpo, avaliações reais e filtros avançados para encontrar exatamente quem você precisa.
        </Text>

        <View style={styles.heroMetricsRow}>
          <View style={styles.heroMetricCard}>
            <Text style={styles.heroMetricValue}>{providersList.length}</Text>
            <Text style={styles.heroMetricLabel}>Prestadores</Text>
          </View>
          <View style={styles.heroMetricCard}>
            <Text style={styles.heroMetricValue}>{serviceOptions.length}</Text>
            <Text style={styles.heroMetricLabel}>Serviços</Text>
          </View>
          <View style={styles.heroMetricCard}>
            <Text style={styles.heroMetricValue}>{filteredProviders.length}</Text>
            <Text style={styles.heroMetricLabel}>No filtro</Text>
          </View>
        </View>
      </AnimatedStaggerItem>

      <AnimatedStaggerItem index={2}>
        <ScalePressable
          style={styles.adminLink}
          onPress={() => router.push('/admin/chats' as never)}
          haptic="selection"
        >
          <Text style={styles.adminLinkText}>Painel administrativo de chats</Text>
        </ScalePressable>
      </AnimatedStaggerItem>

      <AnimatedStaggerItem index={3} style={styles.toolbarWrap}>
        <TextInput
          placeholder="Buscar por profissional, cidade ou serviço"
          value={search}
          onChangeText={setSearch}
          style={styles.searchInput}
          placeholderTextColor="#6a7f9a"
        />

        <ScalePressable
          style={styles.filterButton}
          onPress={() => setFiltersOpen((prev) => !prev)}
          haptic="light"
        >
          <Text style={styles.filterButtonText}>
            Filtros{activeFilterCount ? ` (${activeFilterCount})` : ''}
          </Text>
        </ScalePressable>
      </AnimatedStaggerItem>

      {filtersOpen && (
        <AnimatedStaggerItem index={4}>
          <HomeFiltersPanel
            states={states}
            cities={cities}
            loadingStates={loadingStates}
            loadingCities={loadingCities}
            selectedState={selectedState}
            selectedCity={selectedCity}
            selectedService={selectedService}
            serviceOptions={serviceOptions}
            minimumRating={minimumRating}
            onSelectState={setSelectedState}
            onSelectCity={setSelectedCity}
            onSelectService={setSelectedService}
            onSetMinimumRating={setMinimumRating}
            onResetFilters={resetFilters}
          />
        </AnimatedStaggerItem>
      )}

      <AnimatedStaggerItem index={5} style={styles.resultsHeader}>
        <Text style={styles.resultsTitle}>Prestadores encontrados</Text>
        <Text style={styles.resultsCount}>{filteredProviders.length}</Text>
      </AnimatedStaggerItem>

      {filteredProviders.map((provider, index) => (
        <AnimatedStaggerItem key={provider.id} index={index + 6}>
          <ProviderCard
            provider={provider}
            onPress={() =>
              router.push({ pathname: '/provider/[id]', params: { id: provider.id } } as never)
            }
          />
        </AnimatedStaggerItem>
      ))}

      {!filteredProviders.length && (
        <AnimatedStaggerItem index={7} style={styles.emptyState}>
          <Text style={styles.emptyTitle}>Nenhum prestador encontrado</Text>
          <Text style={styles.emptySubtitle}>
            Tente outro filtro ou termo de busca para localizar prestadores.
          </Text>
        </AnimatedStaggerItem>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: profileTheme.colors.background,
  },
  content: {
    padding: 18,
    paddingBottom: 36,
    gap: 14,
    position: 'relative',
  },
  ambientTopOrb: {
    position: 'absolute',
    width: 220,
    height: 220,
    borderRadius: 999,
    backgroundColor: 'rgba(181, 212, 242, 0.35)',
    top: -85,
    right: -70,
  },
  ambientMiddleOrb: {
    position: 'absolute',
    width: 160,
    height: 160,
    borderRadius: 999,
    backgroundColor: 'rgba(209, 225, 244, 0.35)',
    top: 210,
    left: -65,
  },
  heroCard: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#d7e2ef',
    backgroundColor: '#f9fbfe',
    padding: 16,
    gap: 10,
    ...profileShadow,
  },
  heroPill: {
    alignSelf: 'flex-start',
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#d6e0ec',
    backgroundColor: '#eef4fb',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  heroPillText: {
    fontSize: 11,
    letterSpacing: 0.6,
    textTransform: 'uppercase',
    fontWeight: '700',
    color: '#446486',
  },
  heroTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
  },
  heroMetricsRow: {
    flexDirection: 'row',
    gap: 8,
  },
  heroMetricCard: {
    flex: 1,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#dde6f1',
    backgroundColor: '#ffffff',
    paddingHorizontal: 10,
    paddingVertical: 8,
    alignItems: 'center',
    gap: 2,
  },
  heroMetricValue: {
    color: '#123f73',
    fontWeight: '800',
    fontSize: 15,
  },
  heroMetricLabel: {
    color: '#607790',
    fontWeight: '600',
    fontSize: 11,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#0f1e31',
  },
  subtitle: {
    fontSize: 15,
    lineHeight: 22,
    color: '#506178',
  },
  adminLink: {
    alignSelf: 'flex-start',
    borderBottomWidth: 0,
  },
  adminLinkText: {
    color: '#637f9e',
    fontWeight: '700',
    fontSize: 13,
  },
  toolbarWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    borderWidth: 1,
    borderColor: '#dbe4ef',
    borderRadius: 14,
    backgroundColor: '#f8fbff',
    padding: 8,
    ...profileShadow,
  },
  searchInput: {
    flex: 1,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#dbe2eb',
    borderRadius: 12,
    paddingHorizontal: 13,
    paddingVertical: 11,
    fontSize: 15,
    color: '#0f1e31',
  },
  filterButton: {
    borderWidth: 1,
    borderColor: '#cdd7e3',
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 11,
  },
  filterButtonText: {
    color: '#1f3f63',
    fontWeight: '700',
  },
  resultsHeader: {
    marginTop: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  resultsTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#12233b',
  },
  resultsCount: {
    fontSize: 14,
    color: '#4f617a',
    fontWeight: '700',
  },
  emptyState: {
    marginTop: 8,
    backgroundColor: profileTheme.colors.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e2e8f2',
    padding: 16,
    gap: 4,
    ...profileShadow,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#12233b',
  },
  emptySubtitle: {
    color: '#4f617a',
    lineHeight: 20,
  },
});
