import { useMemo, useRef, useState } from 'react';
import { ScrollView } from 'react-native';

import { useMarketplace } from '@/context/MarketplaceContext';
import { ConversationStatus } from '@/data/mockData';
import { useScrollToTopOnFocus } from '@/hooks/useScrollToTopOnFocus';

export const ADMIN_CHAT_STATUS_ORDER: ConversationStatus[] = [
  'Aberto',
  'Em mediação',
  'Finalizado',
];

export function useAdminChatsScreen() {
  const {
    conversations,
    getServiceById,
    getMessagesByConversationId,
    sendChatMessage,
    setConversationStatus,
  } = useMarketplace();

  const [adminDrafts, setAdminDrafts] = useState<Record<string, string>>({});
  const scrollRef = useRef<ScrollView>(null);

  useScrollToTopOnFocus(scrollRef);

  const sortedConversations = useMemo(() => {
    return [...conversations].sort(
      (a, b) => +new Date(b.lastMessageAt) - +new Date(a.lastMessageAt)
    );
  }, [conversations]);

  const updateDraft = (conversationId: string, text: string) => {
    setAdminDrafts((prev) => ({
      ...prev,
      [conversationId]: text,
    }));
  };

  const sendIntervention = (conversationId: string) => {
    const text = adminDrafts[conversationId]?.trim();
    if (!text) {
      return;
    }

    sendChatMessage({
      conversationId,
      senderRole: 'Administrador',
      senderName: 'Equipe Admin',
      text,
      isAdminIntervention: true,
    });

    setConversationStatus(conversationId, 'Em mediação');
    updateDraft(conversationId, '');
  };

  return {
    scrollRef,
    sortedConversations,
    adminDrafts,
    getServiceById,
    getMessagesByConversationId,
    setConversationStatus,
    updateDraft,
    sendIntervention,
  };
}
