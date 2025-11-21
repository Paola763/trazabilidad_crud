import React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';

const themeColors = {
  primary: '#0f3d3e',
  secondary: '#2b7a78',
  background: '#f1f5f3',
};

const RecommendationsScreen = () => (
  <ScrollView style={[styles.container, { backgroundColor: themeColors.background }]}> 
    <Text style={styles.title}>Recomendaciones generales</Text>
    <Text style={styles.body}>
      - No subestimar el clima en la montaña.
      {'\n'}- Siempre vestir adecuadamente y llevar capas impermeables.
      {'\n'}- Verificar equipamiento antes de salir y compartir tu itinerario.
    </Text>
  </ScrollView>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '800',
    color: themeColors.primary,
    marginBottom: 10,
  },
  body: {
    fontSize: 15,
    color: '#1f2a2a',
    lineHeight: 22,
  },
});

export default RecommendationsScreen;
