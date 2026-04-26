import { ScrollView, Text, View } from 'react-native';

import { PermissionToggleRow } from '@/components/account/terms-permissions/PermissionToggleRow';
import { termsPermissionsStyles } from '@/components/account/terms-permissions/termsPermissionsStyles';
import { AnimatedStaggerItem } from '@/components/profile/AnimatedStaggerItem';
import { ScalePressable } from '@/components/profile/ScalePressable';
import { UserAvatar } from '@/components/profile/UserAvatar';
import { useAccountTermsPermissionsScreen } from '@/hooks/useAccountTermsPermissionsScreen';

export default function TermosPermissoesScreen() {
  const {
    userSettings,
    scrollRef,
    shareProfile,
    allowAnalytics,
    allowLocation,
    setShareProfile,
    setAllowAnalytics,
    handleLocationToggle,
  } = useAccountTermsPermissionsScreen();

  return (
    <ScrollView
      ref={scrollRef}
      style={termsPermissionsStyles.screen}
      contentContainerStyle={termsPermissionsStyles.content}
    >
      <AnimatedStaggerItem index={0} style={termsPermissionsStyles.heroRow}>
        <View style={termsPermissionsStyles.heroTopRow}>
          <Text style={termsPermissionsStyles.heroEyebrow}>Perfil</Text>
          <UserAvatar name={userSettings.name} avatarUri={userSettings.avatarUri} size={40} />
        </View>
        <Text style={termsPermissionsStyles.heroTitle}>Termos e permissões</Text>
        <Text style={termsPermissionsStyles.heroSubtitle}>
          Privacidade transparente, com controle total na sua mão.
        </Text>
      </AnimatedStaggerItem>

      <AnimatedStaggerItem index={1} style={termsPermissionsStyles.card}>
        <Text style={termsPermissionsStyles.title}>Consentimento e uso</Text>
        <Text style={termsPermissionsStyles.subtitle}>
          Revise seus termos e mantenha suas permissões sob controle.
        </Text>

        <View style={termsPermissionsStyles.termsBox}>
          <Text style={termsPermissionsStyles.termsTitle}>Termos de uso</Text>
          <Text style={termsPermissionsStyles.termsText}>
            Ao usar a plataforma, você concorda em manter uma conduta respeitosa e utilizar os
            chats apenas para negociação de serviços relacionados à contratação.
          </Text>
        </View>

        <View style={termsPermissionsStyles.termsBox}>
          <Text style={termsPermissionsStyles.termsTitle}>Política de privacidade</Text>
          <Text style={termsPermissionsStyles.termsText}>
            Seus dados pessoais e documentos de validação são utilizados para segurança da conta
            e prevenção de fraudes durante as transações.
          </Text>
        </View>
      </AnimatedStaggerItem>

      <AnimatedStaggerItem index={2} style={termsPermissionsStyles.card}>
        <Text style={termsPermissionsStyles.sectionTitle}>Permissões</Text>

        <PermissionToggleRow
          title="Compartilhar perfil com prestadores"
          subtitle="Exibe dados básicos para facilitar negociação"
          value={shareProfile}
          onChange={setShareProfile}
        />

        <PermissionToggleRow
          title="Dados de uso e analytics"
          subtitle="Ajuda a melhorar a experiência da plataforma"
          value={allowAnalytics}
          onChange={setAllowAnalytics}
        />

        <PermissionToggleRow
          title="Localização aproximada"
          subtitle="Sugere profissionais da sua região"
          value={allowLocation}
          onChange={handleLocationToggle}
        />

        <ScalePressable style={termsPermissionsStyles.saveButton} haptic="medium">
          <Text style={termsPermissionsStyles.saveButtonText}>Salvar permissões</Text>
        </ScalePressable>
      </AnimatedStaggerItem>
    </ScrollView>
  );
}
