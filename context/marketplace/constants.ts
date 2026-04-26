import { UserSettings } from '@/context/marketplace/types';

export function roundToSingleDecimal(value: number) {
  return Math.round(value * 10) / 10;
}

export const initialUserSettings: UserSettings = {
  name: 'Giordano Berwig',
  avatarUri: null,
  email: 'giordano.berwig@email.com',
  phone: '(47) 99999-1122',
  cpf: '123.456.789-10',
  rg: '47.654.321-0',
  state: 'SC',
  city: 'Joinville',
  role: 'Contratador',
  memberSince: 'abril de 2026',
  notifications: {
    chat: true,
    mediation: true,
    promotions: false,
    emailSummary: true,
  },
  paymentMethods: [
    {
      id: 'pm-1',
      brand: 'Visa',
      number: '5234 8890 1122 1287',
      last4: '1287',
      expiry: '12/29',
      cvv: '762',
      holder: 'Giordano Berwig',
    },
  ],
  verificationStatus: 'Não verificado',
  verificationDocuments: [],
};
