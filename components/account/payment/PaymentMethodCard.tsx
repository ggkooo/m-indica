import { Ionicons } from '@expo/vector-icons';
import { Text, View } from 'react-native';

import { ScalePressable } from '@/components/profile/ScalePressable';
import { PaymentMethod } from '@/context/marketplace/types';

import { paymentStyles } from '@/components/account/payment/paymentStyles';
import { maskCardLast4, maskFullNumber } from '@/components/account/payment/paymentUtils';

type PaymentMethodCardProps = {
  method: PaymentMethod;
  isExpanded: boolean;
  isRevealed: boolean;
  onOpenDetails: (cardId: string) => void;
  onToggleReveal: (cardId: string) => void;
  onRequestRemove: (cardId: string) => void;
};

export function PaymentMethodCard({
  method,
  isExpanded,
  isRevealed,
  onOpenDetails,
  onToggleReveal,
  onRequestRemove,
}: PaymentMethodCardProps) {
  const safeNumber = method.number ?? maskCardLast4(method.last4);
  const safeExpiry = method.expiry ?? '12/30';
  const safeCvv = method.cvv ?? '***';

  return (
    <View style={paymentStyles.paymentCardWrap}>
      <View style={paymentStyles.paymentRow}>
        <View style={paymentStyles.paymentInfoRow}>
          <View style={paymentStyles.cardIconWrap}>
            <Ionicons name="card-outline" size={18} color="#1f4d79" />
          </View>
          <View style={paymentStyles.paymentInfo}>
            <Text style={paymentStyles.paymentBrand}>{method.brand} {maskCardLast4(method.last4)}</Text>
            <Text style={paymentStyles.paymentHolder}>{method.holder}</Text>
          </View>
        </View>

        <ScalePressable
          style={paymentStyles.dropdownToggleButton}
          onPress={() => onOpenDetails(method.id)}
          haptic="selection"
        >
          <Ionicons
            name={isExpanded ? 'chevron-up-outline' : 'chevron-down-outline'}
            size={16}
            color="#355a81"
          />
        </ScalePressable>
      </View>

      {isExpanded && (
        <View style={paymentStyles.dropdownContent}>
          <View style={paymentStyles.dropdownHeader}>
            <Text style={paymentStyles.dropdownTitle}>Detalhes do cartão</Text>
            <ScalePressable onPress={() => onToggleReveal(method.id)} style={paymentStyles.eyeButton} haptic="light">
              <Ionicons
                name={isRevealed ? 'eye-off-outline' : 'eye-outline'}
                size={18}
                color="#2f547a"
              />
            </ScalePressable>
          </View>

          <View style={paymentStyles.detailRow}>
            <Text style={paymentStyles.detailLabel}>Número</Text>
            <Text style={paymentStyles.detailValue}>
              {isRevealed ? safeNumber : maskFullNumber(method.number, method.last4)}
            </Text>
          </View>

          <View style={paymentStyles.detailRow}>
            <Text style={paymentStyles.detailLabel}>Validade</Text>
            <Text style={paymentStyles.detailValue}>{isRevealed ? safeExpiry : '**/**'}</Text>
          </View>

          <View style={paymentStyles.detailRow}>
            <Text style={paymentStyles.detailLabel}>CVV</Text>
            <Text style={paymentStyles.detailValue}>{isRevealed ? safeCvv : '***'}</Text>
          </View>

          <ScalePressable style={paymentStyles.removeInDropdownButton} onPress={() => onRequestRemove(method.id)} haptic="heavy">
            <View style={paymentStyles.removeInDropdownContent}>
              <Ionicons name="trash-outline" size={16} color="#9a3d3d" />
              <Text style={paymentStyles.removeInDropdownText} numberOfLines={1}>Remover cartão</Text>
            </View>
          </ScalePressable>
        </View>
      )}
    </View>
  );
}
