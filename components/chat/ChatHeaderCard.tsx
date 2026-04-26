import { Ionicons } from '@expo/vector-icons';
import { Text, View } from 'react-native';

import { AnimatedStaggerItem } from '@/components/profile/AnimatedStaggerItem';
import { ScalePressable } from '@/components/profile/ScalePressable';
import { ChatConversation } from '@/data/mockData';

import { chatStyles } from './chatStyles';
import { CURRENT_USER_NAME } from './chatUtils';

type ChatHeaderCardProps = {
  providerName: string;
  serviceTitle: string;
  conversation: ChatConversation | undefined;
  conversationClosed: boolean;
  onStartConversation: () => void;
  onOpenIntervention: () => void;
};

export function ChatHeaderCard({
  providerName,
  serviceTitle,
  conversation,
  conversationClosed,
  onStartConversation,
  onOpenIntervention,
}: ChatHeaderCardProps) {
  return (
    <AnimatedStaggerItem index={0} style={chatStyles.headerCard}>
      <View style={chatStyles.headerGrip} />
      <Text style={chatStyles.serviceName}>{serviceTitle}</Text>
      <Text style={chatStyles.participantsText}>
        Você: {CURRENT_USER_NAME} • Prestador: {providerName}
      </Text>

      {!!conversation && (
        <View style={chatStyles.statusRow}>
          <View style={chatStyles.statusRowLeft}>
            <Text style={chatStyles.statusLabel}>Status</Text>
            <View
              style={[
                chatStyles.statusBadge,
                conversation.status === 'Finalizado'
                  ? chatStyles.statusBadgeClosed
                  : conversation.status === 'Em mediação'
                    ? chatStyles.statusBadgeMediation
                    : chatStyles.statusBadgeOpen,
              ]}
            >
              <Text
                style={[
                  chatStyles.statusBadgeText,
                  conversation.status === 'Finalizado'
                    ? chatStyles.statusBadgeTextClosed
                    : conversation.status === 'Em mediação'
                      ? chatStyles.statusBadgeTextMediation
                      : chatStyles.statusBadgeTextOpen,
                ]}
              >
                {conversation.status}
              </Text>
            </View>
          </View>

          {!conversationClosed && (
            <ScalePressable
              style={chatStyles.interventionButton}
              onPress={onOpenIntervention}
              haptic="selection"
            >
              <Ionicons name="shield-half-outline" size={18} color="#7a4e0f" />
            </ScalePressable>
          )}
        </View>
      )}

      {!conversation && (
        <ScalePressable
          style={chatStyles.startButton}
          onPress={onStartConversation}
          haptic="medium"
        >
          <Text style={chatStyles.startButtonText}>Iniciar conversa</Text>
        </ScalePressable>
      )}

      {!!conversation && conversationClosed && (
        <View style={chatStyles.closedNotice}>
          <Text style={chatStyles.closedNoticeText}>
            Esta conversa foi finalizada. O histórico continua disponível, mas não é possível enviar
            novas mensagens.
          </Text>
        </View>
      )}
    </AnimatedStaggerItem>
  );
}
