import { Text, View } from 'react-native';

import { ScalePressable } from '@/components/profile/ScalePressable';
import { VerificationStatus } from '@/context/marketplace/types';

import { securityStyles } from './securityStyles';

type SecurityValidationCardProps = {
  status: VerificationStatus;
  statusVariant: 'default' | 'pending' | 'approved' | 'rejected';
  sending: boolean;
  onPickDocument: () => void;
};

export function SecurityValidationCard({
  status,
  statusVariant,
  sending,
  onPickDocument,
}: SecurityValidationCardProps) {
  const statusStyle =
    statusVariant === 'approved'
      ? securityStyles.statusApproved
      : statusVariant === 'pending'
        ? securityStyles.statusPending
        : statusVariant === 'rejected'
          ? securityStyles.statusRejected
          : securityStyles.statusDefault;

  return (
    <View style={securityStyles.card}>
      <Text style={securityStyles.title}>Validação de identidade</Text>
      <Text style={securityStyles.subtitle}>
        Mantenha sua conta verificada para uma experiência mais segura.
      </Text>

      <View style={[securityStyles.statusBadge, statusStyle]}>
        <Text style={securityStyles.statusText}>Status da validação: {status}</Text>
      </View>

      <ScalePressable
        style={[securityStyles.primaryButton, sending && securityStyles.primaryButtonDisabled]}
        onPress={onPickDocument}
        haptic="medium"
        disabled={sending}
      >
        <Text style={securityStyles.primaryButtonText}>
          {sending ? 'Enviando documento...' : 'Enviar documento para validação'}
        </Text>
      </ScalePressable>

      <Text style={securityStyles.helperText}>
        Aceitamos CNH, RG, CPF e comprovante de endereço (PDF, JPG e PNG).
      </Text>
    </View>
  );
}
