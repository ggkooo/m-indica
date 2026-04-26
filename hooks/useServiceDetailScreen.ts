import { useMemo, useRef, useState } from 'react';
import { Alert, ScrollView } from 'react-native';

import { useMarketplace } from '@/context/MarketplaceContext';
import { useScrollToTopOnFocus } from '@/hooks/useScrollToTopOnFocus';

export function useServiceDetailScreen(serviceId: string) {
  const { getServiceById, getReviewsByServiceId, getAverageRatingByServiceId, addReview } =
    useMarketplace();
  const scrollRef = useRef<ScrollView>(null);

  useScrollToTopOnFocus(scrollRef);

  const service = useMemo(() => getServiceById(serviceId), [serviceId, getServiceById]);
  const reviews = useMemo(() => getReviewsByServiceId(serviceId), [serviceId, getReviewsByServiceId]);
  const averageRating = useMemo(
    () => getAverageRatingByServiceId(serviceId),
    [serviceId, getAverageRatingByServiceId]
  );

  const [contractorName, setContractorName] = useState('');
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(5);
  const [photoUrls, setPhotoUrls] = useState<string[]>([]);

  const addMockPhoto = () => {
    if (!service) {
      return;
    }

    const seed = `${service.id}-${Date.now()}`;
    const nextPhoto = `https://picsum.photos/seed/${seed}/700/500`;
    setPhotoUrls((prev) => [...prev, nextPhoto]);
  };

  const removePhoto = (urlToRemove: string) => {
    setPhotoUrls((prev) => prev.filter((url) => url !== urlToRemove));
  };

  const submitReview = () => {
    if (!service) {
      return;
    }

    if (!contractorName.trim()) {
      Alert.alert('Nome obrigatório', 'Informe o nome de quem contratou o serviço.');
      return;
    }

    if (!comment.trim()) {
      Alert.alert('Comentário obrigatório', 'Descreva como foi o serviço prestado.');
      return;
    }

    addReview({
      serviceId: service.id,
      contractorName: contractorName.trim(),
      rating,
      comment: comment.trim(),
      photoUrls,
    });

    setContractorName('');
    setComment('');
    setRating(5);
    setPhotoUrls([]);

    Alert.alert('Avaliação enviada', 'Comentário e estrelas adicionados com sucesso.');
  };

  return {
    scrollRef,
    service,
    reviews,
    averageRating,
    contractorName,
    comment,
    rating,
    photoUrls,
    setContractorName,
    setComment,
    setRating,
    addMockPhoto,
    removePhoto,
    submitReview,
  };
}
