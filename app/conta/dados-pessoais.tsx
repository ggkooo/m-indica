import * as ImagePicker from 'expo-image-picker';
import { useEffect, useMemo, useRef, useState } from 'react';
import {
    Alert,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View
} from 'react-native';

  import { SearchableSelect } from '@/components/form/SearchableSelect';
import { AnimatedStaggerItem } from '@/components/profile/AnimatedStaggerItem';
import { ScalePressable } from '@/components/profile/ScalePressable';
import { SkeletonBlock } from '@/components/profile/SkeletonBlock';
import { useMarketplace } from '@/context/MarketplaceContext';
import { useScrollToTopOnFocus } from '@/hooks/useScrollToTopOnFocus';
import { profileShadow, profileTheme } from '@/theme/profileTheme';
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

export default function DadosPessoaisScreen() {
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

  useEffect(() => {
    const loadStates = async () => {
      setLoadingStates(true);
      try {
        const response = await fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome');
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
        const response = await fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${stateCode}/municipios`);
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
  }, [name, avatarUri, email, phone, cpf, rg, stateCode, city, safeName, safeAvatarUri, safeEmail, safePhone, safeCpf, safeRg, safeState, safeCity]);

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

  const scrollRef = useRef<ScrollView>(null);

  useScrollToTopOnFocus(scrollRef);

  const handlePickProfilePhoto = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== 'granted') {
      Alert.alert('Permissão necessária', 'Permita acesso à galeria para selecionar a foto do perfil.');
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
    if (!name.trim() || !email.trim() || !phone.trim() || !cpf.trim() || !rg.trim() || !stateCode.trim() || !city.trim()) {
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

  return (
    <ScrollView ref={scrollRef} style={styles.screen} contentContainerStyle={styles.content}>
      <AnimatedStaggerItem index={0} style={styles.heroRow}>
        <Text style={styles.heroEyebrow}>Perfil</Text>
        <Text style={styles.heroTitle}>Dados pessoais</Text>
        <Text style={styles.heroSubtitle}>Cadastro organizado e validado para manter sua conta sempre confiável.</Text>
      </AnimatedStaggerItem>

      <AnimatedStaggerItem index={1} style={styles.card}>
        <Text style={styles.title}>Informações de cadastro</Text>
        <Text style={styles.subtitle}>Atualize seus dados de contato e identificação com segurança.</Text>

        <View style={styles.avatarRow}>
          <View style={styles.avatarPreviewWrap}>
            {avatarUri ? (
              <Image source={{ uri: avatarUri }} style={styles.avatarPreviewImage} />
            ) : (
              <Text style={styles.avatarPreviewText}>Sem foto</Text>
            )}
          </View>

          <View style={styles.avatarActionsWrap}>
            <ScalePressable style={styles.avatarActionButton} onPress={handlePickProfilePhoto} haptic="selection">
              <Text style={styles.avatarActionButtonText}>Escolher foto</Text>
            </ScalePressable>

            {!!avatarUri && (
              <ScalePressable
                style={[styles.avatarActionButton, styles.avatarActionButtonGhost]}
                onPress={() => setAvatarUri(null)}
                haptic="selection"
              >
                <Text style={[styles.avatarActionButtonText, styles.avatarActionButtonGhostText]}>Remover</Text>
              </ScalePressable>
            )}
          </View>
        </View>

        <View style={styles.fieldWrap}>
          <Text style={styles.label}>Nome completo</Text>
          <TextInput value={name} onChangeText={setName} style={styles.input} placeholder="Seu nome" />
        </View>

        <View style={styles.fieldWrap}>
          <Text style={styles.label}>E-mail</Text>
          <TextInput
            value={email}
            onChangeText={setEmail}
            style={styles.input}
            placeholder="voce@email.com"
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <View style={styles.fieldWrap}>
          <Text style={styles.label}>Telefone</Text>
          <TextInput
            value={phone}
            onChangeText={(value) => setPhone(formatPhone(value))}
            style={styles.input}
            placeholder="(11) 9.7055-6189"
            keyboardType="phone-pad"
          />
        </View>

        <View style={styles.fieldWrap}>
          <Text style={styles.label}>CPF</Text>
          <TextInput
            value={cpf}
            onChangeText={(value) => setCpf(formatCpf(value))}
            style={styles.input}
            placeholder="000.000.000-00"
            keyboardType="number-pad"
          />
        </View>

        <View style={styles.fieldWrap}>
          <Text style={styles.label}>RG</Text>
          <TextInput
            value={rg}
            onChangeText={(value) => setRg(formatRg(value))}
            style={styles.input}
            placeholder="71.168.948-12"
            keyboardType="number-pad"
          />
        </View>

        <View style={styles.fieldWrap}>
          <SearchableSelect
            label="Estado"
            placeholder="Selecione um estado"
            options={stateOptions}
            selectedValue={selectedStateLabel}
            onSelect={(label) => {
              const nextStateCode = label.split(' - ').pop()?.trim() ?? '';
              setStateCode(nextStateCode);
              setCity('');
            }}
            loading={loadingStates}
            emptyText="Nenhum estado disponível."
          />

          {loadingStates && !states.length && (
            <View style={styles.inlineSkeletonRow}>
              <SkeletonBlock height={10} width="36%" borderRadius={6} />
              <SkeletonBlock height={10} width="48%" borderRadius={6} />
            </View>
          )}
        </View>

        <View style={styles.fieldWrap}>
          <SearchableSelect
            label="Cidade"
            placeholder={stateCode ? 'Selecione uma cidade' : 'Escolha um estado primeiro'}
            options={cityOptions}
            selectedValue={city}
            onSelect={setCity}
            loading={!!stateCode && loadingCities}
            disabled={!stateCode}
            emptyText="Nenhuma cidade encontrada para este estado."
          />

          {loadingCities && (
            <View style={styles.inlineSkeletonRow}>
              <SkeletonBlock height={10} width="42%" borderRadius={6} />
              <SkeletonBlock height={10} width="34%" borderRadius={6} />
            </View>
          )}
        </View>

        <ScalePressable
          style={[styles.saveButton, !hasChanges && styles.saveButtonDisabled]}
          onPress={handleSave}
          haptic="medium"
          disabled={!hasChanges}
        >
          <Text style={styles.saveButtonText}>Salvar alterações</Text>
        </ScalePressable>
      </AnimatedStaggerItem>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: profileTheme.colors.background,
  },
  content: {
    padding: 16,
    paddingBottom: 34,
    gap: 14,
  },
  heroRow: {
    gap: 2,
  },
  heroEyebrow: {
    color: '#5f7593',
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  heroTitle: {
    color: '#12263f',
    fontSize: 27,
    fontWeight: '800',
  },
  heroSubtitle: {
    color: '#5f7593',
    fontSize: 14,
    lineHeight: 20,
  },
  card: {
    borderWidth: 1,
    borderColor: profileTheme.colors.border,
    borderRadius: 16,
    backgroundColor: profileTheme.colors.surface,
    padding: 16,
    gap: 12,
    ...profileShadow,
  },
  title: {
    color: '#12263f',
    fontSize: 21,
    fontWeight: '800',
  },
  subtitle: {
    color: '#5f7593',
    lineHeight: 20,
  },
  avatarRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 10,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#e1e8f2',
    backgroundColor: '#f8fbff',
  },
  avatarPreviewWrap: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 1,
    borderColor: '#c9d9ec',
    backgroundColor: '#eaf2fc',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  avatarPreviewImage: {
    width: '100%',
    height: '100%',
  },
  avatarPreviewText: {
    color: '#587594',
    fontSize: 11,
    fontWeight: '700',
  },
  avatarActionsWrap: {
    flex: 1,
    gap: 8,
  },
  avatarActionButton: {
    alignSelf: 'flex-start',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#c3d5ea',
    backgroundColor: '#ffffff',
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  avatarActionButtonGhost: {
    borderColor: '#d6deea',
    backgroundColor: '#f6f9fd',
  },
  avatarActionButtonText: {
    color: '#1c4d82',
    fontWeight: '700',
    fontSize: 12,
  },
  avatarActionButtonGhostText: {
    color: '#5f7593',
  },
  fieldWrap: {
    gap: 7,
  },
  label: {
    color: '#355272',
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.7,
  },
  input: {
    borderWidth: 1,
    borderColor: '#d3ddeb',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 15,
    color: '#12263f',
    backgroundColor: '#fafdff',
  },
  selectWrap: {
    zIndex: 20,
  },
  dropdownLabel: {
    color: '#355272',
    fontSize: 11,
    fontWeight: '700',
    marginBottom: 6,
    textTransform: 'uppercase',
    letterSpacing: 0.7,
  },
  selectBox: {
    borderWidth: 1,
    borderColor: '#d3ddeb',
    borderRadius: 12,
    minHeight: 44,
    paddingHorizontal: 12,
    paddingVertical: 11,
    backgroundColor: '#fafdff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  selectBoxDisabled: {
    backgroundColor: '#f0f4f9',
  },
  selectBoxText: {
    color: '#12263f',
    fontSize: 14,
    flex: 1,
    marginRight: 8,
  },
  selectBoxPlaceholder: {
    color: '#6a7f9a',
  },
  selectArrow: {
    color: '#607896',
    fontSize: 12,
    fontWeight: '700',
  },
  selectDropdownPanel: {
    marginTop: 8,
    borderWidth: 1,
    borderColor: '#d9e2ee',
    borderRadius: 12,
    backgroundColor: '#fff',
    padding: 10,
    gap: 8,
  },
  selectSearchInput: {
    borderWidth: 1,
    borderColor: '#d9e2ee',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 9,
    color: '#1f3f62',
    fontSize: 14,
    backgroundColor: '#f8fbff',
  },
  clearOptionButton: {
    alignSelf: 'flex-start',
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#d4dfec',
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: '#fff',
  },
  clearOptionButtonText: {
    color: '#2d5885',
    fontWeight: '700',
    fontSize: 11,
  },
  selectOptionsScroll: {
    maxHeight: 170,
  },
  selectOptionItem: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e4ecf5',
    paddingVertical: 8,
    paddingHorizontal: 10,
    marginBottom: 6,
    backgroundColor: '#fff',
  },
  selectOptionItemActive: {
    borderColor: '#b6d0ee',
    backgroundColor: '#eaf2fc',
  },
  selectOptionText: {
    color: '#284e75',
    fontSize: 13,
    fontWeight: '600',
  },
  selectOptionTextActive: {
    color: '#1b4f86',
  },
  hintText: {
    color: '#647a96',
    fontSize: 12,
  },
  skeletonWrap: {
    gap: 8,
  },
  inlineSkeletonRow: {
    marginTop: 2,
    flexDirection: 'row',
    gap: 8,
  },
  saveButton: {
    marginTop: 4,
    borderRadius: 14,
    backgroundColor: profileTheme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 13,
  },
  saveButtonDisabled: {
    backgroundColor: profileTheme.colors.primaryMuted,
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: '800',
    fontSize: 14,
  },
});
