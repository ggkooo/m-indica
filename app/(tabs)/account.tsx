import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useMemo, useRef } from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';

import { AnimatedStaggerItem } from '@/components/profile/AnimatedStaggerItem';
import { ScalePressable } from '@/components/profile/ScalePressable';
import { useMarketplace } from '@/context/MarketplaceContext';
import { useScrollToTopOnFocus } from '@/hooks/useScrollToTopOnFocus';
import { profileShadow, profileTheme } from '@/theme/profileTheme';

const CURRENT_USER_NAME = 'Giordano Berwig';

type ProfileActionRowProps = {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  subtitle: string;
  onPress: () => void;
};

function ProfileActionRow({ icon, title, subtitle, onPress }: ProfileActionRowProps) {
  return (
    <ScalePressable style={styles.actionRow} onPress={onPress} haptic="selection">
      <View style={styles.actionRowContent}>
        <View style={styles.actionIconWrap}>
          <Ionicons name={icon} size={18} color="#23476f" />
        </View>
        <View style={styles.actionTextWrap}>
          <Text style={styles.actionTitle}>{title}</Text>
          <Text style={styles.actionSubtitle}>{subtitle}</Text>
        </View>
        <Ionicons name="chevron-forward" size={18} color="#8ea0b6" />
      </View>
    </ScalePressable>
  );
}

