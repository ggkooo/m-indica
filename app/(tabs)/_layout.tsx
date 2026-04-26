import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function TabsLayout() {
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        animation: 'fade',
        sceneStyle: {
          paddingTop: insets.top,
        },
        tabBarStyle: {
          backgroundColor: '#ffffff',
          borderTopColor: '#e0e6ee',
          borderTopLeftRadius: 18,
          borderTopRightRadius: 18,
          height: 68,
          paddingTop: 11,
          paddingBottom: 11,
          overflow: 'hidden',
        },
        tabBarActiveTintColor: '#123f73',
        tabBarInactiveTintColor: '#7a8ca3',
        tabBarShowLabel: false,
        tabBarIconStyle: {
          marginTop: 0,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '700',
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Início',
          tabBarIcon: ({ color }) => (
            <Ionicons name="home-outline" color={color} size={22} />
          ),
        }}
      />

      <Tabs.Screen
        name="chats"
        options={{
          title: 'Chats',
          tabBarIcon: ({ color }) => (
            <Ionicons name="chatbubble-ellipses-outline" color={color} size={22} />
          ),
        }}
      />

      <Tabs.Screen
        name="account"
        options={{
          title: 'Conta',
          tabBarIcon: ({ color }) => (
            <Ionicons name="person-outline" color={color} size={22} />
          ),
        }}
      />
    </Tabs>
  );
}
