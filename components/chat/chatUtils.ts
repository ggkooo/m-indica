import { ParticipantRole } from '@/data/mockData';

export const CURRENT_USER_NAME = 'Giordano Berwig';
export const CURRENT_USER_ROLE: ParticipantRole = 'Contratador';

export function formatChatDateTime(isoDate: string) {
  return new Date(isoDate).toLocaleString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}