export default function AccountTabScreen() {
  const router = useRouter();
  const { conversations, messages, reviews, userSettings } = useMarketplace();
  const scrollRef = useRef<ScrollView>(null);

  useScrollToTopOnFocus(scrollRef);

  const myConversations = useMemo(() => {
    return conversations.filter((conversation) => conversation.contractorName === CURRENT_USER_NAME);
  }, [conversations]);

  const myConversationIds = useMemo(() => {
    return new Set(myConversations.map((conversation) => conversation.id));
  }, [myConversations]);

  const myMessages = useMemo(() => {
    return messages.filter((message) =>
      myConversationIds.has(message.conversationId) &&
      message.senderName === CURRENT_USER_NAME
    );
  }, [messages, myConversationIds]);

  const stats = useMemo(() => {
    const active = myConversations.filter((conversation) => conversation.status === 'Aberto').length;
    const mediation = myConversations.filter((conversation) => conversation.status === 'Em mediação').length;
    const finished = myConversations.filter((conversation) => conversation.status === 'Finalizado').length;
    const attachments = myMessages.filter((message) => !!message.attachment).length;

    return {
      active,
      mediation,
      finished,
      attachments,
    };
  }, [myConversations, myMessages]);

  const accountLevel = stats.finished >= 2 ? 'Cliente frequente' : 'Cliente padrão';
  const accountBadge = stats.mediation > 0 ? 'Atenção pendente' : 'Conta em dia';
  const initials = useMemo(() => {
    const parts = userSettings.name.trim().split(/\s+/).filter(Boolean);
    if (!parts.length) {
      return 'US';
    }

    const first = parts[0][0] ?? '';
    const second = parts.length > 1 ? parts[parts.length - 1][0] ?? '' : '';
    return `${first}${second}`.toUpperCase();
  }, [userSettings.name]);

  const statCards = [
    { label: 'Abertos', value: stats.active },
    { label: 'Mediação', value: stats.mediation },
    { label: 'Finalizados', value: stats.finished },
    { label: 'Anexos', value: stats.attachments },
  ];

  return (
    <ScrollView ref={scrollRef} style={styles.screen} contentContainerStyle={styles.content}>
      <AnimatedStaggerItem index={0} style={styles.heroRow}>
        <Text style={styles.heroEyebrow}>Perfil</Text>
        <Text style={styles.heroTitle}>Conta e preferências</Text>
        <Text style={styles.heroSubtitle}>Tudo da sua conta em um espaço mais claro, rápido e seguro.</Text>
      </AnimatedStaggerItem>

      <AnimatedStaggerItem index={1} style={styles.profileCard}>
        <View style={styles.profileGlow} />
        <View style={styles.profileTopRow}>
          <View style={styles.avatarWrap}>
            {userSettings.avatarUri ? (
              <Image source={{ uri: userSettings.avatarUri }} style={styles.avatarImage} />
            ) : (
              <Text style={styles.avatarText}>{initials}</Text>
            )}
          </View>

          <View style={styles.profileInfoWrap}>
            <Text style={styles.profileName}>{userSettings.name}</Text>
            <Text style={styles.profileMeta}>{userSettings.role} • {userSettings.city}, {userSettings.state}</Text>
            <Text style={styles.profileMeta}>Membro desde {userSettings.memberSince}</Text>
          </View>
        </View>

        <View style={styles.badgesRow}>
          <View style={styles.levelBadge}>
            <Text style={styles.levelBadgeText}>{accountLevel}</Text>
          </View>

          <View style={[styles.levelBadge, stats.mediation > 0 ? styles.warnBadge : styles.okBadge]}>
            <Text style={[styles.levelBadgeText, stats.mediation > 0 ? styles.warnBadgeText : styles.okBadgeText]}>
              {accountBadge}
            </Text>
          </View>
        </View>
      </AnimatedStaggerItem>

      <AnimatedStaggerItem index={2} style={styles.statsGrid}>
        {statCards.map((item) => (
          <View key={item.label} style={styles.statCard}>
            <Text style={styles.statValue}>{item.value}</Text>
            <Text style={styles.statLabel}>{item.label}</Text>
          </View>
        ))}
      </AnimatedStaggerItem>

      <AnimatedStaggerItem index={3} style={styles.sectionCard}>
        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionTitle}>Conta e perfil</Text>
          <Text style={styles.sectionHint}>Principal</Text>
        </View>
        <ProfileActionRow
          icon="person-circle-outline"
          title="Dados pessoais"
          subtitle="Nome, contato e dados de identificação"
          onPress={() => router.push('/account/personal-data')}
        />
        <ProfileActionRow
          icon="notifications-outline"
          title="Notificações"
          subtitle="Alertas de chat, mediações e novidades"
          onPress={() => router.push('/account/notifications')}
        />
        <ProfileActionRow
          icon="card-outline"
          title="Pagamento"
          subtitle="Métodos salvos e histórico financeiro"
          onPress={() => router.push('/account/payment')}
        />
      </AnimatedStaggerItem>

      <AnimatedStaggerItem index={4} style={styles.sectionCard}>
        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionTitle}>Privacidade e segurança</Text>
          <Text style={styles.sectionHint}>Proteção</Text>
        </View>
        <ProfileActionRow
          icon="shield-checkmark-outline"
          title="Segurança da conta"
          subtitle="Senha, sessões ativas e validações"
          onPress={() => router.push('/account/security')}
        />
        <ProfileActionRow
          icon="document-text-outline"
          title="Termos e permissões"
          subtitle="Preferências de uso e consentimento"
          onPress={() => router.push('/account/terms-permissions')}
        />
      </AnimatedStaggerItem>

      <AnimatedStaggerItem index={5} style={styles.sectionCard}>
        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionTitle}>Resumo de atividade</Text>
          <Text style={styles.sectionHint}>Hoje</Text>
        </View>

        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Mensagens enviadas</Text>
          <Text style={styles.summaryValue}>{myMessages.length}</Text>
        </View>

        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Avaliações publicadas</Text>
          <Text style={styles.summaryValue}>{reviews.length}</Text>
        </View>

        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Último acesso</Text>
          <Text style={styles.summaryValue}>Hoje, 18:42</Text>
        </View>
      </AnimatedStaggerItem>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: profileTheme.colors.background,
  },
  content: {
    padding: 16,
    paddingBottom: 36,
    gap: 16,
  },
  heroRow: {
    gap: 2,
  },
  heroEyebrow: {
    color: '#5f7593',
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  heroTitle: {
    color: '#12263f',
    fontSize: 28,
    fontWeight: '800',
  },
  heroSubtitle: {
    color: '#5f7593',
    fontSize: 14,
    lineHeight: 20,
  },
  profileCard: {
    overflow: 'hidden',
    backgroundColor: profileTheme.colors.surface,
    borderWidth: 1,
    borderColor: profileTheme.colors.border,
    borderRadius: 18,
    padding: 16,
    gap: 14,
    ...profileShadow,
  },
  profileGlow: {
    position: 'absolute',
    top: -30,
    right: -10,
    width: 140,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#e9f2ff',
  },
  profileTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  avatarWrap: {
    width: 62,
    height: 62,
    borderRadius: 31,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#d7e8fb',
    borderWidth: 1,
    borderColor: '#b6d0ee',
    overflow: 'hidden',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
  },
  avatarText: {
    color: '#19446f',
    fontSize: 20,
    fontWeight: '800',
  },
  profileInfoWrap: {
    flex: 1,
    gap: 3,
  },
  profileName: {
    color: '#12263f',
    fontSize: 22,
    fontWeight: '800',
  },
  profileMeta: {
    color: '#5f7593',
    fontSize: 13,
  },
  badgesRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: 10,
  },
  levelBadge: {
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#c6d6ea',
    backgroundColor: '#eef4fc',
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  levelBadgeText: {
    color: '#2f5176',
    fontSize: 12,
    fontWeight: '700',
  },
  warnBadge: {
    borderColor: '#f0d6a0',
    backgroundColor: '#fff7ea',
  },
  warnBadgeText: {
    color: '#8b5f1a',
  },
  okBadge: {
    borderColor: '#bde5ca',
    backgroundColor: '#eaf8ef',
  },
  okBadgeText: {
    color: '#2f6a43',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  statCard: {
    width: '48.5%',
    backgroundColor: profileTheme.colors.surface,
    borderWidth: 1,
    borderColor: profileTheme.colors.border,
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
  },
  statValue: {
    color: '#173e69',
    fontSize: 22,
    fontWeight: '800',
  },
  statLabel: {
    color: '#5f7593',
    fontSize: 12,
    fontWeight: '700',
  },
  sectionCard: {
    backgroundColor: profileTheme.colors.surface,
    borderWidth: 1,
    borderColor: profileTheme.colors.border,
    borderRadius: 16,
    padding: 14,
    gap: 10,
    ...profileShadow,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sectionTitle: {
    color: '#12263f',
    fontSize: 16,
    fontWeight: '800',
  },
  sectionHint: {
    color: '#6f87a3',
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  actionRow: {
    borderWidth: 1,
    borderColor: '#e3ebf4',
    borderRadius: 14,
    backgroundColor: '#fcfdff',
  },
  actionRowContent: {
    paddingHorizontal: 12,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  actionIconWrap: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#e8f1fc',
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionTextWrap: {
    flex: 1,
    gap: 1,
  },
  actionTitle: {
    color: '#17395f',
    fontWeight: '700',
    fontSize: 14,
  },
  actionSubtitle: {
    color: '#67819e',
    fontSize: 12,
  },
  summaryRow: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e8eef6',
    backgroundColor: '#fbfdff',
    paddingHorizontal: 11,
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  summaryLabel: {
    color: '#607a97',
    fontSize: 13,
  },
  summaryValue: {
    color: '#1d426a',
    fontSize: 13,
    fontWeight: '700',
  },
});
