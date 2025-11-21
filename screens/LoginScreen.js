import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

// Pantalla de acceso simple sin backend real
const LoginScreen = ({ navigation, themeColors }) => {
  const [email, setEmail] = useState('');

  const handleLogin = () => {
    // Navega directamente al flujo principal (drawer) simulando autenticación
    navigation.replace('Main');
  };

  return (
    <View style={[styles.container, { backgroundColor: themeColors.background }]}>
      <Text style={[styles.logo, { color: themeColors.primary }]}>Neura Exploradores</Text>
      <Text style={styles.subtitle}>Explora el Valle Las Trancas con datos offline</Text>

      <View style={styles.form}> 
        <Text style={styles.label}>Correo electrónico</Text>
        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder="tu@email.com"
          placeholderTextColor="#8aa2a3"
          style={[styles.input, { borderColor: themeColors.secondary }]}
          keyboardType="email-address"
        />
        <TouchableOpacity
          style={[styles.button, { backgroundColor: themeColors.primary }]}
          onPress={handleLogin}
        >
          <Text style={styles.buttonText}>Ingresar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  logo: {
    fontSize: 28,
    fontWeight: '800',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#3c4b4b',
    textAlign: 'center',
    marginBottom: 32,
  },
  form: {
    width: '100%',
  },
  label: {
    fontSize: 14,
    color: '#1f2a2a',
    marginBottom: 6,
  },
  input: {
    borderWidth: 1.2,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    backgroundColor: '#ffffff',
    marginBottom: 16,
  },
  button: {
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 3,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },
});

export default LoginScreen;
