import * as ImagePicker from 'expo-image-picker';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Alert, ScrollView } from 'react-native';

import { useMarketplace } from '@/context/MarketplaceContext';
import { useScrollToTopOnFocus } from '@/hooks/useScrollToTopOnFocus';
import { formatCpf, formatPhone, formatRg } from '@/utils/personalDataFormatters';

type IBGEState = {
  id: number;
  sigla: string;
  nome: string;
};

type IBGECity = {
  id: number;
  nome: string;
};

export function useAccountPersonalDataScreen() {
  const { userSettings, updateUserProfile } = useMarketplace();

  const safeName = userSettings.name ?? '';
  const safeAvatarUri = userSettings.avatarUri ?? null;
  const safeEmail = userSettings.email ?? '';
  const safePhone = formatPhone(userSettings.phone ?? '');
  const safeCpf = formatCpf(userSettings.cpf ?? '');
  const safeRg = formatRg(userSettings.rg ?? '');
  const safeState = userSettings.state ?? '';
  const safeCity = userSettings.city ?? '';

  const [name, setName] = useState(safeName);
  const [avatarUri, setAvatarUri] = useState<string | null>(safeAvatarUri);
  const [email, setEmail] = useState(safeEmail);
  const [phone, setPhone] = useState(safePhone);
  const [cpf, setCpf] = useState(safeCpf);
  const [rg, setRg] = useState(safeRg);
  const [stateCode, setStateCode] = useState(safeState);
  const [city, setCity] = useState(safeCity);

  const [states, setStates] = useState<IBGEState[]>([]);
  const [cities, setCities] = useState<IBGECity[]>([]);
  const [loadingStates, setLoadingStates] = useState(false);
  const [loadingCities, setLoadingCities] = useState(false);

  const scrollRef = useRef<ScrollView>(null);

  useScrollToTopOnFocus(scrollRef);

  useEffect(() => {
    const loadStates = async () => {
      setLoadingStates(true);
      try {
        const response = await fetch(
          'https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome'
        );
        if (!response.ok) {
          throw new Error('Falha ao buscar estados');
        }

        const data = (await response.json()) as IBGEState[];
        setStates(data);
      } catch {
        Alert.alert('Erro de conexão', 'Não foi possível carregar os estados da API do IBGE.');
      } finally {
        setLoadingStates(false);
      }
    };

    loadStates();
  }, []);

  useEffect(() => {
    if (!stateCode) {
      setCities([]);
      return;
    }

    const loadCities = async () => {
      setLoadingCities(true);
      try {
        const response = await fetch(
          `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${stateCode}/municipios`
        );
        if (!response.ok) {
          throw new Error('Falha ao buscar cidades');
        }

        const data = (await response.json()) as IBGECity[];
        setCities(data);
      } catch {
        Alert.alert('Erro de conexão', 'Não foi possível carregar as cidades da API do IBGE.');
      } finally {
        setLoadingCities(false);
      }
    };

    loadCities();
  }, [stateCode]);

  const hasChanges = useMemo(() => {
    return (
      name.trim() !== safeName ||
      avatarUri !== safeAvatarUri ||
      email.trim() !== safeEmail ||
      phone.trim() !== safePhone ||
      cpf.trim() !== safeCpf ||
      rg.trim() !== safeRg ||
      stateCode.trim() !== safeState ||
      city.trim() !== safeCity
    );
  }, [
    name,
    avatarUri,
    email,
    phone,
    cpf,
    rg,
    stateCode,
    city,
    safeName,
    safeAvatarUri,
    safeEmail,
    safePhone,
    safeCpf,
    safeRg,
    safeState,
    safeCity,
  ]);

  const selectedStateLabel = useMemo(() => {
    const selected = states.find((item) => item.sigla === stateCode);
    return selected ? `${selected.nome} - ${selected.sigla}` : stateCode;
  }, [states, stateCode]);

  const stateOptions = useMemo(() => {
    return states.map((item) => `${item.nome} - ${item.sigla}`);
  }, [states]);

  const cityOptions = useMemo(() => {
    return cities.map((item) => item.nome);
  }, [cities]);

  const handlePickProfilePhoto = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== 'granted') {
      Alert.alert(
        'Permissão necessária',
        'Permita acesso à galeria para selecionar a foto do perfil.'
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.85,
    });

    if (result.canceled || !result.assets.length) {
      return;
    }

    setAvatarUri(result.assets[0].uri);
  };

  const handleSave = () => {
    if (
      !name.trim() ||
      !email.trim() ||
      !phone.trim() ||
      !cpf.trim() ||
      !rg.trim() ||
      !stateCode.trim() ||
      !city.trim()
    ) {
      Alert.alert('Campos obrigatórios', 'Preencha todos os campos antes de salvar.');
      return;
    }

    updateUserProfile({
      name: name.trim(),
      avatarUri,
      email: email.trim(),
      phone: formatPhone(phone.trim()),
      cpf: formatCpf(cpf.trim()),
      rg: formatRg(rg.trim()),
      state: stateCode.trim(),
      city: city.trim(),
    });

    Alert.alert('Dados atualizados', 'Seu perfil foi atualizado com sucesso.');
  };

  return {
    scrollRef,
    name,
    avatarUri,
    email,
    phone,
    cpf,
    rg,
    stateCode,
    city,
    states,
    cities,
    loadingStates,
    loadingCities,
    hasChanges,
    selectedStateLabel,
    stateOptions,
    cityOptions,
    setName,
    setAvatarUri,
    setEmail,
    setPhone,
    setCpf,
    setRg,
    setStateCode,
    setCity,
    handlePickProfilePhoto,
    handleSave,
  };
}
