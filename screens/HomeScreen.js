import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { routes } from '../data/routes';
import { useLanguage } from '../context/LanguageContext';

const themeColors = {
  primary: '#0f3d3e',
  secondary: '#2b7a78',
  accent: '#c3a572',
  background: '#f1f5f3',
  text: '#0f1a1a',
};

// Pantalla de inicio con buscador y lista de rutas usando datos offline.
const HomeScreen = ({ navigation }) => {
  const { t } = useLanguage();
  const [query, setQuery] = useState('');

  // Filtra las rutas según el texto ingresado en la barra de búsqueda (coincidencia por nombre).
  const filteredRoutes = useMemo(() => {
    if (!query) return routes;
    return routes.filter((item) => item.name.toLowerCase().includes(query.toLowerCase()));
  }, [query]);

  // Renderiza cada tarjeta de ruta con datos básicos y botón de navegación al detalle.
  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{item.name}</Text>
      <Text style={styles.cardDescription}>{item.description}</Text>
      <View style={styles.metaRow}>
        <Text style={styles.meta}>
          {t('difficultyLabel')}: {item.difficulty}
        </Text>
        <Text style={styles.meta}>
          {t('distanceLabel')}: {item.distanceKm}
        </Text>
        <Text style={styles.meta}>
          {t('timeLabel')}: {item.time}
        </Text>
      </View>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: themeColors.secondary }]}
        onPress={() => navigation.navigate('RouteDetail', { routeData: item })}
      >
        <Text style={styles.buttonText}>{t('viewDetail')}</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: themeColors.background }]}> 
      <Text style={styles.header}>{t('routesHighlighted')}</Text>
      <Text style={styles.caption}>{t('offlineContent')}</Text>

      <View style={[styles.searchBar, { borderColor: themeColors.secondary }]}> 
        <Ionicons name="search" size={20} color={themeColors.secondary} style={styles.searchIcon} />
        <TextInput
          placeholder={t('searchPlaceholder')}
          placeholderTextColor="#7a8e8f"
          value={query}
          onChangeText={setQuery}
          style={styles.searchInput}
        />
      </View>

      <FlatList
        data={filteredRoutes}
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
  header: {
    fontSize: 22,
    fontWeight: '800',
    color: themeColors.primary,
  },
  caption: {
    marginTop: 4,
    marginBottom: 16,
    color: '#3c4b4b',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 10,
    marginBottom: 16,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 40,
    color: themeColors.text,
  },
  listContent: {
    paddingBottom: 24,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#e2e8e5',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: themeColors.text,
    marginBottom: 4,
  },
  cardDescription: {
    color: '#3c4b4b',
    marginBottom: 10,
  },
  metaRow: {
    marginBottom: 10,
  },
  meta: {
    color: '#1f2a2a',
    fontSize: 13,
  },
  button: {
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: '700',
  },
});

export default HomeScreen;
