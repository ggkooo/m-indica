import { Modal, Text, TextInput, View } from 'react-native';

import { ScalePressable } from '@/components/profile/ScalePressable';

import { paymentStyles } from '@/components/account/payment/paymentStyles';

type AddCardModalProps = {
  visible: boolean;
  brand: string;
  holder: string;
  number: string;
  expiry: string;
  cvv: string;
  onChangeBrand: (value: string) => void;
  onChangeHolder: (value: string) => void;
  onChangeNumber: (value: string) => void;
  onChangeExpiry: (value: string) => void;
  onChangeCvv: (value: string) => void;
  onCancel: () => void;
  onSubmit: () => void;
};

export function AddCardModal({
  visible,
  brand,
  holder,
  number,
  expiry,
  cvv,
  onChangeBrand,
  onChangeHolder,
  onChangeNumber,
  onChangeExpiry,
  onChangeCvv,
  onCancel,
  onSubmit,
}: AddCardModalProps) {
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onCancel}>
      <View style={paymentStyles.modalBackdrop}>
        <View style={paymentStyles.modalCard}>
          <Text style={paymentStyles.modalTitle}>Novo cartao</Text>
          <Text style={paymentStyles.modalSubtitle}>
            Preencha os dados para adicionar um novo metodo de pagamento.
          </Text>

          <TextInput
            style={paymentStyles.passwordInput}
            value={brand}
            onChangeText={onChangeBrand}
            placeholder="Bandeira (ex: Visa)"
            placeholderTextColor="#92a3b8"
            autoCapitalize="words"
          />

          <TextInput
            style={paymentStyles.passwordInput}
            value={holder}
            onChangeText={onChangeHolder}
            placeholder="Titular"
            placeholderTextColor="#92a3b8"
            autoCapitalize="words"
          />

          <TextInput
            style={paymentStyles.passwordInput}
            value={number}
            onChangeText={onChangeNumber}
            placeholder="Numero do cartao"
            placeholderTextColor="#92a3b8"
            keyboardType="number-pad"
            maxLength={19}
          />

          <View style={paymentStyles.cardFormRow}>
            <TextInput
              style={[paymentStyles.passwordInput, paymentStyles.cardFormHalfInput]}
              value={expiry}
              onChangeText={onChangeExpiry}
              placeholder="Validade (MM/AA)"
              placeholderTextColor="#92a3b8"
              keyboardType="number-pad"
              maxLength={5}
            />

            <TextInput
              style={[paymentStyles.passwordInput, paymentStyles.cardFormHalfInput]}
              value={cvv}
              onChangeText={onChangeCvv}
              placeholder="CVV"
              placeholderTextColor="#92a3b8"
              keyboardType="number-pad"
              maxLength={4}
              secureTextEntry
            />
          </View>

          <View style={paymentStyles.modalActions}>
            <ScalePressable style={paymentStyles.cancelButton} onPress={onCancel} haptic="light">
              <Text style={paymentStyles.cancelButtonText}>Cancelar</Text>
            </ScalePressable>

            <ScalePressable style={paymentStyles.confirmButton} onPress={onSubmit} haptic="medium">
              <Text style={paymentStyles.confirmButtonText}>Salvar cartao</Text>
            </ScalePressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}
