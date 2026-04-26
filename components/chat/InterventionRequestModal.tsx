import { Modal, Text, TextInput, View } from 'react-native';

import { ScalePressable } from '@/components/profile/ScalePressable';

import { chatStyles } from './chatStyles';

type InterventionRequestModalProps = {
  visible: boolean;
  reason: string;
  onChangeReason: (value: string) => void;
  onClose: () => void;
  onSubmit: () => void;
};

export function InterventionRequestModal({
  visible,
  reason,
  onChangeReason,
  onClose,
  onSubmit,
}: InterventionRequestModalProps) {
  return (
    <Modal animationType="slide" transparent visible={visible} onRequestClose={onClose}>
      <View style={chatStyles.modalBackdrop}>
        <View style={chatStyles.modalCard}>
          <Text style={chatStyles.modalTitle}>Solicitar intervenção</Text>
          <Text style={chatStyles.modalSubtitle}>
            Explique o problema para que o administrador possa intermediar a conversa.
          </Text>

          <TextInput
            style={[chatStyles.input, chatStyles.modalInput]}
            value={reason}
            onChangeText={onChangeReason}
            multiline
            placeholder="Descreva a situação"
          />

          <View style={chatStyles.modalActionsRow}>
            <ScalePressable style={chatStyles.modalSecondaryButton} haptic="selection" onPress={onClose}>
              <Text style={chatStyles.modalSecondaryButtonText}>Cancelar</Text>
            </ScalePressable>

            <ScalePressable style={chatStyles.modalPrimaryButton} onPress={onSubmit} haptic="medium">
              <Text style={chatStyles.modalPrimaryButtonText}>Enviar solicitação</Text>
            </ScalePressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}
