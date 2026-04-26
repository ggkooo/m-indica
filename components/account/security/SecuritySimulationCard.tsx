import { Text, View } from 'react-native';

import { ScalePressable } from '@/components/profile/ScalePressable';
import { VerificationStatus } from '@/context/marketplace/types';

import { securityStyles } from './securityStyles';

type SecuritySimulationCardProps = {
  onSetVerificationStatus: (status: VerificationStatus) => void;
};

export function SecuritySimulationCard({ onSetVerificationStatus }: SecuritySimulationCardProps) {
  return (
    <View style={securityStyles.card}>
      <Text style={securityStyles.sectionTitle}>Simulação (ambiente de testes)</Text>
      <Text style={securityStyles.helperText}>Use para testar o comportamento da conta após análise.</Text>

      <View style={securityStyles.simulationRow}>
        <ScalePressable
          style={[securityStyles.simButton, securityStyles.simApproved]}
          onPress={() => onSetVerificationStatus('Aprovado')}
          haptic="light"
        >
          <Text style={[securityStyles.simButtonText, securityStyles.simApprovedText]}>
            Marcar como aprovado
          </Text>
        </ScalePressable>

        <ScalePressable
          style={[securityStyles.simButton, securityStyles.simRejected]}
          onPress={() => onSetVerificationStatus('Rejeitado')}
          haptic="light"
        >
          <Text style={[securityStyles.simButtonText, securityStyles.simRejectedText]}>
            Marcar como rejeitado
          </Text>
        </ScalePressable>
      </View>
    </View>
  );
}
