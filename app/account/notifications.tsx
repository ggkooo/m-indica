import * as Notifications from 'expo-notifications';
import { ScrollView, Text, View } from 'react-native';

import { NotificationToggleRow } from '@/components/account/notifications/NotificationToggleRow';
import { notificationsStyles } from '@/components/account/notifications/notificationsStyles';
import { AnimatedStaggerItem } from '@/components/profile/AnimatedStaggerItem';
import { ScalePressable } from '@/components/profile/ScalePressable';
import { UserAvatar } from '@/components/profile/UserAvatar';
import { useAccountNotificationsScreen } from '@/hooks/useAccountNotificationsScreen';

export default function NotificacoesScreen() {
  const {
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
  } = useAccountNotificationsScreen();

  return (
    <ScrollView
      ref={scrollRef}
      style={notificationsStyles.screen}
      contentContainerStyle={notificationsStyles.content}
    >
      <AnimatedStaggerItem index={0} style={notificationsStyles.heroRow}>
        <View style={notificationsStyles.heroTopRow}>
          <Text style={notificationsStyles.heroEyebrow}>Perfil</Text>
          <UserAvatar name={userSettings.name} avatarUri={userSettings.avatarUri} size={40} />
        </View>
        <Text style={notificationsStyles.heroTitle}>Notificações</Text>
        <Text style={notificationsStyles.heroSubtitle}>
          Controle exatamente como e quando você quer ser avisado.
        </Text>
      </AnimatedStaggerItem>

      <AnimatedStaggerItem index={1} style={notificationsStyles.card}>
        <Text style={notificationsStyles.title}>Canais de comunicação</Text>
        <Text style={notificationsStyles.subtitle}>
          Escolha os alertas mais importantes para sua rotina.
        </Text>

        <View
          style={[
            notificationsStyles.permissionBadge,
            pushPermission === Notifications.PermissionStatus.GRANTED
              ? notificationsStyles.permissionGranted
              : notificationsStyles.permissionDenied,
          ]}
        >
          <Text style={notificationsStyles.permissionText}>
            {isExpoGo
              ? 'Expo Go: push remoto indisponível'
              : pushPermission === Notifications.PermissionStatus.GRANTED
                ? 'Permissão do celular: autorizada'
                : 'Permissão do celular: não autorizada'}
          </Text>
        </View>

        <NotificationToggleRow
          title="Novas mensagens"
          subtitle="Receba alertas ao chegar mensagem no chat"
          value={chat}
          onChange={(next) => handlePushToggle(next, setChat)}
        />

        <NotificationToggleRow
          title="Atualizações de mediação"
          subtitle="Avisos sobre intervenções do administrador"
          value={mediation}
          onChange={(next) => handlePushToggle(next, setMediation)}
        />

        <NotificationToggleRow
          title="Promoções e campanhas"
          subtitle="Ofertas e cupons da plataforma"
          value={promotions}
          onChange={(next) => handlePushToggle(next, setPromotions)}
        />

        <NotificationToggleRow
          title="Resumo por e-mail"
          subtitle="Resumo semanal de atividade (não depende da permissão do celular)"
          value={emailSummary}
          onChange={setEmailSummary}
        />

        <ScalePressable
          style={notificationsStyles.saveButton}
          onPress={handleSave}
          haptic="medium"
        >
          <Text style={notificationsStyles.saveButtonText}>Salvar preferências</Text>
        </ScalePressable>
      </AnimatedStaggerItem>
    </ScrollView>
  );
}
