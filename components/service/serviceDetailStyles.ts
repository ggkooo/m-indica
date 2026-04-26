import { StyleSheet } from 'react-native';

import { profileShadow, profileTheme } from '@/theme/profileTheme';

export const serviceDetailStyles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: profileTheme.colors.background,
  },
  content: {
    padding: profileTheme.spacing.page,
    paddingBottom: 30,
    gap: profileTheme.spacing.sectionGap,
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
    fontSize: 25,
    fontWeight: '800',
  },
  heroSubtitle: {
    color: '#5f7593',
    fontSize: 14,
    lineHeight: 20,
  },
  card: {
    backgroundColor: profileTheme.colors.surface,
    borderWidth: 1,
    borderColor: profileTheme.colors.border,
    borderRadius: profileTheme.radius.lg,
    padding: profileTheme.spacing.cardPadding,
    gap: 8,
    ...profileShadow,
  },
  headerRow: {
    flexDirection: 'row',
    gap: 10,
  },
  headerTextWrap: {
    flex: 1,
    gap: 2,
  },
  avatar: {
    width: 58,
    height: 58,
    borderRadius: 999,
    backgroundColor: '#dbe6f5',
  },
  serviceTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: profileTheme.colors.title,
  },
  providerName: {
    color: '#38587b',
    fontWeight: '700',
  },
  cityText: {
    color: profileTheme.colors.body,
  },
  description: {
    color: '#304862',
    lineHeight: 19,
    fontSize: 13,
  },
  infoText: {
    color: '#2f4764',
    fontWeight: '600',
  },
  ratingSummary: {
    color: '#114f87',
    fontWeight: '800',
  },
  ratingSummaryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: -4,
  },
  ratingSummaryMeta: {
    color: '#114f87',
    fontWeight: '700',
  },
  starsIconRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  providerBio: {
    color: '#4f617a',
    lineHeight: 19,
    fontSize: 13,
  },
  chatButton: {
    backgroundColor: profileTheme.colors.primary,
    borderWidth: 0,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 11,
  },
  chatButtonText: {
    color: '#fff',
    fontWeight: '800',
    fontSize: 13,
  },
  chatHelperText: {
    color: '#5f738e',
    fontSize: 12,
    lineHeight: 18,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: profileTheme.colors.title,
  },
  sectionSubtitle: {
    color: profileTheme.colors.body,
    lineHeight: 19,
    fontSize: 13,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccd8ea',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 9,
    fontSize: 14,
    backgroundColor: '#fff',
  },
  commentInput: {
    minHeight: 90,
    textAlignVertical: 'top',
  },
  label: {
    color: '#2f4764',
    fontWeight: '700',
  },
  ratingRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  ratingButton: {
    width: 42,
    height: 42,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#bfd1e8',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  ratingButtonActive: {
    backgroundColor: '#144b8a',
    borderColor: '#144b8a',
  },
  ratingButtonText: {
    color: '#254364',
    fontWeight: '800',
  },
  ratingButtonTextActive: {
    color: '#fff',
  },
  photoActionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 10,
  },
  addPhotoButton: {
    backgroundColor: '#e9f2ff',
    borderWidth: 1,
    borderColor: '#bad0ee',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 9,
  },
  addPhotoButtonText: {
    color: '#164f89',
    fontWeight: '700',
  },
  photoCounter: {
    color: '#5f738e',
    fontWeight: '700',
  },
  photosRow: {
    gap: 8,
  },
  reviewPhoto: {
    width: 112,
    height: 84,
    borderRadius: 10,
    backgroundColor: '#dbe6f5',
  },
  submitButton: {
    backgroundColor: profileTheme.colors.primary,
    borderRadius: 12,
    paddingVertical: 11,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontWeight: '800',
    fontSize: 15,
  },
  helperText: {
    color: '#5f738e',
    fontSize: 12,
  },
  emptyText: {
    color: '#5f738e',
    lineHeight: 20,
  },
  reviewCard: {
    borderWidth: 1,
    borderColor: profileTheme.colors.borderSoft,
    borderRadius: 12,
    padding: 10,
    gap: 6,
    backgroundColor: profileTheme.colors.surfaceMuted,
  },
  reviewHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 8,
  },
  reviewerName: {
    fontWeight: '800',
    color: '#12233b',
    flex: 1,
  },
  reviewDate: {
    color: '#5f738e',
    fontSize: 12,
  },
  reviewStars: {
    color: '#114f87',
    fontWeight: '800',
  },
  reviewStarsRow: {
    marginTop: -4,
    marginBottom: 2,
  },
  reviewComment: {
    color: '#2f4764',
    lineHeight: 19,
    fontSize: 13,
  },
  notFoundWrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    backgroundColor: profileTheme.colors.background,
  },
  notFoundTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: profileTheme.colors.title,
    textAlign: 'center',
  },
  notFoundText: {
    marginTop: 6,
    color: profileTheme.colors.body,
    textAlign: 'center',
  },
});
