import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from 'expo-router';
import { useLayoutEffect } from 'react';
import { ScrollView, Text, View } from 'react-native';

import { AddCardModal } from '@/components/account/payment/AddCardModal';
import { PasswordConfirmModal } from '@/components/account/payment/PasswordConfirmModal';
import { PaymentMethodCard } from '@/components/account/payment/PaymentMethodCard';
import { paymentStyles } from '@/components/account/payment/paymentStyles';
import { ACCOUNT_ACCESS_PASSWORD } from '@/components/account/payment/paymentUtils';
import { AnimatedStaggerItem } from '@/components/profile/AnimatedStaggerItem';
import { ScalePressable } from '@/components/profile/ScalePressable';
import { UserAvatar } from '@/components/profile/UserAvatar';
import { useAccountPaymentScreen } from '@/hooks/useAccountPaymentScreen';

export default function PagamentoScreen() {
  const navigation = useNavigation();
  const {
    scrollRef,
    userSettings,
    expandedCardId,
    password,
    passwordModalVisible,
    pendingAction,
    revealedCardIds,
    addCardModalVisible,
    cardBrand,
    cardHolder,
    cardNumber,
    cardExpiry,
    cardCvv,
    setPassword,
    setCardBrand,
    setCardHolder,
    updateCardNumber,
    updateCardExpiry,
    updateCardCvv,
    openAddCardModal,
    closeAddCardModal,
    submitAddCard,
    openCardDetails,
    requestRemoveCard,
    closePasswordModal,
    confirmPassword,
    toggleReveal,
  } = useAccountPaymentScreen();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: '#f4f7fb',
      },
      headerRightContainerStyle: {
        backgroundColor: 'transparent',
        paddingRight: 0,
        marginRight: 0,
      },
      headerRight: () => (
        <ScalePressable
          style={paymentStyles.headerPlusButton}
          onPress={openAddCardModal}
          haptic="light"
        >
          <Ionicons name="add" size={22} color="#145a9b" />
        </ScalePressable>
      ),
    });
  }, [navigation, openAddCardModal]);

  return (
    <>
      <ScrollView
        ref={scrollRef}
        style={paymentStyles.screen}
        contentContainerStyle={paymentStyles.content}
      >
        <AnimatedStaggerItem index={0} style={paymentStyles.heroRow}>
          <View style={paymentStyles.heroTopRow}>
            <Text style={paymentStyles.heroEyebrow}>Perfil</Text>
            <UserAvatar name={userSettings.name} avatarUri={userSettings.avatarUri} size={40} />
          </View>
          <Text style={paymentStyles.heroTitle}>Pagamento</Text>
          <Text style={paymentStyles.heroSubtitle}>
            Métodos salvos com visual limpo e proteção reforçada.
          </Text>
        </AnimatedStaggerItem>

        <AnimatedStaggerItem index={1} style={paymentStyles.card}>
          <Text style={paymentStyles.title}>Métodos de pagamento</Text>
          <Text style={paymentStyles.subtitle}>
            Gerencie cartões com segurança e acesso rápido quando precisar.
          </Text>
          <Text style={paymentStyles.helper}>
            Para testes, senha de acesso aos dados: {ACCOUNT_ACCESS_PASSWORD}
          </Text>

          {!userSettings.paymentMethods.length && (
            <View style={paymentStyles.emptyState}>
              <Text style={paymentStyles.emptyTitle}>Nenhum método cadastrado</Text>
              <Text style={paymentStyles.emptyText}>
                Adicione um cartão para facilitar futuras contratações.
              </Text>
            </View>
          )}

          {userSettings.paymentMethods.map((method) => (
            <PaymentMethodCard
              key={method.id}
              method={method}
              isExpanded={expandedCardId === method.id}
              isRevealed={revealedCardIds.includes(method.id)}
              onOpenDetails={openCardDetails}
              onToggleReveal={toggleReveal}
              onRequestRemove={requestRemoveCard}
            />
          ))}
        </AnimatedStaggerItem>
      </ScrollView>

      <PasswordConfirmModal
        visible={passwordModalVisible}
        pendingAction={pendingAction}
        password={password}
        onChangePassword={setPassword}
        onCancel={closePasswordModal}
        onConfirm={confirmPassword}
      />

      <AddCardModal
        visible={addCardModalVisible}
        brand={cardBrand}
        holder={cardHolder}
        number={cardNumber}
        expiry={cardExpiry}
        cvv={cardCvv}
        onChangeBrand={setCardBrand}
        onChangeHolder={setCardHolder}
        onChangeNumber={updateCardNumber}
        onChangeExpiry={updateCardExpiry}
        onChangeCvv={updateCardCvv}
        onCancel={closeAddCardModal}
        onSubmit={submitAddCard}
      />
    </>
  );
}
