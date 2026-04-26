import { Ionicons } from '@expo/vector-icons';
import { Image, ScrollView, Text, View } from 'react-native';

import { AnimatedStaggerItem } from '@/components/profile/AnimatedStaggerItem';
import { ScalePressable } from '@/components/profile/ScalePressable';
import { ChatAttachment, ChatMessage } from '@/data/mockData';

import { chatStyles } from './chatStyles';
import { CURRENT_USER_NAME, CURRENT_USER_ROLE, formatChatDateTime } from './chatUtils';

type ChatMessageListProps = {
  messages: ChatMessage[];
  scrollRef: React.RefObject<ScrollView | null>;
  onOpenAttachment: (attachment: ChatAttachment) => void;
};

export function ChatMessageList({
  messages,
  scrollRef,
  onOpenAttachment,
}: ChatMessageListProps) {
  return (
    <AnimatedStaggerItem index={1} style={chatStyles.messagesSectionWrap}>
      <ScrollView
        ref={scrollRef}
        style={chatStyles.messagesScroll}
        contentContainerStyle={chatStyles.messagesContent}
        onContentSizeChange={() => scrollRef.current?.scrollToEnd({ animated: false })}
      >
        {!messages.length && (
          <View style={chatStyles.emptyChatCard}>
            <Text style={chatStyles.emptyText}>Ainda não existem mensagens nessa conversa.</Text>
          </View>
        )}

        {messages.map((message) => {
          const isCurrentUser =
            message.senderRole === CURRENT_USER_ROLE &&
            message.senderName.trim().toLowerCase() === CURRENT_USER_NAME.trim().toLowerCase();
          const fromAdmin = message.senderRole === 'Administrador';

          return (
            <View
              key={message.id}
              style={[
                chatStyles.messageRow,
                isCurrentUser ? chatStyles.messageRowCurrentUser : chatStyles.messageRowOther,
              ]}
            >
              <View
                style={[
                  chatStyles.messageBubble,
                  fromAdmin
                    ? chatStyles.messageBubbleAdmin
                    : isCurrentUser
                      ? chatStyles.messageBubbleCurrentUser
                      : chatStyles.messageBubbleProvider,
                ]}
              >
                <Text style={chatStyles.messageSender}>
                  {message.senderName} ({message.senderRole})
                </Text>
                {!!message.attachment && (
                  <ScalePressable
                    style={chatStyles.bubbleAttachment}
                    haptic="selection"
                    onPress={() => onOpenAttachment(message.attachment!)}
                  >
                    {message.attachment.type === 'image' ? (
                      <Image
                        source={{ uri: message.attachment.uri }}
                        style={chatStyles.bubbleImage}
                        resizeMode="cover"
                      />
                    ) : (
                      <View style={chatStyles.bubbleFileChip}>
                        <Ionicons
                          name={message.attachment.type === 'video' ? 'videocam-outline' : 'document-outline'}
                          size={18}
                          color="#15599a"
                        />
                        <Text style={chatStyles.bubbleFileName} numberOfLines={2}>
                          {message.attachment.name}
                        </Text>
                      </View>
                    )}
                    <Text style={chatStyles.attachmentHint}>Toque para abrir</Text>
                  </ScalePressable>
                )}
                {!!message.text && <Text style={chatStyles.messageText}>{message.text}</Text>}
                <View style={chatStyles.messageFooter}>
                  <Text style={chatStyles.messageDate}>{formatChatDateTime(message.createdAt)}</Text>
                  {isCurrentUser && (
                    <View style={chatStyles.readReceiptWrap}>
                      <Ionicons name="checkmark" size={12} color="#2563eb" />
                      <Ionicons name="checkmark" size={12} color="#2563eb" style={chatStyles.checkSecond} />
                    </View>
                  )}
                </View>
              </View>
            </View>
          );
        })}
      </ScrollView>
    </AnimatedStaggerItem>
  );
}
