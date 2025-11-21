import React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';

const themeColors = {
  primary: '#0f3d3e',
  secondary: '#2b7a78',
  background: '#f1f5f3',
};

const SafetyScreen = () => (
  <ScrollView style={[styles.container, { backgroundColor: themeColors.background }]}> 
    <Text style={styles.title}>Seguridad</Text>
    <Text style={styles.body}>
      Consejos de seguridad: comunicar ruta, revisar estado del sendero, llevar kit de emergencia y batería
      extra. Añade checklists descargables y enlaces a cursos de montaña.
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

export default SafetyScreen;
