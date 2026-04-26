import { Pressable, Text, TextInput, View } from 'react-native';

import { ChatConversation, ConversationStatus } from '@/data/mockData';

import { adminChatStyles } from './adminChatStyles';
import { formatAdminChatDateTime } from './adminChatUtils';

type AdminChatConversationCardProps = {
  conversation: ChatConversation;
  serviceTitle: string;
  messageCount: number;
  draft: string;
  statusOrder: ConversationStatus[];
  onChangeStatus: (status: ConversationStatus) => void;
  onChangeDraft: (text: string) => void;
  onSendIntervention: () => void;
  onOpenConversation: () => void;
};

export function AdminChatConversationCard({
  conversation,
  serviceTitle,
  messageCount,
  draft,
  statusOrder,
  onChangeStatus,
  onChangeDraft,
  onSendIntervention,
  onOpenConversation,
}: AdminChatConversationCardProps) {
  return (
    <View style={adminChatStyles.card}>
      <Text style={adminChatStyles.serviceTitle}>{serviceTitle}</Text>
      <Text style={adminChatStyles.participantsLine}>
        Contratador: {conversation.contractorName} • Prestador: {conversation.providerName}
      </Text>
      <Text style={adminChatStyles.metaLine}>Mensagens: {messageCount}</Text>
      <Text style={adminChatStyles.metaLine}>
        Última atividade: {formatAdminChatDateTime(conversation.lastMessageAt)}
      </Text>

      <View style={adminChatStyles.statusRow}>
        {statusOrder.map((status) => {
          const active = conversation.status === status;

          return (
            <Pressable
              key={status}
              style={[adminChatStyles.statusChip, active && adminChatStyles.statusChipActive]}
              onPress={() => onChangeStatus(status)}
            >
              <Text
                style={[
                  adminChatStyles.statusChipText,
                  active && adminChatStyles.statusChipTextActive,
                ]}
              >
                {status}
              </Text>
            </Pressable>
          );
        })}
      </View>

      <TextInput
        style={[adminChatStyles.input, adminChatStyles.multilineInput]}
        value={draft}
        onChangeText={onChangeDraft}
        multiline
        placeholder="Mensagem de intermediação do administrador"
      />

      <View style={adminChatStyles.actionsRow}>
        <Pressable style={adminChatStyles.primaryButton} onPress={onSendIntervention}>
          <Text style={adminChatStyles.primaryButtonText}>Enviar intermediação</Text>
        </Pressable>

        <Pressable style={adminChatStyles.secondaryButton} onPress={onOpenConversation}>
          <Text style={adminChatStyles.secondaryButtonText}>Abrir conversa</Text>
        </Pressable>
      </View>
    </View>
  );
}
