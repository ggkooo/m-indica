import { Image, Text, TextInput, View } from 'react-native';

import { SearchableSelect } from '@/components/form/SearchableSelect';
import { ScalePressable } from '@/components/profile/ScalePressable';
import { SkeletonBlock } from '@/components/profile/SkeletonBlock';
import { formatCpf, formatPhone, formatRg } from '@/utils/personalDataFormatters';

import { personalDataStyles } from './personalDataStyles';

type PersonalDataFormCardProps = {
  name: string;
  avatarUri: string | null;
  email: string;
  phone: string;
  cpf: string;
  rg: string;
  stateCode: string;
  city: string;
  stateOptions: string[];
  cityOptions: string[];
  selectedStateLabel: string;
  loadingStates: boolean;
  loadingCities: boolean;
  hasChanges: boolean;
  onChangeName: (value: string) => void;
  onChangeAvatarUri: (value: string | null) => void;
  onChangeEmail: (value: string) => void;
  onChangePhone: (value: string) => void;
  onChangeCpf: (value: string) => void;
  onChangeRg: (value: string) => void;
  onChangeStateCode: (value: string) => void;
  onChangeCity: (value: string) => void;
  onPickProfilePhoto: () => void;
  onSave: () => void;
};

export function PersonalDataFormCard({
  name,
  avatarUri,
  email,
  phone,
  cpf,
  rg,
  stateCode,
  city,
  stateOptions,
  cityOptions,
  selectedStateLabel,
  loadingStates,
  loadingCities,
  hasChanges,
  onChangeName,
  onChangeAvatarUri,
  onChangeEmail,
  onChangePhone,
  onChangeCpf,
  onChangeRg,
  onChangeStateCode,
  onChangeCity,
  onPickProfilePhoto,
  onSave,
}: PersonalDataFormCardProps) {
  return (
    <View style={personalDataStyles.card}>
      <Text style={personalDataStyles.title}>Informações de cadastro</Text>
      <Text style={personalDataStyles.subtitle}>
        Atualize seus dados de contato e identificação com segurança.
      </Text>

      <View style={personalDataStyles.avatarRow}>
        <View style={personalDataStyles.avatarPreviewWrap}>
          {avatarUri ? (
            <Image source={{ uri: avatarUri }} style={personalDataStyles.avatarPreviewImage} />
          ) : (
            <Text style={personalDataStyles.avatarPreviewText}>Sem foto</Text>
          )}
        </View>

        <View style={personalDataStyles.avatarActionsWrap}>
          <ScalePressable
            style={personalDataStyles.avatarActionButton}
            onPress={onPickProfilePhoto}
            haptic="selection"
          >
            <Text style={personalDataStyles.avatarActionButtonText}>Escolher foto</Text>
          </ScalePressable>

          {!!avatarUri && (
            <ScalePressable
              style={[
                personalDataStyles.avatarActionButton,
                personalDataStyles.avatarActionButtonGhost,
              ]}
              onPress={() => onChangeAvatarUri(null)}
              haptic="selection"
            >
              <Text
                style={[
                  personalDataStyles.avatarActionButtonText,
                  personalDataStyles.avatarActionButtonGhostText,
                ]}
              >
                Remover
              </Text>
            </ScalePressable>
          )}
        </View>
      </View>

      <View style={personalDataStyles.fieldWrap}>
        <Text style={personalDataStyles.label}>Nome completo</Text>
        <TextInput
          value={name}
          onChangeText={onChangeName}
          style={personalDataStyles.input}
          placeholder="Seu nome"
        />
      </View>

      <View style={personalDataStyles.fieldWrap}>
        <Text style={personalDataStyles.label}>E-mail</Text>
        <TextInput
          value={email}
          onChangeText={onChangeEmail}
          style={personalDataStyles.input}
          placeholder="voce@email.com"
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>

      <View style={personalDataStyles.fieldWrap}>
        <Text style={personalDataStyles.label}>Telefone</Text>
        <TextInput
          value={phone}
          onChangeText={(value) => onChangePhone(formatPhone(value))}
          style={personalDataStyles.input}
          placeholder="(11) 9.7055-6189"
          keyboardType="phone-pad"
        />
      </View>

      <View style={personalDataStyles.fieldWrap}>
        <Text style={personalDataStyles.label}>CPF</Text>
        <TextInput
          value={cpf}
          onChangeText={(value) => onChangeCpf(formatCpf(value))}
          style={personalDataStyles.input}
          placeholder="000.000.000-00"
          keyboardType="number-pad"
        />
      </View>

      <View style={personalDataStyles.fieldWrap}>
        <Text style={personalDataStyles.label}>RG</Text>
        <TextInput
          value={rg}
          onChangeText={(value) => onChangeRg(formatRg(value))}
          style={personalDataStyles.input}
          placeholder="71.168.948-12"
          keyboardType="number-pad"
        />
      </View>

      <View style={personalDataStyles.fieldWrap}>
        <SearchableSelect
          label="Estado"
          placeholder="Selecione um estado"
          options={stateOptions}
          selectedValue={selectedStateLabel}
          onSelect={(label) => {
            const nextStateCode = label.split(' - ').pop()?.trim() ?? '';
            onChangeStateCode(nextStateCode);
            onChangeCity('');
          }}
          loading={loadingStates}
          emptyText="Nenhum estado disponível."
        />

        {loadingStates && !stateOptions.length && (
          <View style={personalDataStyles.inlineSkeletonRow}>
            <SkeletonBlock height={10} width="36%" borderRadius={6} />
            <SkeletonBlock height={10} width="48%" borderRadius={6} />
          </View>
        )}
      </View>

      <View style={personalDataStyles.fieldWrap}>
        <SearchableSelect
          label="Cidade"
          placeholder={stateCode ? 'Selecione uma cidade' : 'Escolha um estado primeiro'}
          options={cityOptions}
          selectedValue={city}
          onSelect={onChangeCity}
          loading={!!stateCode && loadingCities}
          disabled={!stateCode}
          emptyText="Nenhuma cidade encontrada para este estado."
        />

        {loadingCities && (
          <View style={personalDataStyles.inlineSkeletonRow}>
            <SkeletonBlock height={10} width="42%" borderRadius={6} />
            <SkeletonBlock height={10} width="34%" borderRadius={6} />
          </View>
        )}
      </View>

      <ScalePressable
        style={[personalDataStyles.saveButton, !hasChanges && personalDataStyles.saveButtonDisabled]}
        onPress={onSave}
        haptic="medium"
        disabled={!hasChanges}
      >
        <Text style={personalDataStyles.saveButtonText}>Salvar alterações</Text>
      </ScalePressable>
    </View>
  );
}
