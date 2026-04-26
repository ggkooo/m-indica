import { createContext, PropsWithChildren, useContext, useMemo } from 'react';

import {
    MarketplaceContextData,
    VerificationDocumentType,
    VerificationStatus,
} from '@/context/marketplace/types';
import { useMarketplaceCatalog } from '@/context/marketplace/useMarketplaceCatalog';
import { useMarketplaceChat } from '@/context/marketplace/useMarketplaceChat';
import { useMarketplaceUserSettings } from '@/context/marketplace/useMarketplaceUserSettings';

const MarketplaceContext = createContext<MarketplaceContextData | null>(null);

export type { VerificationDocumentType, VerificationStatus };

export function MarketplaceProvider({ children }: PropsWithChildren) {
  const catalog = useMarketplaceCatalog();
  const chat = useMarketplaceChat(catalog.services);
  const userSettingsState = useMarketplaceUserSettings();

  const value = useMemo<MarketplaceContextData>(
    () => ({
      services: catalog.services,
      providersList: catalog.providersList,
      categories: catalog.categories,
      reviews: catalog.reviews,
      conversations: chat.conversations,
      messages: chat.messages,
      getProviderById: catalog.getProviderById,
      getServicesByProviderId: catalog.getServicesByProviderId,
      getServiceById: catalog.getServiceById,
      getReviewsByServiceId: catalog.getReviewsByServiceId,
      getAverageRatingByServiceId: catalog.getAverageRatingByServiceId,
      addReview: catalog.addReview,
      getConversationByServiceId: chat.getConversationByServiceId,
      getMessagesByConversationId: chat.getMessagesByConversationId,
      openConversation: chat.openConversation,
      sendChatMessage: chat.sendChatMessage,
      setConversationStatus: chat.setConversationStatus,
      userSettings: userSettingsState.userSettings,
      updateUserProfile: userSettingsState.updateUserProfile,
      updateNotificationSettings: userSettingsState.updateNotificationSettings,
      addPaymentMethod: userSettingsState.addPaymentMethod,
      removePaymentMethod: userSettingsState.removePaymentMethod,
      submitVerificationDocument: userSettingsState.submitVerificationDocument,
      setVerificationStatus: userSettingsState.setVerificationStatus,
    }),
    [catalog, chat, userSettingsState]
  );

  return <MarketplaceContext.Provider value={value}>{children}</MarketplaceContext.Provider>;
}

export function useMarketplace() {
  const context = useContext(MarketplaceContext);
  if (!context) {
    throw new Error('useMarketplace must be used inside MarketplaceProvider.');
  }

  return context;
}
