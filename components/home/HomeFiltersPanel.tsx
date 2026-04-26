import { Pressable, StyleSheet, Text, View } from 'react-native';

import { SearchableSelect } from '@/components/form/SearchableSelect';
import { ScalePressable } from '@/components/profile/ScalePressable';

type HomeFiltersPanelProps = {
  states: string[];
  cities: string[];
  loadingStates: boolean;
  loadingCities: boolean;
  selectedState: string;
  selectedCity: string;
  selectedService: string;
  serviceOptions: string[];
  minimumRating: number;
  onSelectState: (value: string) => void;
  onSelectCity: (value: string) => void;
  onSelectService: (value: string) => void;
  onSetMinimumRating: (value: number) => void;
  onResetFilters: () => void;
};

export function HomeFiltersPanel({
  states,
  cities,
  loadingStates,
  loadingCities,
  selectedState,
  selectedCity,
  selectedService,
  serviceOptions,
  minimumRating,
  onSelectState,
  onSelectCity,
  onSelectService,
  onSetMinimumRating,
  onResetFilters,
}: HomeFiltersPanelProps) {
  return (
    <View style={styles.dropdownCard}>
      <View style={styles.dropdownHeaderRow}>
        <Text style={styles.dropdownTitle}>Filtro avançado</Text>
        <Pressable onPress={onResetFilters}>
          <Text style={styles.clearFiltersText}>Limpar</Text>
        </Pressable>
      </View>

      <SearchableSelect
        label="Estado"
        placeholder="Selecione um estado"
        options={states}
        selectedValue={selectedState}
        onSelect={onSelectState}
        loading={loadingStates}
        emptyText="Nenhum estado disponível."
      />

      <SearchableSelect
        label="Cidade"
        placeholder={selectedState ? 'Selecione uma cidade' : 'Escolha um estado primeiro'}
        options={cities}
        selectedValue={selectedCity}
        onSelect={onSelectCity}
        loading={!!selectedState && loadingCities}
        disabled={!selectedState}
        emptyText="Nenhuma cidade encontrada para este estado."
      />

      <SearchableSelect
        label="Serviço"
        placeholder="Selecione um serviço"
        options={serviceOptions}
        selectedValue={selectedService}
        onSelect={onSelectService}
        emptyText="Nenhum serviço encontrado."
      />

      <Text style={styles.dropdownLabel}>Mínimo de estrelas</Text>
      <View style={styles.starsFilterWrap}>
        <View style={styles.starsRow}>
          {[1, 2, 3, 4, 5].map((star) => {
            const active = minimumRating >= star;

            return (
              <ScalePressable
                key={star}
                style={styles.starButton}
                haptic="selection"
                onPress={() => {
                  if (minimumRating === star) {
                    onSetMinimumRating(0);
                    return;
                  }

                  onSetMinimumRating(star);
                }}
              >
                <Text style={[styles.starButtonText, active ? styles.starButtonTextActive : undefined]}>
                  {active ? '★' : '☆'}
                </Text>
              </ScalePressable>
            );
          })}
        </View>

        <View style={styles.starsMetaRow}>
          <Text style={styles.hintText}>
            {minimumRating > 0
              ? `${minimumRating} estrela(s) ou mais`
              : 'Sem mínimo de estrelas'}
          </Text>
          {minimumRating > 0 && (
            <Pressable onPress={() => onSetMinimumRating(0)}>
              <Text style={styles.clearFiltersText}>Limpar</Text>
            </Pressable>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  dropdownCard: {
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#dde5ef',
    backgroundColor: '#ffffff',
    padding: 14,
    gap: 10,
  },
  dropdownHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dropdownTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#12233b',
  },
  clearFiltersText: {
    color: '#4d6f96',
    fontWeight: '700',
    fontSize: 13,
  },
  dropdownLabel: {
    fontSize: 13,
    color: '#51657f',
    fontWeight: '700',
  },
  starsFilterWrap: {
    gap: 8,
  },
  starsRow: {
    flexDirection: 'row',
    gap: 6,
  },
  starButton: {
    width: 36,
    height: 36,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#d7e0ec',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  starButtonText: {
    color: '#c9d2df',
    fontSize: 20,
    lineHeight: 22,
  },
  starButtonTextActive: {
    color: '#f2b400',
  },
  starsMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  },
  hintText: {
    color: '#6b7f97',
    fontSize: 12,
  },
});
