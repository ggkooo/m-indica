import { Ionicons } from '@expo/vector-icons';
import { Image, Text, TextInput, View } from 'react-native';

import { AnimatedStaggerItem } from '@/components/profile/AnimatedStaggerItem';
import { ScalePressable } from '@/components/profile/ScalePressable';
import { ChatAttachment } from '@/data/mockData';

import { chatStyles } from './chatStyles';

type ChatComposerProps = {
  bottomInset: number;
  conversationClosed: boolean;
  messageText: string;
  pendingAttachment: ChatAttachment | null;
  onChangeMessage: (value: string) => void;
  onPickAttachment: () => void;
  onRemoveAttachment: () => void;
  onSendMessage: () => void;
};

export function ChatComposer({
  bottomInset,
  conversationClosed,
  messageText,
  pendingAttachment,
  onChangeMessage,
  onPickAttachment,
  onRemoveAttachment,
  onSendMessage,
}: ChatComposerProps) {
  const sendDisabled = conversationClosed || (!messageText.trim() && !pendingAttachment);

  return (
    <AnimatedStaggerItem index={2}>
      <View style={[chatStyles.inputBarWrap, { paddingBottom: bottomInset + 8 }]}>
        {!!pendingAttachment && (
          <View style={chatStyles.attachmentPreviewRow}>
            {pendingAttachment.type === 'image' ? (
              <Image source={{ uri: pendingAttachment.uri }} style={chatStyles.attachmentThumb} />
            ) : (
              <View style={chatStyles.attachmentFileChip}>
                <Ionicons
                  name={pendingAttachment.type === 'video' ? 'videocam-outline' : 'document-outline'}
                  size={18}
                  color="#15599a"
                />
                <Text style={chatStyles.attachmentFileName} numberOfLines={1}>
                  {pendingAttachment.name}
                </Text>
              </View>
            )}
            <ScalePressable onPress={onRemoveAttachment} style={chatStyles.attachmentRemove} haptic="selection">
              <Ionicons name="close-circle" size={20} color="#e05050" />
            </ScalePressable>
          </View>
        )}

        <View style={chatStyles.inputBar}>
          <ScalePressable
            style={chatStyles.attachButton}
            onPress={onPickAttachment}
            haptic="light"
            disabled={conversationClosed}
          >
            <Ionicons
              name="attach"
              size={22}
              color={conversationClosed ? '#b0c0d4' : '#15599a'}
            />
          </ScalePressable>
          <TextInput
            style={[chatStyles.messageInput, conversationClosed && chatStyles.inputDisabled]}
            value={messageText}
            onChangeText={onChangeMessage}
            multiline
            placeholder="Digite sua mensagem"
            placeholderTextColor="#8fa5be"
            editable={!conversationClosed}
          />
          <ScalePressable
            style={[chatStyles.sendButton, sendDisabled && chatStyles.sendButtonDisabled]}
            onPress={onSendMessage}
            haptic="medium"
            disabled={sendDisabled}
          >
            <Ionicons name="send" size={20} color="#fff" />
          </ScalePressable>
        </View>
      </View>
    </AnimatedStaggerItem>
  );
}
