import { ScrollView, Text } from 'react-native';

import { PersonalDataFormCard } from '@/components/account/personal-data/PersonalDataFormCard';
import { personalDataStyles } from '@/components/account/personal-data/personalDataStyles';
import { AnimatedStaggerItem } from '@/components/profile/AnimatedStaggerItem';
import { useAccountPersonalDataScreen } from '@/hooks/useAccountPersonalDataScreen';

export default function DadosPessoaisScreen() {
  const {
    scrollRef,
    name,
    avatarUri,
    email,
    phone,
    cpf,
    rg,
    stateCode,
    city,
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
  } = useAccountPersonalDataScreen();

  return (
    <ScrollView ref={scrollRef} style={personalDataStyles.screen} contentContainerStyle={personalDataStyles.content}>
      <AnimatedStaggerItem index={0} style={personalDataStyles.heroRow}>
        <Text style={personalDataStyles.heroEyebrow}>Perfil</Text>
        <Text style={personalDataStyles.heroTitle}>Dados pessoais</Text>
        <Text style={personalDataStyles.heroSubtitle}>Cadastro organizado e validado para manter sua conta sempre confiável.</Text>
      </AnimatedStaggerItem>

      <AnimatedStaggerItem index={1}>
        <PersonalDataFormCard
          name={name}
          avatarUri={avatarUri}
          email={email}
          phone={phone}
          cpf={cpf}
          rg={rg}
          stateCode={stateCode}
          city={city}
          stateOptions={stateOptions}
          cityOptions={cityOptions}
          selectedStateLabel={selectedStateLabel}
          loadingStates={loadingStates}
          loadingCities={loadingCities}
          hasChanges={hasChanges}
          onChangeName={setName}
          onChangeAvatarUri={setAvatarUri}
          onChangeEmail={setEmail}
          onChangePhone={setPhone}
          onChangeCpf={setCpf}
          onChangeRg={setRg}
          onChangeStateCode={setStateCode}
          onChangeCity={setCity}
          onPickProfilePhoto={handlePickProfilePhoto}
          onSave={handleSave}
        />
      </AnimatedStaggerItem>

    </ScrollView>
  );
}
