import { useCallback, useState } from 'react';

import { initialUserSettings } from '@/context/marketplace/constants';
import {
    PaymentMethod,
    UserNotificationSettings,
    UserSettings,
    VerificationStatus,
} from '@/context/marketplace/types';

export function useMarketplaceUserSettings() {
  const [userSettings, setUserSettings] = useState(initialUserSettings);

  const updateUserProfile = useCallback(
    (
      input: Partial<
        Pick<UserSettings, 'name' | 'avatarUri' | 'email' | 'phone' | 'cpf' | 'rg' | 'state' | 'city'>
      >
    ) => {
      setUserSettings((prev) => ({ ...prev, ...input }));
    },
    []
  );

  const updateNotificationSettings = useCallback((input: Partial<UserNotificationSettings>) => {
    setUserSettings((prev) => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        ...input,
      },
    }));
  }, []);

  const addPaymentMethod = useCallback((input: Omit<PaymentMethod, 'id'>) => {
    const numberDigits = input.number.replace(/\D/g, '').slice(-16).padStart(16, '0');
    const safeNumber = numberDigits.replace(/(\d{4})(?=\d)/g, '$1 ').trim();
    const safeLast4 = numberDigits.slice(-4);
    const safeCvv = input.cvv.replace(/\D/g, '').slice(0, 4).padEnd(3, '0');
    const expiryDigits = input.expiry.replace(/\D/g, '').slice(0, 4);
    const safeExpiry =
      expiryDigits.length >= 4
        ? `${expiryDigits.slice(0, 2)}/${expiryDigits.slice(2, 4)}`
        : '12/30';

    setUserSettings((prev) => ({
      ...prev,
      paymentMethods: [
        {
          ...input,
          number: safeNumber,
          last4: safeLast4,
          expiry: safeExpiry,
          cvv: safeCvv,
          id: `pm-${Date.now()}`,
        },
        ...prev.paymentMethods,
      ],
    }));
  }, []);

  const removePaymentMethod = useCallback((paymentMethodId: string) => {
    setUserSettings((prev) => ({
      ...prev,
      paymentMethods: prev.paymentMethods.filter((method) => method.id !== paymentMethodId),
    }));
  }, []);

  const submitVerificationDocument = useCallback(
    (input: {
      type: UserSettings['verificationDocuments'][number]['type'];
      name: string;
      uri: string;
      mimeType?: string;
    }) => {
      const nextDocument = {
        id: `vd-${Date.now()}`,
        type: input.type,
        name: input.name,
        uri: input.uri,
        mimeType: input.mimeType,
        submittedAt: new Date().toISOString(),
      };

      setUserSettings((prev) => ({
        ...prev,
        verificationStatus: 'Em análise',
        verificationDocuments: [nextDocument, ...prev.verificationDocuments],
      }));
    },
    []
  );

  const setVerificationStatus = useCallback((status: VerificationStatus) => {
    setUserSettings((prev) => ({
      ...prev,
      verificationStatus: status,
    }));
  }, []);

  return {
    userSettings,
    updateUserProfile,
    updateNotificationSettings,
    addPaymentMethod,
    removePaymentMethod,
    submitVerificationDocument,
    setVerificationStatus,
  };
}
