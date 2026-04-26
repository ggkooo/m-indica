export type ServiceCategory =
  | 'Assentamento'
  | 'Acabamento'
  | 'Elétrica'
  | 'Hidráulica'
  | 'Pintura'
  | 'Marcenaria';

export type CategoryPalette = {
  background: string;
  border: string;
  text: string;
};

export type Service = {
  id: string;
  title: string;
  category: ServiceCategory;
  description: string;
  basePriceFrom: number;
};

export type Provider = {
  id: string;
  name: string;
  profession: string;
  city: string;
  yearsExperience: number;
  avatarUrl: string;
  bio: string;
  services: Service[];
};

export type Review = {
  id: string;
  serviceId: string;
  contractorName: string;
  rating: number;
  comment: string;
  photoUrls: string[];
  createdAt: string;
};

export type ParticipantRole = 'Contratador' | 'Prestador' | 'Administrador';

export type ConversationStatus = 'Aberto' | 'Em mediação' | 'Finalizado';

export type ChatConversation = {
  id: string;
  serviceId: string;
  providerId: string;
  providerName: string;
  contractorName: string;
  status: ConversationStatus;
  createdAt: string;
  updatedAt: string;
  lastMessageAt: string;
};

export type ChatAttachment = {
  uri: string;
  type: 'image' | 'video' | 'document';
  name: string;
  mimeType?: string;
};

export type ChatMessage = {
  id: string;
  conversationId: string;
  senderRole: ParticipantRole;
  senderName: string;
  text: string;
  createdAt: string;
  isAdminIntervention?: boolean;
  attachment?: ChatAttachment;
};
