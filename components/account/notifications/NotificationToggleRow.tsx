import { StyleSheet, Switch, Text, View } from 'react-native';

type NotificationToggleRowProps = {
  title: string;
  subtitle: string;
  value: boolean;
  onChange: (next: boolean) => void;
};

export function NotificationToggleRow({
  title,
  subtitle,
  value,
  onChange,
}: NotificationToggleRowProps) {
  return (
    <View style={styles.row}>
      <View style={styles.info}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>
      <Switch value={value} onValueChange={onChange} trackColor={{ true: '#84b4e5', false: '#cbd7e6' }} />
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
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
  info: {
    flex: 1,
    gap: 3,
  },
  title: {
    color: '#17395f',
    fontWeight: '700',
    fontSize: 14,
  },
  subtitle: {
    color: '#65809d',
    fontSize: 12,
    lineHeight: 17,
  },
});
