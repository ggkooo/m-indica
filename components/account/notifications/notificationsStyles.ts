import { StyleSheet } from 'react-native';

import { profileShadow, profileTheme } from '@/theme/profileTheme';

export const notificationsStyles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: profileTheme.colors.background,
  },
  content: {
    padding: 16,
    gap: 14,
    paddingBottom: 32,
  },
  heroRow: {
    gap: 2,
  },
  heroTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
    fontSize: 27,
    fontWeight: '800',
  },
  heroSubtitle: {
    color: '#5f7593',
    fontSize: 14,
    lineHeight: 20,
  },
  card: {
    borderWidth: 1,
    borderColor: profileTheme.colors.border,
    borderRadius: 16,
    backgroundColor: profileTheme.colors.surface,
    padding: 16,
    gap: 12,
    ...profileShadow,
  },
  title: {
    color: '#12263f',
    fontSize: 21,
    fontWeight: '800',
  },
  subtitle: {
    color: '#5f7593',
    lineHeight: 20,
  },
  permissionBadge: {
    borderRadius: 999,
    borderWidth: 1,
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  permissionGranted: {
    borderColor: '#9dd5b8',
    backgroundColor: '#effcf4',
  },
  permissionDenied: {
    borderColor: '#e5c3c3',
    backgroundColor: '#fff5f5',
  },
  permissionText: {
    color: '#3d4f63',
    fontSize: 12,
    fontWeight: '700',
  },
  saveButton: {
    marginTop: 6,
    borderRadius: 14,
    backgroundColor: profileTheme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 13,
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: '800',
    fontSize: 14,
  },
});
