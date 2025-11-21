import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useLanguage } from '../context/LanguageContext';

const themeColors = {
  primary: '#0f3d3e',
  secondary: '#2b7a78',
  accent: '#c3a572',
  background: '#f1f5f3',
  text: '#0f1a1a',
};

/**
 * Muestra el detalle real de una ruta usando los datos centralizados en data/routes.js.
 * Permite abrir la ficha PDF tras confirmar el recordatorio de registro en Carabineros.
 */
const RouteDetailScreen = ({ navigation, route }) => {
  const { t } = useLanguage();
  const { routeData } = route.params || {};

  const handleOpenPdf = () => {
    Alert.alert(
      t('openPdf'),
      t('warningCarabineros'),
      [
        { text: t('cancel'), style: 'cancel' },
        {
          text: t('confirm'),
          onPress: () =>
            navigation.navigate('PDFViewer', {
              pdf: routeData?.pdf,
              title: routeData?.name,
            }),
        },
      ],
    );
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: themeColors.background }]}> 
      <Text style={styles.title}>{routeData?.name ?? t('routeWithoutName')}</Text>
      <Text style={styles.description}>{routeData?.description ?? t('descUnavailable')}</Text>

      <View style={styles.metaBox}>
        <Text style={styles.meta}>
          {t('difficultyLabel')}: {routeData?.difficulty ?? 'N/D'}
        </Text>
        <Text style={styles.meta}>
          {t('distanceLabel')}: {routeData?.distanceKm ?? 'N/D'}
        </Text>
        <Text style={styles.meta}>
          {t('timeLabel')}: {routeData?.time ?? 'N/D'}
        </Text>
        <Text style={styles.meta}>
          {t('elevationGain')}: {routeData?.elevationGain ?? 'N/D'}
        </Text>
        {routeData?.elevationLoss ? (
          <Text style={styles.meta}>
            {t('elevationLoss')}: {routeData.elevationLoss}
          </Text>
        ) : null}
      </View>

      {routeData?.risks?.length ? (
        <View style={styles.infoBox}>
          <Text style={styles.sectionTitle}>{t('risks')}</Text>
          {routeData.risks.map((risk) => (
            <Text key={risk} style={styles.reco}>
              • {risk}
            </Text>
          ))}
        </View>
      ) : null}

      {routeData?.recommendations?.length ? (
        <View style={styles.infoBox}>
          <Text style={styles.sectionTitle}>{t('recommendations')}</Text>
          {routeData.recommendations.map((item) => (
            <Text key={item} style={styles.reco}>
              • {item}
            </Text>
          ))}
        </View>
      ) : null}

      <TouchableOpacity style={[styles.button, { backgroundColor: themeColors.secondary }]} onPress={handleOpenPdf}> 
        <Text style={styles.buttonText}>{t('openPdf')}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: themeColors.primary,
    marginBottom: 6,
  },
  description: {
    color: '#1f2a2a',
    marginBottom: 12,
    fontSize: 15,
  },
  metaBox: {
    backgroundColor: '#ffffff',
    padding: 12,
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#e2e8e5',
  },
  meta: {
    color: '#0f1a1a',
    fontSize: 14,
    marginBottom: 4,
  },
  infoBox: {
    backgroundColor: '#ffffff',
    padding: 12,
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#e2e8e5',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: themeColors.secondary,
    marginBottom: 8,
  },
  reco: {
    color: '#1f2a2a',
    marginBottom: 4,
  },
  button: {
    marginTop: 20,
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: '800',
  },
});

export default RouteDetailScreen;
