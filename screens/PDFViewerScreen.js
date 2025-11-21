import React, { useMemo } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Pdf from 'react-native-pdf';

// Paleta consistente con la app
const themeColors = {
  primary: '#0f3d3e',
  secondary: '#2b7a78',
  background: '#f1f5f3',
  text: '#0f1a1a',
};

/**
 * Visor de PDFs offline. Carga archivos desde assets/pdfs/<archivo>.pdf
 * usando react-native-pdf con zoom y scroll vertical.
 */
const PDFViewerScreen = ({ route }) => {
  const { pdf, title } = route.params || {};

  // Mapeo explícito de PDFs disponibles en assets/pdfs/...
  const pdfSources = useMemo(
    () => ({
      'fumarolas.pdf': require('../assets/pdfs/fumarolas.pdf'),
      'aguas_calientes.pdf': require('../assets/pdfs/aguas_calientes.pdf'),
      'garganta_diablo.pdf': require('../assets/pdfs/garganta_diablo.pdf'),
      'waldorf.pdf': require('../assets/pdfs/waldorf.pdf'),
      'shangrila.pdf': require('../assets/pdfs/shangrila.pdf'),
      'laguna_huemul.pdf': require('../assets/pdfs/laguna_huemul.pdf'),
    }),
    [],
  );

  const source = pdf ? pdfSources[pdf] : null;

  return (
    <View style={[styles.container, { backgroundColor: themeColors.background }]}>
      {source ? (
        <Pdf
          source={source}
          style={styles.pdf}
          spacing={4}
          enablePaging
          enableAntialiasing
          trustAllCerts
          renderActivityIndicator={() => <Text style={styles.loading}>Cargando PDF...</Text>}
        />
      ) : (
        <View style={styles.fallbackBox}>
          <Text style={styles.fallbackTitle}>PDF no encontrado</Text>
          <Text style={styles.fallbackText}>
            No se pudo cargar la ficha {title ? `para "${title}"` : 'de la ruta'}. Verifica el nombre del archivo en data/routes.js.
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  pdf: {
    flex: 1,
    width: Dimensions.get('window').width,
  },
  loading: {
    textAlign: 'center',
    padding: 16,
    color: themeColors.text,
  },
  fallbackBox: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  fallbackTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: themeColors.primary,
    marginBottom: 8,
  },
  fallbackText: {
    textAlign: 'center',
    color: themeColors.text,
    lineHeight: 20,
  },
});

export default PDFViewerScreen;

/**
 * Dependencias sugeridas para Expo/React Native:
 * - npm install react-native-pdf react-native-blob-util react-native-webview
 * - expo install react-native-svg (requerido por react-native-pdf)
 * Los archivos PDF deben existir en assets/pdfs/ con los nombres declarados en data/routes.js.
 */
