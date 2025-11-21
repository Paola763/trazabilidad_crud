import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useLanguage } from '../context/LanguageContext';

const themeColors = {
  primary: '#0f3d3e',
  secondary: '#2b7a78',
  background: '#f1f5f3',
};

// Configuración de idioma: cambia el contexto global y actualiza textos.
const LanguageSettingsScreen = () => {
  const { language, setLanguage, t } = useLanguage();

  return (
    <ScrollView style={[styles.container, { backgroundColor: themeColors.background }]}> 
      <Text style={styles.title}>{t('languageTitle')}</Text>
      <Text style={styles.body}>{t('languageDescription')}</Text>

      <View style={styles.optionsRow}> 
        {[
          { code: 'es', label: t('spanish') },
          { code: 'en', label: t('english') },
        ].map((lang) => (
          <TouchableOpacity
            key={lang.code}
            onPress={() => setLanguage(lang.code)}
            style={[
              styles.option,
              { borderColor: themeColors.secondary },
              language === lang.code && { backgroundColor: '#ffffff', borderWidth: 2 },
            ]}
          >
            <Text style={styles.optionText}>{lang.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <Text style={styles.caption}>{t('languageNote')}</Text>
    </ScrollView>
  );
};

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
  optionsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  option: {
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 12,
    borderWidth: 1,
  },
  optionText: {
    fontWeight: '700',
    color: themeColors.primary,
  },
  caption: {
    marginTop: 12,
    color: '#3c4b4b',
  },
});

export default LanguageSettingsScreen;
