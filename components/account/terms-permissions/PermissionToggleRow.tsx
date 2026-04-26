import { StyleSheet, Switch, Text, View } from 'react-native';

type PermissionToggleRowProps = {
  title: string;
  subtitle: string;
  value: boolean;
  onChange: (next: boolean) => void;
};

export function PermissionToggleRow({
  title,
  subtitle,
  value,
  onChange,
}: PermissionToggleRowProps) {
  return (
    <View style={styles.permissionRow}>
      <View style={styles.permissionInfo}>
        <Text style={styles.permissionTitle}>{title}</Text>
        <Text style={styles.permissionSubtitle}>{subtitle}</Text>
      </View>
      <Switch value={value} onValueChange={onChange} trackColor={{ true: '#84b4e5', false: '#cbd7e6' }} />
    </View>
  );
}

const styles = StyleSheet.create({
  permissionRow: {
    borderWidth: 1,
    borderColor: '#e4ebf4',
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
    backgroundColor: '#fbfdff',
  },
  permissionInfo: {
    flex: 1,
    gap: 3,
  },
  permissionTitle: {
    color: '#17395f',
    fontWeight: '700',
    fontSize: 14,
  },
  permissionSubtitle: {
    color: '#65809d',
    fontSize: 12,
    lineHeight: 17,
  },
});
