import React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { StatusBar } from 'expo-status-bar';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import RouteDetailScreen from './screens/RouteDetailScreen';
import FloraFaunaScreen from './screens/FloraFaunaScreen';
import MapsScreen from './screens/MapsScreen';
import GeologyVolcanologyScreen from './screens/GeologyVolcanologyScreen';
import WeatherScreen from './screens/WeatherScreen';
import MunicipalOrdinancesScreen from './screens/MunicipalOrdinancesScreen';
import PoliceScreen from './screens/PoliceScreen';
import SafetyScreen from './screens/SafetyScreen';
import NDRPrinciplesScreen from './screens/NDRPrinciplesScreen';
import RecommendationsScreen from './screens/RecommendationsScreen';
import LanguageSettingsScreen from './screens/LanguageSettingsScreen';
import PDFViewerScreen from './screens/PDFViewerScreen';
import CommunityForumScreen from './screens/CommunityForumScreen';
import NewPostScreen from './screens/NewPostScreen';
import AlertsScreen from './screens/AlertsScreen';
import { LanguageProvider, useLanguage } from './context/LanguageContext';

// Paleta base de tonos de bosque y montaña
const themeColors = {
  primary: '#0f3d3e',
  secondary: '#2b7a78',
  accent: '#c3a572',
  background: '#f1f5f3',
  text: '#0f1a1a',
};

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

// Navegador lateral con secciones informativas
function MainDrawer() {
  const { t } = useLanguage();
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerStyle: { backgroundColor: themeColors.primary },
        headerTintColor: '#ffffff',
        drawerActiveTintColor: themeColors.secondary,
        drawerLabelStyle: { fontWeight: '600' },
      }}
    >
      <Drawer.Screen name="Home" component={HomeScreen} options={{ title: t('drawerHome') }} />
      <Drawer.Screen name="FloraFauna" component={FloraFaunaScreen} options={{ title: t('drawerFloraFauna') }} />
      <Drawer.Screen name="Maps" component={MapsScreen} options={{ title: t('drawerMaps') }} />
      <Drawer.Screen
        name="GeologyVolcanology"
        component={GeologyVolcanologyScreen}
        options={{ title: t('drawerGeology') }}
      />
      <Drawer.Screen name="Weather" component={WeatherScreen} options={{ title: t('drawerWeather') }} />
      <Drawer.Screen
        name="MunicipalOrdinances"
        component={MunicipalOrdinancesScreen}
        options={{ title: t('drawerOrdinances') }}
      />
      <Drawer.Screen name="Police" component={PoliceScreen} options={{ title: t('drawerPolice') }} />
      <Drawer.Screen name="Safety" component={SafetyScreen} options={{ title: t('drawerSafety') }} />
      <Drawer.Screen name="NDRPrinciples" component={NDRPrinciplesScreen} options={{ title: t('drawerNDR') }} />
      <Drawer.Screen
        name="Recommendations"
        component={RecommendationsScreen}
        options={{ title: t('drawerRecommendations') }}
      />
      <Drawer.Screen
        name="CommunityForum"
        component={CommunityForumScreen}
        options={{ title: t('drawerForum') }}
      />
      <Drawer.Screen name="NewPost" component={NewPostScreen} options={{ title: t('drawerNewPost') }} />
      <Drawer.Screen name="Alerts" component={AlertsScreen} options={{ title: t('drawerAlerts') }} />
      <Drawer.Screen
        name="LanguageSettings"
        component={LanguageSettingsScreen}
        options={{ title: t('drawerLanguage') }}
      />
    </Drawer.Navigator>
  );
}

// Navegador principal envuelto en el provider de idioma para traducir títulos y textos.
const AppNavigator = () => {
  const { t } = useLanguage();

  const navigationTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: themeColors.background,
      text: themeColors.text,
      primary: themeColors.primary,
    },
  };

  return (
    <NavigationContainer theme={navigationTheme}>
      <StatusBar style="light" />
      <Stack.Navigator>
        {/* Pantalla inicial de autenticación básica */}
        <Stack.Screen name="Login" options={{ headerShown: false }}>
          {(props) => <LoginScreen {...props} themeColors={themeColors} />}
        </Stack.Screen>

        {/* Navegación principal con menú hamburguesa */}
        <Stack.Screen name="Main" options={{ headerShown: false }}>
          {(props) => <MainDrawer {...props} />}
        </Stack.Screen>

        {/* Detalle de una ruta específica */}
        <Stack.Screen
          name="RouteDetail"
          options={{
            title: t('routeDetailTitle'),
            headerStyle: { backgroundColor: themeColors.primary },
            headerTintColor: '#ffffff',
          }}
        >
          {(props) => <RouteDetailScreen {...props} themeColors={themeColors} />}
        </Stack.Screen>

        {/* Visor offline de mapas y fichas PDF */}
        <Stack.Screen
          name="PDFViewer"
          options={{
            title: t('pdfViewerTitle'),
            headerStyle: { backgroundColor: themeColors.primary },
            headerTintColor: '#ffffff',
          }}
        >
          {(props) => <PDFViewerScreen {...props} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default function App() {
  return (
    <LanguageProvider>
      <AppNavigator />
    </LanguageProvider>
  );
}
