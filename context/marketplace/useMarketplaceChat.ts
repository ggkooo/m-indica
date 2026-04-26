import { useCallback, useState } from 'react';

import {
  initialChatConversations,
  initialChatMessages,
  ConversationStatus,
} from '@/data/mockData';
import {
  CreateChatMessageInput,
  OpenConversationInput,
  ServiceWithProvider,
} from '@/context/marketplace/types';

export function useMarketplaceChat(services: ServiceWithProvider[]) {
  const [conversations, setConversations] = useState(initialChatConversations);
  const [messages, setMessages] = useState(initialChatMessages);

  const getConversationByServiceId = useCallback(
    (serviceId: string) => {
      return conversations.find((conversation) => conversation.serviceId === serviceId);
    },
    [conversations]
  );

  const getMessagesByConversationId = useCallback(
    (conversationId: string) => {
      return messages
        .filter((message) => message.conversationId === conversationId)
        .sort((a, b) => +new Date(a.createdAt) - +new Date(b.createdAt));
    },
    [messages]
  );

  const openConversation = useCallback(
    (input: OpenConversationInput) => {
      const existing = conversations.find(
        (conversation) => conversation.serviceId === input.serviceId
      );
      if (existing) {
        return existing;
      }

      const service = services.find((item) => item.id === input.serviceId);
      if (!service) {
        return undefined;
      }

      const now = new Date().toISOString();
      const nextConversation = {
        id: `c-${Date.now()}`,
        serviceId: service.id,
        providerId: service.providerId,
        providerName: service.providerName,
        contractorName: input.contractorName.trim(),
        status: 'Aberto' as const,
        createdAt: now,
        updatedAt: now,
        lastMessageAt: now,
      };

      setConversations((prev) => [nextConversation, ...prev]);
      return nextConversation;
    },
    [conversations, services]
  );

  const sendChatMessage = useCallback(
    (input: CreateChatMessageInput) => {
      const cleanText = input.text.trim();
      const cleanSender = input.senderName.trim();

      if ((!cleanText && !input.attachment) || !cleanSender) {
        return;
      }

      const conversationExists = conversations.some(
        (conversation) => conversation.id === input.conversationId
      );

      if (!conversationExists) {
        return;
      }

      const now = new Date().toISOString();
      const nextMessage = {
        id: `m-${Date.now()}`,
        conversationId: input.conversationId,
        senderRole: input.senderRole,
        senderName: cleanSender,
        text: cleanText,
        createdAt: now,
        isAdminIntervention: input.isAdminIntervention,
        attachment: input.attachment,
      };

      setMessages((prev) => [...prev, nextMessage]);
      setConversations((prev) =>
        prev.map((conversation) =>
          conversation.id !== input.conversationId
            ? conversation
            : {
                ...conversation,
                updatedAt: now,
                lastMessageAt: now,
              }
        )
      );
    },
    [conversations]
  );

  const setConversationStatus = useCallback((conversationId: string, status: ConversationStatus) => {
    const now = new Date().toISOString();

    setConversations((prev) =>
      prev.map((conversation) =>
        conversation.id !== conversationId
          ? conversation
          : {
              ...conversation,
              status,
              updatedAt: now,
            }
      )
    );
  }, []);

  return {
    conversations,
    messages,
    getConversationByServiceId,
    getMessagesByConversationId,
    openConversation,
    sendChatMessage,
    setConversationStatus,
  };
}
