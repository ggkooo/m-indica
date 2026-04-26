import { Image, StyleSheet, Text, View } from 'react-native';

type UserAvatarProps = {
  name: string;
  avatarUri?: string | null;
  size?: number;
};

function getInitials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);

  if (!parts.length) {
    return 'US';
  }

  const first = parts[0][0] ?? '';
  const second = parts.length > 1 ? parts[parts.length - 1][0] ?? '' : '';

  return `${first}${second}`.toUpperCase();
}

export function UserAvatar({ name, avatarUri, size = 40 }: UserAvatarProps) {
  const initials = getInitials(name);

  return (
    <View
      style={[
        styles.avatar,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
        },
      ]}
    >
      {avatarUri ? (
        <Image source={{ uri: avatarUri }} style={styles.image} />
      ) : (
        <Text style={[styles.initials, { fontSize: Math.max(11, size * 0.33) }]}>{initials}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  avatar: {
    backgroundColor: '#d7e8fb',
    borderWidth: 1,
    borderColor: '#b6d0ee',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  initials: {
    color: '#19446f',
    fontWeight: '800',
  },
});
