import { ScrollView, Text, View } from 'react-native';

import { SecurityDocumentsCard } from '@/components/account/security/SecurityDocumentsCard';
import { SecuritySimulationCard } from '@/components/account/security/SecuritySimulationCard';
import { SecurityValidationCard } from '@/components/account/security/SecurityValidationCard';
import { securityStyles } from '@/components/account/security/securityStyles';
import { AnimatedStaggerItem } from '@/components/profile/AnimatedStaggerItem';
import { UserAvatar } from '@/components/profile/UserAvatar';
import { useAccountSecurityScreen } from '@/hooks/useAccountSecurityScreen';

export default function SegurancaScreen() {
  const {
    scrollRef,
    userSettings,
    sending,
    statusVariant,
    handlePickDocument,
    setVerificationStatus,
  } = useAccountSecurityScreen();

  return (
    <ScrollView ref={scrollRef} style={securityStyles.screen} contentContainerStyle={securityStyles.content}>
      <AnimatedStaggerItem index={0} style={securityStyles.heroRow}>
        <View style={securityStyles.heroTopRow}>
          <Text style={securityStyles.heroEyebrow}>Perfil</Text>
          <UserAvatar name={userSettings.name} avatarUri={userSettings.avatarUri} size={40} />
        </View>
        <Text style={securityStyles.heroTitle}>Segurança da conta</Text>
        <Text style={securityStyles.heroSubtitle}>Confiança visual e proteção real em cada etapa da validação.</Text>
      </AnimatedStaggerItem>

      <AnimatedStaggerItem index={1}>
        <SecurityValidationCard
          status={userSettings.verificationStatus}
          statusVariant={statusVariant}
          sending={sending}
          onPickDocument={handlePickDocument}
        />
      </AnimatedStaggerItem>

      <AnimatedStaggerItem index={2}>
        <SecurityDocumentsCard documents={userSettings.verificationDocuments} />
      </AnimatedStaggerItem>

      <AnimatedStaggerItem index={3}>
        <SecuritySimulationCard onSetVerificationStatus={setVerificationStatus} />
      </AnimatedStaggerItem>
    </ScrollView>
  );
}
