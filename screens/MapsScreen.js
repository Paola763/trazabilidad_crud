import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

const themeColors = {
  primary: '#0f3d3e',
  secondary: '#2b7a78',
  background: '#f1f5f3',
};

const MapsScreen = () => (
  <ScrollView style={[styles.container, { backgroundColor: themeColors.background }]}> 
    <Text style={styles.title}>Mapas</Text>
    <Text style={styles.body}>
      Aquí se listarán mapas descargables para uso offline. Por ahora se muestran placeholders de mapas,
      tracks GPX y notas de seguridad.
    </Text>
    <View style={styles.placeholder}>
      <Text style={styles.placeholderText}>Mapa descargable (simulado)</Text>
    </View>
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
    marginBottom: 16,
  },
  placeholder: {
    borderWidth: 1,
    borderColor: themeColors.secondary,
    borderRadius: 12,
    padding: 20,
    backgroundColor: '#ffffff',
  },
  placeholderText: {
    color: '#1f2a2a',
    textAlign: 'center',
  },
});

export default MapsScreen;
