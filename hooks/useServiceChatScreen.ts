import * as DocumentPicker from 'expo-document-picker';
import * as ImagePicker from 'expo-image-picker';
import { useMemo, useRef, useState } from 'react';
import { Alert, ScrollView } from 'react-native';

import { CURRENT_USER_NAME, CURRENT_USER_ROLE } from '@/components/chat/chatUtils';
import { useMarketplace } from '@/context/MarketplaceContext';
import { ChatAttachment } from '@/data/mockData';

export function useServiceChatScreen(serviceId: string) {
  const {
    getServiceById,
    getConversationByServiceId,
    getMessagesByConversationId,
    openConversation,
    sendChatMessage,
    setConversationStatus,
    userSettings,
  } = useMarketplace();

  const service = useMemo(() => getServiceById(serviceId), [serviceId, getServiceById]);
  const conversation = useMemo(
    () => getConversationByServiceId(serviceId),
    [serviceId, getConversationByServiceId]
  );
  const messages = useMemo(
    () => (conversation ? getMessagesByConversationId(conversation.id) : []),
    [conversation, getMessagesByConversationId]
  );

  const [messageText, setMessageText] = useState('');
  const [interventionModalVisible, setInterventionModalVisible] = useState(false);
  const [interventionReason, setInterventionReason] = useState('');
  const [pendingAttachment, setPendingAttachment] = useState<ChatAttachment | null>(null);
  const [viewerAttachment, setViewerAttachment] = useState<ChatAttachment | null>(null);
  const [viewerLoading, setViewerLoading] = useState(false);
  const messagesScrollRef = useRef<ScrollView>(null);

  const conversationClosed = conversation?.status === 'Finalizado';

  const isPdfAttachment = (attachment: ChatAttachment) => {
    const lowerName = attachment.name.toLowerCase();
    const mime = (attachment.mimeType ?? '').toLowerCase();
    return mime.includes('pdf') || lowerName.endsWith('.pdf');
  };

  const closeAttachmentViewer = () => {
    setViewerAttachment(null);
    setViewerLoading(false);
  };

  const ensureConversation = () => {
    if (!service) {
      return undefined;
    }

    return openConversation({
      serviceId: service.id,
      contractorName: CURRENT_USER_NAME,
    });
  };

  const handleStartConversation = () => {
    if (userSettings.verificationStatus !== 'Aprovado') {
      Alert.alert(
        'Conta não validada',
        'Para iniciar conversas, envie um documento em Segurança da Conta e aguarde aprovação.'
      );
      return;
    }

    const nextConversation = ensureConversation();

    if (!nextConversation) {
      Alert.alert('Erro ao iniciar', 'Não foi possível criar a conversa para este serviço.');
      return;
    }

    Alert.alert('Chat iniciado', 'Conversa criada com sucesso.');
  };

  const handleSendMessage = () => {
    if (userSettings.verificationStatus !== 'Aprovado') {
      Alert.alert(
        'Conta não validada',
        'Envie um documento e aguarde aprovação para enviar mensagens no chat.'
      );
      return;
    }

    const targetConversation = conversation ?? ensureConversation();
    if (!targetConversation) {
      return;
    }

    if (targetConversation.status === 'Finalizado') {
      Alert.alert(
        'Conversa finalizada',
        'Esta conversa foi finalizada e não aceita novas mensagens.'
      );
      return;
    }

    if (!messageText.trim() && !pendingAttachment) {
      Alert.alert('Mensagem vazia', 'Digite algo ou anexe um arquivo antes de enviar.');
      return;
    }

    sendChatMessage({
      conversationId: targetConversation.id,
      senderRole: CURRENT_USER_ROLE,
      senderName: CURRENT_USER_NAME,
      text: messageText.trim(),
      attachment: pendingAttachment ?? undefined,
    });

    setMessageText('');
    setPendingAttachment(null);
    setTimeout(() => messagesScrollRef.current?.scrollToEnd({ animated: true }), 80);
  };

  const handlePickAttachment = () => {
    Alert.alert('Anexar arquivo', 'Escolha o tipo de arquivo', [
      {
        text: 'Galeria (foto/vídeo)',
        onPress: async () => {
          const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
          if (status !== 'granted') {
            Alert.alert('Permissão necessária', 'Permita o acesso à galeria nas configurações.');
            return;
          }
          const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images', 'videos'],
            quality: 0.85,
            allowsEditing: false,
          });
          if (!result.canceled && result.assets.length > 0) {
            const asset = result.assets[0];
            const isVideo = asset.type === 'video';
            setPendingAttachment({
              uri: asset.uri,
              type: isVideo ? 'video' : 'image',
              name: asset.fileName ?? (isVideo ? 'video.mp4' : 'imagem.jpg'),
              mimeType: asset.mimeType ?? (isVideo ? 'video/mp4' : 'image/jpeg'),
            });
          }
        },
      },
      {
        text: 'Câmera',
        onPress: async () => {
          const { status } = await ImagePicker.requestCameraPermissionsAsync();
          if (status !== 'granted') {
            Alert.alert('Permissão necessária', 'Permita o acesso à câmera nas configurações.');
            return;
          }
          const result = await ImagePicker.launchCameraAsync({
            mediaTypes: ['images', 'videos'],
            quality: 0.85,
          });
          if (!result.canceled && result.assets.length > 0) {
            const asset = result.assets[0];
            const isVideo = asset.type === 'video';
            setPendingAttachment({
              uri: asset.uri,
              type: isVideo ? 'video' : 'image',
              name: asset.fileName ?? (isVideo ? 'video.mp4' : 'foto.jpg'),
              mimeType: asset.mimeType ?? (isVideo ? 'video/mp4' : 'image/jpeg'),
            });
          }
        },
      },
      {
        text: 'Documento (PDF, etc.)',
        onPress: async () => {
          const result = await DocumentPicker.getDocumentAsync({
            type: '*/*',
            copyToCacheDirectory: true,
          });
          if (!result.canceled && result.assets.length > 0) {
            const asset = result.assets[0];
            setPendingAttachment({
              uri: asset.uri,
              type: 'document',
              name: asset.name,
              mimeType: asset.mimeType ?? 'application/octet-stream',
            });
          }
        },
      },
      { text: 'Cancelar', style: 'cancel' },
    ]);
  };

  const handleOpenInterventionModal = () => {
    const targetConversation = conversation ?? ensureConversation();
    if (!targetConversation) {
      return;
    }

    if (targetConversation.status === 'Finalizado') {
      Alert.alert(
        'Conversa finalizada',
        'A conversa está finalizada. Não é possível solicitar intervenção.'
      );
      return;
    }

    setInterventionModalVisible(true);
  };

  const handleCloseInterventionModal = () => {
    setInterventionModalVisible(false);
  };

  const submitInterventionRequest = () => {
    const targetConversation = conversation ?? ensureConversation();
    if (!targetConversation) {
      return;
    }

    if (targetConversation.status === 'Finalizado') {
      Alert.alert(
        'Conversa finalizada',
        'A conversa está finalizada. Não é possível solicitar intervenção.'
      );
      return;
    }

    if (!interventionReason.trim()) {
      Alert.alert('Motivo obrigatório', 'Explique a situação para chamar o administrador.');
      return;
    }

    sendChatMessage({
      conversationId: targetConversation.id,
      senderRole: CURRENT_USER_ROLE,
      senderName: CURRENT_USER_NAME,
      text: `Solicitação de intervenção: ${interventionReason.trim()}`,
    });

    setConversationStatus(targetConversation.id, 'Em mediação');
    setInterventionReason('');
    setInterventionModalVisible(false);

    Alert.alert('Solicitação enviada', 'A equipe administrativa foi acionada para intermediar.');
  };

  return {
    service,
    conversation,
    messages,
    messageText,
    interventionModalVisible,
    interventionReason,
    pendingAttachment,
    viewerAttachment,
    viewerLoading,
    messagesScrollRef,
    conversationClosed,
    setMessageText,
    setInterventionReason,
    setPendingAttachment,
    setViewerAttachment,
    setViewerLoading,
    isPdfAttachment,
    closeAttachmentViewer,
    handleStartConversation,
    handleSendMessage,
    handlePickAttachment,
    handleOpenInterventionModal,
    handleCloseInterventionModal,
    submitInterventionRequest,
  };
}
