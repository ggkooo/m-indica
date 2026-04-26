import * as DocumentPicker from 'expo-document-picker';
import { useRef, useState } from 'react';
import { Alert, ScrollView } from 'react-native';

import { useMarketplace, VerificationDocumentType } from '@/context/MarketplaceContext';
import { useScrollToTopOnFocus } from '@/hooks/useScrollToTopOnFocus';

type StatusVariant = 'default' | 'pending' | 'approved' | 'rejected';

export function useAccountSecurityScreen() {
  const { userSettings, submitVerificationDocument, setVerificationStatus } = useMarketplace();
  const [sending, setSending] = useState(false);
  const scrollRef = useRef<ScrollView>(null);

  useScrollToTopOnFocus(scrollRef);

  const verificationStatus = userSettings.verificationStatus;

  const statusVariant: StatusVariant =
    verificationStatus === 'Aprovado'
      ? 'approved'
      : verificationStatus === 'Em análise'
        ? 'pending'
        : verificationStatus === 'Rejeitado'
          ? 'rejected'
          : 'default';

  const pickAndSend = async (docType: VerificationDocumentType) => {
    setSending(true);

    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ['application/pdf', 'image/*'],
        copyToCacheDirectory: true,
      });

      if (result.canceled || !result.assets.length) {
        return;
      }

      const asset = result.assets[0];

      submitVerificationDocument({
        type: docType,
        name: asset.name,
        uri: asset.uri,
        mimeType: asset.mimeType,
      });

      Alert.alert(
        'Documento enviado',
        'Seu documento foi enviado para análise. Após aprovação, sua conta fica validada para maior segurança no chat.'
      );
    } finally {
      setSending(false);
    }
  };

  const handlePickDocument = () => {
    Alert.alert('Tipo de documento', 'Selecione o documento para validação da conta', [
      { text: 'CNH', onPress: () => pickAndSend('CNH') },
      { text: 'RG', onPress: () => pickAndSend('RG') },
      { text: 'CPF', onPress: () => pickAndSend('CPF') },
      { text: 'Comprovante de endereço', onPress: () => pickAndSend('Comprovante de endereço') },
      { text: 'Cancelar', style: 'cancel' },
    ]);
  };

  return {
    scrollRef,
    userSettings,
    sending,
    statusVariant,
    handlePickDocument,
    setVerificationStatus,
  };
}
