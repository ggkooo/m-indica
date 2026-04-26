import { Modal, Text, TextInput, View } from 'react-native';

import { ScalePressable } from '@/components/profile/ScalePressable';

import { paymentStyles } from '@/components/account/payment/paymentStyles';

type PasswordConfirmModalProps = {
  visible: boolean;
  pendingAction: 'expand' | 'remove';
  password: string;
  onChangePassword: (value: string) => void;
  onCancel: () => void;
  onConfirm: () => void;
};

export function PasswordConfirmModal({
  visible,
  pendingAction,
  password,
  onChangePassword,
  onCancel,
  onConfirm,
}: PasswordConfirmModalProps) {
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onCancel}>
      <View style={paymentStyles.modalBackdrop}>
        <View style={paymentStyles.modalCard}>
          <Text style={paymentStyles.modalTitle}>Confirmar senha</Text>
          <Text style={paymentStyles.modalSubtitle}>
            {pendingAction === 'remove'
              ? 'Digite a senha da conta para remover este cartão.'
              : 'Digite a senha da conta para abrir os detalhes do cartão.'}
          </Text>

          <TextInput
            style={paymentStyles.passwordInput}
            value={password}
            onChangeText={onChangePassword}
            secureTextEntry
            placeholder="Senha"
            placeholderTextColor="#92a3b8"
          />

          <View style={paymentStyles.modalActions}>
            <ScalePressable style={paymentStyles.cancelButton} onPress={onCancel} haptic="light">
              <Text style={paymentStyles.cancelButtonText}>Cancelar</Text>
            </ScalePressable>

            <ScalePressable style={paymentStyles.confirmButton} onPress={onConfirm} haptic="medium">
              <Text style={paymentStyles.confirmButtonText}>Confirmar</Text>
            </ScalePressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}
