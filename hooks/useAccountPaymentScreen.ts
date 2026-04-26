import { useCallback, useRef, useState } from 'react';
import { Alert, ScrollView } from 'react-native';

import { useMarketplace } from '@/context/MarketplaceContext';
import { useScrollToTopOnFocus } from '@/hooks/useScrollToTopOnFocus';

import { ACCOUNT_ACCESS_PASSWORD } from '@/components/account/payment/paymentUtils';

export type PasswordAction = 'expand' | 'remove';

function formatCardNumberInput(value: string) {
  const digits = value.replace(/\D/g, '').slice(0, 16);
  return digits.replace(/(\d{4})(?=\d)/g, '$1 ').trim();
}

function formatExpiryInput(value: string) {
  const digits = value.replace(/\D/g, '').slice(0, 4);
  if (digits.length <= 2) {
    return digits;
  }
  return `${digits.slice(0, 2)}/${digits.slice(2, 4)}`;
}

export function useAccountPaymentScreen() {
  const { userSettings, addPaymentMethod, removePaymentMethod } = useMarketplace();
  const scrollRef = useRef<ScrollView>(null);
  const [expandedCardId, setExpandedCardId] = useState<string | null>(null);
  const [pendingCardId, setPendingCardId] = useState<string | null>(null);
  const [pendingAction, setPendingAction] = useState<PasswordAction>('expand');
  const [password, setPassword] = useState('');
  const [passwordModalVisible, setPasswordModalVisible] = useState(false);
  const [revealedCardIds, setRevealedCardIds] = useState<string[]>([]);
  const [addCardModalVisible, setAddCardModalVisible] = useState(false);
  const [cardBrand, setCardBrand] = useState('Mastercard');
  const [cardHolder, setCardHolder] = useState(userSettings.name);
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');

  useScrollToTopOnFocus(scrollRef);

  const resetCardForm = useCallback(() => {
    setCardBrand('Mastercard');
    setCardHolder(userSettings.name);
    setCardNumber('');
    setCardExpiry('');
    setCardCvv('');
  }, [userSettings.name]);

  const openAddCardModal = useCallback(() => {
    resetCardForm();
    setAddCardModalVisible(true);
  }, [resetCardForm]);

  const closeAddCardModal = useCallback(() => {
    setAddCardModalVisible(false);
  }, []);

  const submitAddCard = useCallback(() => {
    const brand = cardBrand.trim();
    const holder = cardHolder.trim();
    const numberDigits = cardNumber.replace(/\D/g, '');
    const expiryDigits = cardExpiry.replace(/\D/g, '');
    const cvvDigits = cardCvv.replace(/\D/g, '');

    if (!brand) {
      Alert.alert('Campo obrigatório', 'Informe a bandeira do cartão.');
      return;
    }

    if (!holder) {
      Alert.alert('Campo obrigatório', 'Informe o nome do titular.');
      return;
    }

    if (numberDigits.length < 16) {
      Alert.alert('Número inválido', 'Informe um número de cartão com 16 dígitos.');
      return;
    }

    if (expiryDigits.length < 4) {
      Alert.alert('Validade inválida', 'Informe a validade no formato MM/AA.');
      return;
    }

    const month = Number(expiryDigits.slice(0, 2));
    if (month < 1 || month > 12) {
      Alert.alert('Validade inválida', 'O mês de validade deve estar entre 01 e 12.');
      return;
    }

    if (cvvDigits.length < 3) {
      Alert.alert('CVV inválido', 'Informe um CVV com pelo menos 3 dígitos.');
      return;
    }

    const last4 = numberDigits.slice(-4);

    addPaymentMethod({
      brand,
      number: formatCardNumberInput(numberDigits),
      last4,
      expiry: formatExpiryInput(expiryDigits),
      cvv: cvvDigits,
      holder,
    });

    setAddCardModalVisible(false);
    Alert.alert('Cartão adicionado', `Cartão final ${last4} foi adicionado com sucesso.`);
  }, [addPaymentMethod, cardBrand, cardCvv, cardExpiry, cardHolder, cardNumber]);

  const updateCardNumber = useCallback((value: string) => {
    setCardNumber(formatCardNumberInput(value));
  }, []);

  const updateCardExpiry = useCallback((value: string) => {
    setCardExpiry(formatExpiryInput(value));
  }, []);

  const updateCardCvv = useCallback((value: string) => {
    setCardCvv(value.replace(/\D/g, '').slice(0, 4));
  }, []);

  const openCardDetails = (cardId: string) => {
    if (expandedCardId === cardId) {
      setExpandedCardId(null);
      return;
    }

    setPendingAction('expand');
    setPendingCardId(cardId);
    setPassword('');
    setPasswordModalVisible(true);
  };

  const requestRemoveCard = (cardId: string) => {
    setPendingAction('remove');
    setPendingCardId(cardId);
    setPassword('');
    setPasswordModalVisible(true);
  };

  const closePasswordModal = () => {
    setPasswordModalVisible(false);
    setPassword('');
    setPendingCardId(null);
    setPendingAction('expand');
  };

  const confirmPassword = () => {
    if (password !== ACCOUNT_ACCESS_PASSWORD) {
      Alert.alert('Senha incorreta', 'A senha informada está incorreta. Tente novamente.');
      return;
    }

    if (pendingCardId && pendingAction === 'expand') {
      setExpandedCardId(pendingCardId);
    }

    if (pendingCardId && pendingAction === 'remove') {
      removePaymentMethod(pendingCardId);
      setExpandedCardId((prev) => (prev === pendingCardId ? null : prev));
      setRevealedCardIds((prev) => prev.filter((id) => id !== pendingCardId));
      Alert.alert('Cartão removido', 'O cartão foi removido com sucesso.');
    }

    closePasswordModal();
  };

  const toggleReveal = (cardId: string) => {
    setRevealedCardIds((prev) =>
      prev.includes(cardId) ? prev.filter((id) => id !== cardId) : [...prev, cardId]
    );
  };

  return {
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
  };
}
