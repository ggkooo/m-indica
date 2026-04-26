import { Ionicons } from '@expo/vector-icons';
import { ActivityIndicator, Modal, Text, View } from 'react-native';
import ImageView from 'react-native-image-viewing';
import { WebView } from 'react-native-webview';

import { ScalePressable } from '@/components/profile/ScalePressable';
import { ChatAttachment } from '@/data/mockData';

import { chatStyles } from './chatStyles';

type AttachmentViewerModalProps = {
  attachment: ChatAttachment | null;
  loading: boolean;
  onChangeLoading: (value: boolean) => void;
  onClose: () => void;
  isPdfAttachment: (attachment: ChatAttachment) => boolean;
};

export function AttachmentViewerModal({
  attachment,
  loading,
  onChangeLoading,
  onClose,
  isPdfAttachment,
}: AttachmentViewerModalProps) {
  return (
    <>
      <ImageView
        images={attachment?.type === 'image' ? [{ uri: attachment.uri }] : []}
        imageIndex={0}
        visible={attachment?.type === 'image'}
        onRequestClose={onClose}
        presentationStyle="fullScreen"
      />

      <Modal visible={!!attachment && attachment.type !== 'image'} animationType="slide" onRequestClose={onClose}>
        <View style={chatStyles.viewerScreen}>
          <View style={chatStyles.viewerHeader}>
            <Text style={chatStyles.viewerTitle} numberOfLines={1}>
              {attachment?.name}
            </Text>
            <ScalePressable onPress={onClose} style={chatStyles.viewerCloseButton} haptic="selection">
              <Ionicons name="close" size={22} color="#12233b" />
            </ScalePressable>
          </View>

          {!!attachment && (
            <View style={chatStyles.viewerBody}>
              {(loading || !attachment.uri) && (
                <View style={chatStyles.viewerLoadingLayer}>
                  <ActivityIndicator size="large" color="#15599a" />
                </View>
              )}

              <WebView
                source={{ uri: attachment.uri }}
                onLoadStart={() => onChangeLoading(true)}
                onLoadEnd={() => onChangeLoading(false)}
                startInLoadingState
                allowsInlineMediaPlayback
                mediaPlaybackRequiresUserAction
                style={chatStyles.viewerWebView}
              />

              {attachment.type === 'document' && !isPdfAttachment(attachment) && (
                <View style={chatStyles.viewerNoticeWrap}>
                  <Text style={chatStyles.viewerNoticeText}>
                    Alguns documentos podem não ter visualização completa no celular, dependendo do formato.
                  </Text>
                </View>
              )}
            </View>
          )}
        </View>
      </Modal>
    </>
  );
}
