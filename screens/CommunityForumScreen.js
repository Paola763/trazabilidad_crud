import React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { forumPosts } from '../data/forum';
import { useLanguage } from '../context/LanguageContext';

// Pantalla que muestra el foro comunitario con publicaciones locales y avisos oficiales.
// Permite navegar a la pantalla de nueva publicación.
const themeColors = {
  primary: '#0f3d3e',
  secondary: '#2b7a78',
  accent: '#c3a572',
  background: '#f1f5f3',
  text: '#0f1a1a',
};

const CommunityForumScreen = ({ navigation }) => {
  const { t } = useLanguage();

  // Renderiza cada publicación mostrando el sello OFICIAL si es institucional.
  const renderItem = ({ item }) => {
    const isInstitutional = item.authorType === 'institucion';
    return (
      <View style={[styles.card, isInstitutional && styles.officialCard]}>
        <View style={styles.cardHeader}>
          <Text style={styles.title}>{item.title}</Text>
          {isInstitutional && <Text style={styles.badge}>{t('official')}</Text>}
        </View>
        <Text style={styles.meta}>
          {t('author')}: {item.author}
        </Text>
        <Text style={styles.meta}>
          {t('type')}: {item.authorType}
        </Text>
        <Text style={styles.meta}>
          {t('date')}: {item.date}
        </Text>
        {item.content ? <Text style={styles.content}>{item.content}</Text> : null}
      </View>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: themeColors.background }]}> 
      <Text style={styles.screenTitle}>{t('forum')}</Text>
      <Text style={styles.caption}>{t('forumCaption')}</Text>

      <FlatList
        data={forumPosts}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
      />

      <TouchableOpacity
        style={[styles.button, { backgroundColor: themeColors.secondary }]}
        onPress={() => navigation.navigate('NewPost')}
      >
        <Text style={styles.buttonText}>{t('createPost')}</Text>
      </TouchableOpacity>
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
    lineHeight: 20,
  },
  listContent: {
    paddingBottom: 20,
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
  officialCard: {
    borderColor: themeColors.accent,
    backgroundColor: '#fffaf0',
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
    backgroundColor: themeColors.accent,
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
  content: {
    marginTop: 8,
    color: '#3c4b4b',
    lineHeight: 20,
  },
  button: {
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: '700',
    fontSize: 15,
  },
});

export default CommunityForumScreen;
