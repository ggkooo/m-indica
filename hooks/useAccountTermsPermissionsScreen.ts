import * as Location from 'expo-location';
import { useEffect, useRef, useState } from 'react';
import { Alert, Linking, ScrollView } from 'react-native';

import { useMarketplace } from '@/context/MarketplaceContext';
import { useScrollToTopOnFocus } from '@/hooks/useScrollToTopOnFocus';

export function useAccountTermsPermissionsScreen() {
  const { userSettings } = useMarketplace();
  const [shareProfile, setShareProfile] = useState(true);
  const [allowAnalytics, setAllowAnalytics] = useState(true);
  const [allowLocation, setAllowLocation] = useState(false);
  const scrollRef = useRef<ScrollView>(null);

  useScrollToTopOnFocus(scrollRef);

  useEffect(() => {
    const syncPermission = async () => {
      const current = await Location.getForegroundPermissionsAsync();
      setAllowLocation(current.status === 'granted');
    };

    syncPermission();
  }, []);

  const handleLocationToggle = async (next: boolean) => {
    if (!next) {
      setAllowLocation(false);
      return;
    }

    const current = await Location.getForegroundPermissionsAsync();
    if (current.status === 'granted') {
      setAllowLocation(true);
      return;
    }

    const requested = await Location.requestForegroundPermissionsAsync();
    if (requested.status === 'granted') {
      setAllowLocation(true);
      return;
    }

    setAllowLocation(false);
    Alert.alert(
      'Permissão negada',
      'A localização foi negada. O recurso permanecerá desabilitado até você autorizar.',
      [
        { text: 'Agora não', style: 'cancel' },
        { text: 'Abrir ajustes', onPress: () => Linking.openSettings() },
      ]
    );
  };

  return {
    userSettings,
    scrollRef,
    shareProfile,
    allowAnalytics,
    allowLocation,
    setShareProfile,
    setAllowAnalytics,
    handleLocationToggle,
  };
}
