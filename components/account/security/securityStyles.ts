import { StyleSheet } from 'react-native';

import { profileShadow, profileTheme } from '@/theme/profileTheme';

export const securityStyles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: profileTheme.colors.background,
  },
  content: {
    padding: 16,
    gap: 14,
    paddingBottom: 30,
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
  statusBadge: {
    borderRadius: 999,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 6,
    alignSelf: 'flex-start',
  },
  statusDefault: {
    borderColor: '#ced8e5',
    backgroundColor: '#eef3f9',
  },
  statusPending: {
    borderColor: '#f0d6a0',
    backgroundColor: '#fff6e7',
  },
  statusApproved: {
    borderColor: '#bde5ca',
    backgroundColor: '#eaf8ef',
  },
  statusRejected: {
    borderColor: '#efc3c3',
    backgroundColor: '#fff1f1',
  },
  statusText: {
    color: '#334f6c',
    fontSize: 12,
    fontWeight: '700',
  },
  primaryButton: {
    borderRadius: 14,
    backgroundColor: profileTheme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 13,
  },
  primaryButtonDisabled: {
    backgroundColor: profileTheme.colors.primaryMuted,
  },
  primaryButtonText: {
    color: '#fff',
    fontWeight: '800',
    fontSize: 14,
  },
  helperText: {
    color: '#5f7593',
    lineHeight: 18,
    fontSize: 12,
  },
  sectionTitle: {
    color: '#12263f',
    fontSize: 16,
    fontWeight: '800',
  },
  emptyText: {
    color: '#5f7593',
  },
  docRow: {
    borderWidth: 1,
    borderColor: '#e4ebf4',
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: '#fbfdff',
  },
  docIconWrap: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#e8f1fc',
    alignItems: 'center',
    justifyContent: 'center',
  },
  docInfo: {
    flex: 1,
    gap: 2,
  },
  docType: {
    color: '#1b4067',
    fontWeight: '700',
    fontSize: 13,
  },
  docName: {
    color: '#4e6d8b',
    fontSize: 12,
  },
  docDate: {
    color: '#6a809c',
    fontSize: 11,
  },
  simulationRow: {
    flexDirection: 'row',
    gap: 10,
  },
  simButton: {
    flex: 1,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 11,
  },
  simApproved: {
    borderColor: '#bde5ca',
    backgroundColor: '#eaf8ef',
  },
  simRejected: {
    borderColor: '#efc3c3',
    backgroundColor: '#fff1f1',
  },
  simButtonText: {
    fontWeight: '700',
    fontSize: 12,
  },
  simApprovedText: {
    color: '#2f6a43',
  },
  simRejectedText: {
    color: '#9a3d3d',
  },
});
