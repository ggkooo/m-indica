import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

import { MarketplaceProvider } from '@/context/MarketplaceContext';

export default function RootLayout() {
  return (
    <MarketplaceProvider>
      <Stack
        screenOptions={{
          animation: 'slide_from_right',
          gestureEnabled: true,
          headerStyle: {
            backgroundColor: '#ffffff',
          },
          headerTintColor: '#12233b',
          headerBackButtonDisplayMode: 'minimal',
          headerTitleStyle: {
            fontWeight: '700',
          },
          headerShadowVisible: false,
          contentStyle: {
            backgroundColor: '#f3f5f8',
          },
        }}
      >
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="provider/[id]" options={{ title: 'Perfil do Prestador' }} />
        <Stack.Screen name="service/[id]" options={{ title: 'Detalhes do Serviço' }} />
        <Stack.Screen name="chat/[serviceId]" options={{ title: 'Chat Interno' }} />
        <Stack.Screen name="admin/chats" options={{ title: 'Painel Admin' }} />
        <Stack.Screen name="account/personal-data" options={{ title: 'Dados Pessoais' }} />
        <Stack.Screen name="account/notifications" options={{ title: 'Notificações' }} />
        <Stack.Screen name="account/payment" options={{ title: 'Pagamento' }} />
        <Stack.Screen name="account/security" options={{ title: 'Segurança da Conta' }} />
        <Stack.Screen name="account/terms-permissions" options={{ title: 'Termos e Permissões' }} />
      </Stack>
      <StatusBar style="auto" />
    </MarketplaceProvider>
  );
}
