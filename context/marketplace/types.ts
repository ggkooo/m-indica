import {
    ChatAttachment,
    ChatConversation,
    ChatMessage,
    ConversationStatus,
    Provider,
    Review,
    Service,
    ServiceCategory,
} from '@/data/mockData';

export type ServiceWithProvider = Service & {
  providerId: string;
  providerName: string;
  providerProfession: string;
  providerCity: string;
  providerAvatarUrl: string;
  providerBio: string;
  providerExperience: number;
};

export type ProviderWithMetrics = Provider & {
  categories: ServiceCategory[];
  averageRating: number;
  reviewCount: number;
};

export type CreateReviewInput = {
  serviceId: string;
  contractorName: string;
  rating: number;
  comment: string;
  photoUrls: string[];
};

export type OpenConversationInput = {
  serviceId: string;
  contractorName: string;
};

export type CreateChatMessageInput = {
  conversationId: string;
  senderRole: ChatMessage['senderRole'];
  senderName: string;
  text: string;
  isAdminIntervention?: boolean;
  attachment?: ChatAttachment;
};

export type VerificationDocumentType =
  | 'CNH'
  | 'RG'
  | 'CPF'
  | 'Comprovante de endereço';

export type VerificationStatus = 'Não verificado' | 'Em análise' | 'Aprovado' | 'Rejeitado';

export type UserNotificationSettings = {
  chat: boolean;
  mediation: boolean;
  promotions: boolean;
  emailSummary: boolean;
};

export type PaymentMethod = {
  id: string;
  brand: string;
  number: string;
  last4: string;
  expiry: string;
  cvv: string;
  holder: string;
};

export type VerificationDocument = {
  id: string;
  type: VerificationDocumentType;
  name: string;
  uri: string;
  mimeType?: string;
  submittedAt: string;
};

export type UserSettings = {
  name: string;
  avatarUri: string | null;
  email: string;
  phone: string;
  cpf: string;
  rg: string;
  state: string;
  city: string;
  role: 'Contratador';
  memberSince: string;
  notifications: UserNotificationSettings;
  paymentMethods: PaymentMethod[];
  verificationStatus: VerificationStatus;
  verificationDocuments: VerificationDocument[];
};

export type MarketplaceContextData = {
  services: ServiceWithProvider[];
  providersList: ProviderWithMetrics[];
  categories: ServiceCategory[];
  reviews: Review[];
  conversations: ChatConversation[];
  messages: ChatMessage[];
  getProviderById: (providerId: string) => ProviderWithMetrics | undefined;
  getServicesByProviderId: (providerId: string) => ServiceWithProvider[];
  getServiceById: (serviceId: string) => ServiceWithProvider | undefined;
  getReviewsByServiceId: (serviceId: string) => Review[];
  getAverageRatingByServiceId: (serviceId: string) => number;
  addReview: (input: CreateReviewInput) => void;
  getConversationByServiceId: (serviceId: string) => ChatConversation | undefined;
  getMessagesByConversationId: (conversationId: string) => ChatMessage[];
  openConversation: (input: OpenConversationInput) => ChatConversation | undefined;
  sendChatMessage: (input: CreateChatMessageInput) => void;
  setConversationStatus: (conversationId: string, status: ConversationStatus) => void;
  userSettings: UserSettings;
  updateUserProfile: (
    input: Partial<
      Pick<UserSettings, 'name' | 'avatarUri' | 'email' | 'phone' | 'cpf' | 'rg' | 'state' | 'city'>
    >
  ) => void;
  updateNotificationSettings: (input: Partial<UserNotificationSettings>) => void;
  addPaymentMethod: (input: Omit<PaymentMethod, 'id'>) => void;
  removePaymentMethod: (paymentMethodId: string) => void;
  submitVerificationDocument: (input: {
    type: VerificationDocumentType;
    name: string;
    uri: string;
    mimeType?: string;
  }) => void;
  setVerificationStatus: (status: VerificationStatus) => void;
};
