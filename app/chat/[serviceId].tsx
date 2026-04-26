import { useLocalSearchParams } from 'expo-router';
import { KeyboardAvoidingView, Platform, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AttachmentViewerModal } from '@/components/chat/AttachmentViewerModal';
import { ChatComposer } from '@/components/chat/ChatComposer';
import { ChatHeaderCard } from '@/components/chat/ChatHeaderCard';
import { ChatMessageList } from '@/components/chat/ChatMessageList';
import { InterventionRequestModal } from '@/components/chat/InterventionRequestModal';
import { chatStyles } from '@/components/chat/chatStyles';
import { useServiceChatScreen } from '@/hooks/useServiceChatScreen';

export default function ChatByServiceScreen() {
  const { serviceId } = useLocalSearchParams<{ serviceId: string | string[] }>();
  const normalizedServiceId = Array.isArray(serviceId) ? (serviceId[0] ?? '') : (serviceId ?? '');
  const insets = useSafeAreaInsets();
  const {
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
  } = useServiceChatScreen(normalizedServiceId);

  if (!service) {
    return (
      <View style={chatStyles.notFoundWrap}>
        <Text style={chatStyles.notFoundTitle}>Serviço não encontrado</Text>
        <Text style={chatStyles.notFoundText}>Não foi possível abrir o chat para este serviço.</Text>
      </View>
    );
  }

  return (
    <>
      <KeyboardAvoidingView
        style={chatStyles.screen}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View pointerEvents="none" style={chatStyles.ambientTopOrb} />
        <View pointerEvents="none" style={chatStyles.ambientBottomOrb} />

        <ChatHeaderCard
          providerName={service.providerName}
          serviceTitle={service.title}
          conversation={conversation}
          conversationClosed={conversationClosed}
          onStartConversation={handleStartConversation}
          onOpenIntervention={handleOpenInterventionModal}
        />

        {!!conversation && (
          <ChatMessageList
            messages={messages}
            scrollRef={messagesScrollRef}
            onOpenAttachment={setViewerAttachment}
          />
        )}

        {!!conversation && (
          <ChatComposer
            bottomInset={insets.bottom}
            conversationClosed={conversationClosed}
            messageText={messageText}
            pendingAttachment={pendingAttachment}
            onChangeMessage={setMessageText}
            onPickAttachment={handlePickAttachment}
            onRemoveAttachment={() => setPendingAttachment(null)}
            onSendMessage={handleSendMessage}
          />
        )}
      </KeyboardAvoidingView>

      <InterventionRequestModal
        visible={interventionModalVisible}
        reason={interventionReason}
        onChangeReason={setInterventionReason}
        onClose={handleCloseInterventionModal}
        onSubmit={submitInterventionRequest}
      />

      <AttachmentViewerModal
        attachment={viewerAttachment}
        loading={viewerLoading}
        onChangeLoading={setViewerLoading}
        onClose={closeAttachmentViewer}
        isPdfAttachment={isPdfAttachment}
      />
    </>
  );
}
