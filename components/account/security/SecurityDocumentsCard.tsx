import { Ionicons } from '@expo/vector-icons';
import { Text, View } from 'react-native';

import { VerificationDocument } from '@/context/marketplace/types';

import { securityStyles } from './securityStyles';
import { formatSecurityDateTime } from './securityUtils';

type SecurityDocumentsCardProps = {
  documents: VerificationDocument[];
};

export function SecurityDocumentsCard({ documents }: SecurityDocumentsCardProps) {
  return (
    <View style={securityStyles.card}>
      <Text style={securityStyles.sectionTitle}>Documentos enviados</Text>

      {!documents.length && (
        <Text style={securityStyles.emptyText}>Nenhum documento enviado até o momento.</Text>
      )}

      {documents.map((doc) => (
        <View key={doc.id} style={securityStyles.docRow}>
          <View style={securityStyles.docIconWrap}>
            <Ionicons name="document-text-outline" size={18} color="#1f4d79" />
          </View>
          <View style={securityStyles.docInfo}>
            <Text style={securityStyles.docType}>{doc.type}</Text>
            <Text style={securityStyles.docName} numberOfLines={1}>
              {doc.name}
            </Text>
            <Text style={securityStyles.docDate}>Enviado em {formatSecurityDateTime(doc.submittedAt)}</Text>
          </View>
        </View>
      ))}
    </View>
  );
}
