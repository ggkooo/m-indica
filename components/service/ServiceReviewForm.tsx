import { Image, Pressable, ScrollView, Text, TextInput, View } from 'react-native';

import { AnimatedStaggerItem } from '@/components/profile/AnimatedStaggerItem';
import { ScalePressable } from '@/components/profile/ScalePressable';

import { serviceDetailStyles } from './serviceDetailStyles';

type ServiceReviewFormProps = {
  contractorName: string;
  comment: string;
  rating: number;
  photoUrls: string[];
  onChangeContractorName: (value: string) => void;
  onChangeComment: (value: string) => void;
  onChangeRating: (value: number) => void;
  onAddMockPhoto: () => void;
  onRemovePhoto: (url: string) => void;
  onSubmit: () => void;
  animationIndex?: number;
};

export function ServiceReviewForm({
  contractorName,
  comment,
  rating,
  photoUrls,
  onChangeContractorName,
  onChangeComment,
  onChangeRating,
  onAddMockPhoto,
  onRemovePhoto,
  onSubmit,
  animationIndex = 1,
}: ServiceReviewFormProps) {
  return (
    <AnimatedStaggerItem index={animationIndex} style={serviceDetailStyles.card}>
      <Text style={serviceDetailStyles.sectionTitle}>Adicionar avaliação</Text>
      <Text style={serviceDetailStyles.sectionSubtitle}>
        Compartilhe sua experiência para ajudar outros contratantes.
      </Text>
      <TextInput
        style={serviceDetailStyles.input}
        value={contractorName}
        onChangeText={onChangeContractorName}
        placeholder="Seu nome"
      />

      <Text style={serviceDetailStyles.label}>Nota (0 a 5)</Text>
      <View style={serviceDetailStyles.ratingRow}>
        {[0, 1, 2, 3, 4, 5].map((value) => {
          const isActive = rating === value;

          return (
            <Pressable
              key={value}
              style={[
                serviceDetailStyles.ratingButton,
                isActive && serviceDetailStyles.ratingButtonActive,
              ]}
              onPress={() => onChangeRating(value)}
            >
              <Text
                style={[
                  serviceDetailStyles.ratingButtonText,
                  isActive && serviceDetailStyles.ratingButtonTextActive,
                ]}
              >
                {value}
              </Text>
            </Pressable>
          );
        })}
      </View>

      <TextInput
        style={[serviceDetailStyles.input, serviceDetailStyles.commentInput]}
        value={comment}
        onChangeText={onChangeComment}
        multiline
        placeholder="Conte como foi o atendimento e o resultado"
      />

      <View style={serviceDetailStyles.photoActionsRow}>
        <ScalePressable style={serviceDetailStyles.addPhotoButton} onPress={onAddMockPhoto} haptic="selection">
          <Text style={serviceDetailStyles.addPhotoButtonText}>Adicionar foto (mock)</Text>
        </ScalePressable>
        <Text style={serviceDetailStyles.photoCounter}>{photoUrls.length} foto(s)</Text>
      </View>

      {!!photoUrls.length && (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={serviceDetailStyles.photosRow}
        >
          {photoUrls.map((url) => (
            <Pressable key={url} onLongPress={() => onRemovePhoto(url)}>
              <Image source={{ uri: url }} style={serviceDetailStyles.reviewPhoto} />
            </Pressable>
          ))}
        </ScrollView>
      )}

      <ScalePressable style={serviceDetailStyles.submitButton} onPress={onSubmit} haptic="medium">
        <Text style={serviceDetailStyles.submitButtonText}>Publicar avaliação</Text>
      </ScalePressable>
      <Text style={serviceDetailStyles.helperText}>
        Dica: toque e segure uma foto para remover antes de publicar.
      </Text>
    </AnimatedStaggerItem>
  );
}
