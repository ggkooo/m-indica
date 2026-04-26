import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import { useEffect, useRef, useState } from 'react';
import { Alert, Linking, ScrollView } from 'react-native';

import { useMarketplace } from '@/context/MarketplaceContext';
import { useScrollToTopOnFocus } from '@/hooks/useScrollToTopOnFocus';

export function useAccountNotificationsScreen() {
  const { userSettings, updateNotificationSettings } = useMarketplace();
  const isExpoGo = Constants.executionEnvironment === 'storeClient';
  const scrollRef = useRef<ScrollView>(null);

  useScrollToTopOnFocus(scrollRef);

  const [chat, setChat] = useState(userSettings.notifications.chat);
  const [mediation, setMediation] = useState(userSettings.notifications.mediation);
  const [promotions, setPromotions] = useState(userSettings.notifications.promotions);
  const [emailSummary, setEmailSummary] = useState(userSettings.notifications.emailSummary);
  const [pushPermission, setPushPermission] =
    useState<Notifications.PermissionStatus>(Notifications.PermissionStatus.UNDETERMINED);

  useEffect(() => {
    const loadPermission = async () => {
      if (isExpoGo) {
        setPushPermission(Notifications.PermissionStatus.UNDETERMINED);
        setChat(false);
        setMediation(false);
        setPromotions(false);
        updateNotificationSettings({ chat: false, mediation: false, promotions: false });
        return;
      }

      const { status } = await Notifications.getPermissionsAsync();
      setPushPermission(status);

      if (status !== Notifications.PermissionStatus.GRANTED) {
        setChat(false);
        setMediation(false);
        setPromotions(false);
        updateNotificationSettings({ chat: false, mediation: false, promotions: false });
      }
    };

    loadPermission();
  }, [isExpoGo, updateNotificationSettings]);

  const disableAllPush = () => {
    setChat(false);
    setMediation(false);
    setPromotions(false);
    updateNotificationSettings({ chat: false, mediation: false, promotions: false });
  };

  const ensurePushPermission = async () => {
    if (isExpoGo) {
      Alert.alert(
        'Use um development build',
        'No Expo Go, notificações remotas não têm suporte completo. Gere um development build para habilitar este recurso.'
      );
      return false;
    }

    const current = await Notifications.getPermissionsAsync();

    if (current.status === Notifications.PermissionStatus.GRANTED) {
      setPushPermission(Notifications.PermissionStatus.GRANTED);
      return true;
    }

    const requested = await Notifications.requestPermissionsAsync();
    setPushPermission(requested.status);

    if (requested.status === Notifications.PermissionStatus.GRANTED) {
      return true;
    }

    disableAllPush();
    Alert.alert(
      'Permissão negada',
      'As notificações do celular foram desativadas. Você ainda pode manter apenas as notificações por e-mail.',
      [
        { text: 'Agora não', style: 'cancel' },
        { text: 'Abrir ajustes', onPress: () => Linking.openSettings() },
      ]
    );

    return false;
  };

  const handlePushToggle = async (next: boolean, setter: (value: boolean) => void) => {
    if (!next) {
      setter(false);
      return;
    }

    const granted = await ensurePushPermission();
    if (granted) {
      setter(true);
    }
  };

  const handleSave = () => {
    const pushAllowed = pushPermission === Notifications.PermissionStatus.GRANTED;

    updateNotificationSettings({
      chat: pushAllowed ? chat : false,
      mediation: pushAllowed ? mediation : false,
      promotions: pushAllowed ? promotions : false,
      emailSummary,
    });

    Alert.alert('Preferências salvas', 'Suas configurações de notificações foram atualizadas.');
  };

  return {
    scrollRef,
    userSettings,
    isExpoGo,
    chat,
    mediation,
    promotions,
    emailSummary,
    pushPermission,
    setEmailSummary,
    handlePushToggle,
    setChat,
    setMediation,
    setPromotions,
    handleSave,
  };
}
