import { useRouter } from 'expo-router';
import { useMemo, useRef } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { AnimatedStaggerItem } from '@/components/profile/AnimatedStaggerItem';
import { ScalePressable } from '@/components/profile/ScalePressable';
import { UserAvatar } from '@/components/profile/UserAvatar';
import { useMarketplace } from '@/context/MarketplaceContext';
import { useScrollToTopOnFocus } from '@/hooks/useScrollToTopOnFocus';
import { profileShadow, profileTheme } from '@/theme/profileTheme';

function formatDateTime(isoDate: string) {
  return new Date(isoDate).toLocaleString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

const CURRENT_USER_NAME = 'Giordano Berwig';

export default function ChatsTabScreen() {
  const router = useRouter();
  const { conversations, getServiceById, userSettings } = useMarketplace();
  const scrollRef = useRef<ScrollView>(null);

  useScrollToTopOnFocus(scrollRef);

  const userConversations = useMemo(() => {
    return conversations.filter(
      (conversation) => conversation.contractorName === CURRENT_USER_NAME
    );
  }, [conversations]);

  const sortedConversations = useMemo(() => {
    return [...userConversations].sort(
      (a, b) => +new Date(b.lastMessageAt) - +new Date(a.lastMessageAt)
    );
  }, [userConversations]);

  const activeConversations = useMemo(() => {
    return sortedConversations.filter(
      (conversation) => conversation.status !== 'Finalizado'
    );
  }, [sortedConversations]);

  const closedConversationsCount = useMemo(() => {
    return userConversations.filter(
      (conversation) => conversation.status === 'Finalizado'
    ).length;
  }, [userConversations]);

  const totalActiveMessages = useMemo(() => {
    return activeConversations.reduce(
      (total, conversation) => total + (conversation.status === 'Aberto' ? 1 : 0),
      0
    );
  }, [activeConversations]);

  return (
    <ScrollView ref={scrollRef} style={styles.screen} contentContainerStyle={styles.content}>
      <AnimatedStaggerItem index={0} style={styles.headerWrap}>
        <View style={styles.headerTopRow}>
          <View style={styles.headerTextWrap}>
            <Text style={styles.title}>Meus chats</Text>
            <Text style={styles.subtitle}>
              Acompanhe suas conversas com prestadores, incluindo as já finalizadas.
            </Text>
          </View>
          <UserAvatar name={userSettings.name} avatarUri={userSettings.avatarUri} size={42} />
        </View>
      </AnimatedStaggerItem>

      <AnimatedStaggerItem index={1} style={styles.summaryCard}>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryValue}>{activeConversations.length}</Text>
          <Text style={styles.summaryLabel}>Chats ativos</Text>
        </View>
        <View style={styles.summaryDivider} />
        <View style={styles.summaryItem}>
          <Text style={styles.summaryValue}>{closedConversationsCount}</Text>
          <Text style={styles.summaryLabel}>Chats finalizados</Text>
        </View>
        <View style={styles.summaryDivider} />
        <View style={styles.summaryItem}>
          <Text style={styles.summaryValue}>{totalActiveMessages}</Text>
          <Text style={styles.summaryLabel}>Em aberto</Text>
        </View>
      </AnimatedStaggerItem>

      <ScalePressable
        style={styles.adminButton}
        onPress={() => router.push('/admin/chats' as never)}
        haptic="selection"
      >
        <Text style={styles.adminButtonText}>Abrir painel administrativo</Text>
      </ScalePressable>

      {!userConversations.length && (
        <AnimatedStaggerItem index={2} style={styles.emptyCard}>
          <Text style={styles.emptyTitle}>Nenhuma conversa encontrada</Text>
          <Text style={styles.emptyText}>
            Inicie uma conversa na página de serviço para falar com um prestador.
          </Text>
        </AnimatedStaggerItem>
      )}

      {sortedConversations.map((conversation, index) => {
        const service = getServiceById(conversation.serviceId);

        return (
          <AnimatedStaggerItem key={conversation.id} index={index + 3}>
            <ScalePressable
              style={styles.chatCard}
              haptic="light"
              onPress={() =>
                router.push({ pathname: '/chat/[serviceId]', params: { serviceId: conversation.serviceId } } as never)
              }
            >
              <View style={styles.chatCardTopRow}>
                <Text style={styles.chatTitle}>{service?.title ?? 'Serviço removido'}</Text>
                <View
                  style={[
                    styles.statusBadge,
                    conversation.status === 'Finalizado'
                      ? styles.statusBadgeClosed
                      : conversation.status === 'Em mediação'
                        ? styles.statusBadgeMediation
                        : styles.statusBadgeOpen,
                  ]}
                >
                  <Text
                    style={[
                      styles.statusBadgeText,
                      conversation.status === 'Finalizado'
                        ? styles.statusBadgeTextClosed
                        : conversation.status === 'Em mediação'
                          ? styles.statusBadgeTextMediation
                          : styles.statusBadgeTextOpen,
                    ]}
                  >
                    {conversation.status}
                  </Text>
                </View>
              </View>

              <Text style={styles.chatMeta}>Prestador: {conversation.providerName}</Text>
              <Text style={styles.chatDate}>Última atividade em {formatDateTime(conversation.lastMessageAt)}</Text>
              <Text style={styles.openHint}>
                {conversation.status === 'Finalizado'
                  ? 'Conversa finalizada. Toque para visualizar o histórico.'
                  : 'Toque para abrir a conversa'}
              </Text>
            </ScalePressable>
          </AnimatedStaggerItem>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: profileTheme.colors.background,
  },
  content: {
    padding: 18,
    paddingBottom: 32,
    gap: 14,
  },
  headerWrap: {
    gap: 4,
  },
  headerTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
  },
  headerTextWrap: {
    flex: 1,
    gap: 4,
  },
  title: {
    fontSize: 30,
    fontWeight: '800',
    color: '#12233b',
  },
  subtitle: {
    color: '#506178',
    lineHeight: 20,
  },
  summaryCard: {
    backgroundColor: profileTheme.colors.surface,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#dde5ef',
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    ...profileShadow,
  },
  summaryItem: {
    flex: 1,
    alignItems: 'center',
    gap: 2,
  },
  summaryDivider: {
    width: 1,
    height: '72%',
    backgroundColor: '#e8edf4',
  },
  summaryValue: {
    color: '#123f73',
    fontSize: 18,
    fontWeight: '800',
  },
  summaryLabel: {
    color: '#5f738e',
    fontSize: 12,
    fontWeight: '600',
  },
  adminButton: {
    alignSelf: 'flex-start',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#d2dce9',
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#fff',
  },
  adminButtonText: {
    color: '#31557f',
    fontWeight: '700',
    fontSize: 12,
  },
  emptyCard: {
    backgroundColor: profileTheme.colors.surface,
    borderWidth: 1,
    borderColor: '#dde5ef',
    borderRadius: 12,
    padding: 14,
    gap: 4,
    ...profileShadow,
  },
  emptyTitle: {
    color: '#12233b',
    fontWeight: '700',
    fontSize: 16,
  },
  emptyText: {
    color: '#5f738e',
    lineHeight: 20,
  },
  chatCard: {
    backgroundColor: profileTheme.colors.surface,
    borderWidth: 1,
    borderColor: '#dde5ef',
    borderRadius: 14,
    padding: 14,
    gap: 6,
    ...profileShadow,
  },
  chatCardTopRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 10,
  },
  chatTitle: {
    color: '#12233b',
    fontWeight: '800',
    flex: 1,
  },
  chatMeta: {
    color: '#3b5879',
  },
  statusBadge: {
    borderWidth: 1,
    borderRadius: 999,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  statusBadgeOpen: {
    backgroundColor: '#e9f5ff',
    borderColor: '#bed9f3',
  },
  statusBadgeMediation: {
    backgroundColor: '#fff6e7',
    borderColor: '#f0d6a0',
  },
  statusBadgeClosed: {
    backgroundColor: '#f3f4f6',
    borderColor: '#d5d9df',
  },
  statusBadgeText: {
    fontSize: 10,
    fontWeight: '700',
  },
  statusBadgeTextOpen: {
    color: '#18558e',
  },
  statusBadgeTextMediation: {
    color: '#916116',
  },
  statusBadgeTextClosed: {
    color: '#5f6b7a',
  },
  chatDate: {
    color: '#5f738e',
    fontSize: 12,
  },
  openHint: {
    color: '#31557f',
    fontSize: 12,
    fontWeight: '700',
  },
});
