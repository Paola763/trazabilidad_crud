import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';

// Pantalla para crear una nueva publicación del foro (simulada en modo offline).
const themeColors = {
  primary: '#0f3d3e',
  secondary: '#2b7a78',
  accent: '#c3a572',
  background: '#f1f5f3',
  text: '#0f1a1a',
};

const NewPostScreen = ({ navigation }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('Condiciones de ruta');
  const [author, setAuthor] = useState('');
  const [authorType, setAuthorType] = useState('turista');

  const handleSave = () => {
    // Simulación de guardado local: se imprime en consola y se muestra alerta.
    console.log('Nueva publicación', { title, content, category, author, authorType });
    Alert.alert('Publicación simulada', 'Tu publicación se guardará en una versión futura.', [
      { text: 'Volver al foro', onPress: () => navigation.goBack() },
    ]);
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: themeColors.background }]}
      contentContainerStyle={styles.content}
    >
      <Text style={styles.screenTitle}>Nueva publicación</Text>
      <Text style={styles.caption}>Completa los campos y comparte con la comunidad.</Text>

      <Text style={styles.label}>Título</Text>
      <TextInput
        value={title}
        onChangeText={setTitle}
        placeholder="Ej: Condición de Garganta del Diablo"
        style={styles.input}
        placeholderTextColor="#7a8e8f"
      />

      <Text style={styles.label}>Contenido</Text>
      <TextInput
        value={content}
        onChangeText={setContent}
        placeholder="Describe la actualización o consulta"
        style={[styles.input, styles.multiline]}
        placeholderTextColor="#7a8e8f"
        multiline
      />

      <Text style={styles.label}>Categoría</Text>
      <TextInput
        value={category}
        onChangeText={setCategory}
        placeholder="Condiciones, fauna, equipo, etc."
        style={styles.input}
        placeholderTextColor="#7a8e8f"
      />

      <Text style={styles.label}>Autor</Text>
      <TextInput
        value={author}
        onChangeText={setAuthor}
        placeholder="Tu nombre o alias"
        style={styles.input}
        placeholderTextColor="#7a8e8f"
      />

      <Text style={styles.label}>Tipo de autor</Text>
      <TextInput
        value={authorType}
        onChangeText={setAuthorType}
        placeholder="turista / local / institucion"
        style={styles.input}
        placeholderTextColor="#7a8e8f"
      />

      <TouchableOpacity style={[styles.button, { backgroundColor: themeColors.secondary }]} onPress={handleSave}>
        <Text style={styles.buttonText}>Publicar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
    paddingBottom: 32,
  },
  screenTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: themeColors.primary,
    marginBottom: 6,
  },
  caption: {
    color: '#3c4b4b',
    marginBottom: 14,
  },
  label: {
    color: '#0f1a1a',
    fontWeight: '600',
    marginBottom: 6,
  },
  input: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e2e8e5',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 12,
    marginBottom: 14,
  },
  multiline: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  button: {
    marginTop: 6,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: '700',
    fontSize: 16,
  },
});

export default NewPostScreen;
