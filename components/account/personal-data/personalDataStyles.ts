import { StyleSheet } from 'react-native';

import { profileShadow, profileTheme } from '@/theme/profileTheme';

export const personalDataStyles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: profileTheme.colors.background,
  },
  content: {
    padding: 16,
    paddingBottom: 34,
    gap: 14,
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
  avatarRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 10,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#e1e8f2',
    backgroundColor: '#f8fbff',
  },
  avatarPreviewWrap: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 1,
    borderColor: '#c9d9ec',
    backgroundColor: '#eaf2fc',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  avatarPreviewImage: {
    width: '100%',
    height: '100%',
  },
  avatarPreviewText: {
    color: '#587594',
    fontSize: 11,
    fontWeight: '700',
  },
  avatarActionsWrap: {
    flex: 1,
    gap: 8,
  },
  avatarActionButton: {
    alignSelf: 'flex-start',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#c3d5ea',
    backgroundColor: '#ffffff',
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  avatarActionButtonGhost: {
    borderColor: '#d6deea',
    backgroundColor: '#f6f9fd',
  },
  avatarActionButtonText: {
    color: '#1c4d82',
    fontWeight: '700',
    fontSize: 12,
  },
  avatarActionButtonGhostText: {
    color: '#5f7593',
  },
  fieldWrap: {
    gap: 7,
  },
  label: {
    color: '#355272',
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.7,
  },
  input: {
    borderWidth: 1,
    borderColor: '#d3ddeb',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 15,
    color: '#12263f',
    backgroundColor: '#fafdff',
  },
  inlineSkeletonRow: {
    marginTop: 2,
    flexDirection: 'row',
    gap: 8,
  },
  saveButton: {
    marginTop: 4,
    borderRadius: 14,
    backgroundColor: profileTheme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 13,
  },
  saveButtonDisabled: {
    backgroundColor: profileTheme.colors.primaryMuted,
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: '800',
    fontSize: 14,
  },
});
