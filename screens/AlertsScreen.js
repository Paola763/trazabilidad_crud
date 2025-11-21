import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { officialAlerts } from '../data/forum';
import { useLanguage } from '../context/LanguageContext';

// Pantalla de alertas oficiales con codificación de color según nivel.
const themeColors = {
  primary: '#0f3d3e',
  secondary: '#2b7a78',
  accent: '#c3a572',
  background: '#f1f5f3',
  text: '#0f1a1a',
};

const levelColors = {
  informativa: '#3fb26f',
  advertencia: '#f0c14b',
  alerta: '#e53e3e',
};

const AlertsScreen = () => {
  const { t } = useLanguage();

  const renderItem = ({ item }) => {
    const badgeColor = levelColors[item.level] || themeColors.accent;
    return (
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={[styles.badge, { backgroundColor: badgeColor }]}>{item.level.toUpperCase()}</Text>
        </View>
        <Text style={styles.meta}>
          {t('institution')}: {item.institution}
        </Text>
        <Text style={styles.meta}>
          {t('date')}: {item.date}
        </Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: themeColors.background }]}> 
      <Text style={styles.screenTitle}>{t('alerts')}</Text>
      <Text style={styles.caption}>{t('alertsCaption')}</Text>

      <FlatList
        data={officialAlerts}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  screenTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: themeColors.primary,
    marginBottom: 6,
  },
  caption: {
    color: '#3c4b4b',
    marginBottom: 12,
  },
  listContent: {
    paddingBottom: 16,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e2e8e5',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: themeColors.text,
    flex: 1,
  },
  badge: {
    color: '#0f1a1a',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    fontSize: 12,
    fontWeight: '800',
    marginLeft: 10,
  },
  meta: {
    color: '#1f2a2a',
    fontSize: 13,
  },
  description: {
    marginTop: 8,
    color: '#3c4b4b',
    lineHeight: 20,
  },
});

export default AlertsScreen;
