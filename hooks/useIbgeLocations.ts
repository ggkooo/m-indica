import { useCallback, useEffect, useMemo, useState } from 'react';

type IbgeState = {
  id: number;
  sigla: string;
  nome: string;
};

type IbgeCity = {
  id: number;
  nome: string;
};

function dedupeSorted(values: string[]) {
  return Array.from(new Set(values)).sort((a, b) => a.localeCompare(b, 'pt-BR'));
}

export function useIbgeLocations(fallbackCitiesByState: Record<string, string[]>) {
  const [states, setStates] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);
  const [loadingStates, setLoadingStates] = useState(false);
  const [loadingCities, setLoadingCities] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const loadStates = async () => {
      setLoadingStates(true);

      try {
        const response = await fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados');
        const data = (await response.json()) as IbgeState[];

        if (!isMounted || !Array.isArray(data)) {
          return;
        }

        const fromApi = dedupeSorted(data.map((item) => item.sigla));
        const fromFallback = Object.keys(fallbackCitiesByState);

        setStates(dedupeSorted([...fromApi, ...fromFallback]));
      } catch {
        if (!isMounted) {
          return;
        }

        setStates(dedupeSorted(Object.keys(fallbackCitiesByState)));
      } finally {
        if (isMounted) {
          setLoadingStates(false);
        }
      }
    };

    loadStates();

    return () => {
      isMounted = false;
    };
  }, [fallbackCitiesByState]);

  const loadCitiesByState = useCallback(
    async (stateUf: string) => {
      if (!stateUf) {
        setCities([]);
        return;
      }

      setLoadingCities(true);

      try {
        const response = await fetch(
          `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${stateUf}/municipios`
        );
        const data = (await response.json()) as IbgeCity[];

        if (!Array.isArray(data)) {
          throw new Error('Invalid cities response');
        }

        const fromApi = dedupeSorted(data.map((item) => item.nome));
        const fromFallback = fallbackCitiesByState[stateUf] ?? [];

        setCities(dedupeSorted([...fromApi, ...fromFallback]));
      } catch {
        setCities(dedupeSorted(fallbackCitiesByState[stateUf] ?? []));
      } finally {
        setLoadingCities(false);
      }
    },
    [fallbackCitiesByState]
  );

  const hasAnyLocationOption = useMemo(() => states.length > 0, [states]);

  return {
    states,
    cities,
    loadingStates,
    loadingCities,
    hasAnyLocationOption,
    loadCitiesByState,
  };
}
