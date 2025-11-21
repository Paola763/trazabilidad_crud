import React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';

const themeColors = {
  primary: '#0f3d3e',
  secondary: '#2b7a78',
  background: '#f1f5f3',
};

const NDRPrinciplesScreen = () => (
  <ScrollView style={[styles.container, { backgroundColor: themeColors.background }]}> 
    <Text style={styles.title}>Principios NDR (No Deje Rastro)</Text>
    <Text style={styles.body}>
      Resumen de los principios Leave No Trace adaptados a montaña: planificar, viajar y acampar en superficies
      resistentes, gestionar residuos y respetar la vida silvestre.
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

export default NDRPrinciplesScreen;
