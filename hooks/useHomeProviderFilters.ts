import { useEffect, useMemo, useState } from 'react';

import { ServiceCategory } from '@/data/mockData';
import { useIbgeLocations } from '@/hooks/useIbgeLocations';

type ProviderService = {
  id: string;
  title: string;
  category: ServiceCategory;
};

type FilterableProvider = {
  id: string;
  name: string;
  profession: string;
  city: string;
  avatarUrl: string;
  bio: string;
  averageRating: number;
  reviewCount: number;
  yearsExperience: number;
  services: ProviderService[];
};

function normalizeText(value: string) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim()
    .toLowerCase();
}

function parseCityAndState(cityText: string) {
  const parts = cityText.split('-').map((item) => item.trim());

  if (parts.length >= 2) {
    return {
      city: parts.slice(0, -1).join(' - '),
      state: parts[parts.length - 1].toUpperCase(),
    };
  }

  return {
    city: cityText.trim(),
    state: '',
  };
}

export function useHomeProviderFilters(
  providersList: FilterableProvider[],
  userLocation: { state: string; city: string }
) {
  const [search, setSearch] = useState('');
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedService, setSelectedService] = useState('');
  const [minimumRating, setMinimumRating] = useState(0);
  const [didApplyLocationDefault, setDidApplyLocationDefault] = useState(false);

  const initialLocationFilter = useMemo(() => {
    const userState = userLocation.state.trim().toUpperCase();
    const userCity = userLocation.city.trim();

    if (!userState) {
      return null;
    }

    const hasStateMatches = providersList.some((provider) => {
      const { state } = parseCityAndState(provider.city);
      return state.toUpperCase() === userState;
    });

    if (!hasStateMatches) {
      return null;
    }

    const hasCityMatches = providersList.some((provider) => {
      const { state, city } = parseCityAndState(provider.city);
      return state.toUpperCase() === userState && normalizeText(city) === normalizeText(userCity);
    });

    return {
      state: userState,
      city: hasCityMatches ? userCity : '',
    };
  }, [providersList, userLocation.city, userLocation.state]);

  const fallbackCitiesByState = useMemo(() => {
    const accumulator: Record<string, string[]> = {};

    providersList.forEach((provider) => {
      const { city, state } = parseCityAndState(provider.city);
      const uf = state.toUpperCase();

      if (!uf) {
        return;
      }

      accumulator[uf] = accumulator[uf] ? [...accumulator[uf], city] : [city];
    });

    Object.keys(accumulator).forEach((uf) => {
      accumulator[uf] = Array.from(new Set(accumulator[uf])).sort((a, b) =>
        a.localeCompare(b, 'pt-BR')
      );
    });

    return accumulator;
  }, [providersList]);

  const { states, cities, loadingStates, loadingCities, loadCitiesByState } =
    useIbgeLocations(fallbackCitiesByState);

  useEffect(() => {
    if (!selectedState) {
      setSelectedCity('');
      loadCitiesByState('');
      return;
    }

    loadCitiesByState(selectedState);
  }, [selectedState, loadCitiesByState]);

  useEffect(() => {
    if (didApplyLocationDefault) {
      return;
    }

    const hasManualFilters =
      !!selectedState ||
      !!selectedCity ||
      !!selectedService ||
      minimumRating > 0 ||
      !!search.trim();

    if (hasManualFilters) {
      setDidApplyLocationDefault(true);
      return;
    }

    if (!initialLocationFilter) {
      setDidApplyLocationDefault(true);
      return;
    }

    setSelectedState(initialLocationFilter.state);
    setSelectedCity(initialLocationFilter.city);
    setDidApplyLocationDefault(true);
  }, [
    didApplyLocationDefault,
    initialLocationFilter,
    minimumRating,
    search,
    selectedCity,
    selectedService,
    selectedState,
  ]);

  const serviceOptions = useMemo(() => {
    return Array.from(
      new Set(
        providersList.flatMap((provider) => provider.services.map((service) => service.title))
      )
    ).sort((a, b) => a.localeCompare(b, 'pt-BR'));
  }, [providersList]);

  const filteredProviders = useMemo(() => {
    const term = normalizeText(search);

    return providersList.filter((provider) => {
      const location = parseCityAndState(provider.city);
      const providerState = location.state.toUpperCase();
      const providerCity = location.city;

      const stateMatches = !selectedState || providerState === selectedState;
      const cityMatches = !selectedCity || normalizeText(providerCity) === normalizeText(selectedCity);

      const serviceMatches =
        !selectedService ||
        provider.services.some(
          (service) => normalizeText(service.title) === normalizeText(selectedService)
        );

      const ratingMatches = provider.averageRating >= minimumRating;

      const searchableText = [
        provider.name,
        provider.profession,
        providerCity,
        providerState,
        provider.bio,
        ...provider.services.map((service) => service.title),
      ]
        .join(' ')
        .trim();

      const searchMatches = !term || normalizeText(searchableText).includes(term);

      return stateMatches && cityMatches && serviceMatches && ratingMatches && searchMatches;
    });
  }, [search, providersList, selectedState, selectedCity, selectedService, minimumRating]);

  const activeFilterCount =
    [selectedState, selectedCity, selectedService].filter(Boolean).length +
    (minimumRating > 0 ? 1 : 0);

  const resetFilters = () => {
    setSelectedState('');
    setSelectedCity('');
    setSelectedService('');
    setMinimumRating(0);
  };

  return {
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
  };
}
