import { useRouter } from 'expo-router';
import { ScrollView, Text, View } from 'react-native';

import { AdminChatConversationCard } from '@/components/admin/AdminChatConversationCard';
import { adminChatStyles } from '@/components/admin/adminChatStyles';
import { ADMIN_CHAT_STATUS_ORDER, useAdminChatsScreen } from '@/hooks/useAdminChatsScreen';

export default function AdminChatsScreen() {
  const router = useRouter();
  const {
    scrollRef,
    sortedConversations,
    adminDrafts,
    getServiceById,
    getMessagesByConversationId,
    setConversationStatus,
    updateDraft,
    sendIntervention,
  } = useAdminChatsScreen();

  return (
    <ScrollView ref={scrollRef} style={adminChatStyles.screen} contentContainerStyle={adminChatStyles.content}>
      <Text style={adminChatStyles.title}>Painel administrativo de chats</Text>
      <Text style={adminChatStyles.subtitle}>
        Acompanhe conversas entre contratador e prestador e intermedeie quando necessário.
      </Text>

      {!sortedConversations.length && (
        <View style={adminChatStyles.emptyCard}>
          <Text style={adminChatStyles.emptyTitle}>Nenhuma conversa no momento</Text>
          <Text style={adminChatStyles.emptyText}>Quando um chat for iniciado, ele aparecerá aqui.</Text>
        </View>
      )}

      {sortedConversations.map((conversation) => {
        const service = getServiceById(conversation.serviceId);
        const messageCount = getMessagesByConversationId(conversation.id).length;
        const draft = adminDrafts[conversation.id] ?? '';

        return (
          <AdminChatConversationCard
            key={conversation.id}
            conversation={conversation}
            serviceTitle={service?.title ?? 'Serviço removido'}
            messageCount={messageCount}
            draft={draft}
            statusOrder={ADMIN_CHAT_STATUS_ORDER}
            onChangeStatus={(status) => setConversationStatus(conversation.id, status)}
            onChangeDraft={(text) => updateDraft(conversation.id, text)}
            onSendIntervention={() => sendIntervention(conversation.id)}
            onOpenConversation={() =>
              router.push({ pathname: '/chat/[serviceId]', params: { serviceId: conversation.serviceId } } as never)
            }
          />
        );
      })}
    </ScrollView>
  );
}
