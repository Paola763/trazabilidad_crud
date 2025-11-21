# Neura Exploradores - Propuesta de arquitectura y plan de implementación

## Objetivos
Diseñar un prototipo móvil con React Native + Expo que funcione offline y entregue contenido turístico del Valle Las Trancas con navegación tipo hamburguesa e idiomas es/en.

## Arquitectura de carpetas
```
NeuraExploradores/
├── App.js                     # Punto de entrada de Expo con Providers (idioma/tema)
├── app.json                   # Configuración de Expo
├── package.json
├── assets/                    # Íconos, logos, imágenes de rutas, mapas de ejemplo
├── data/
│   ├── routes.js              # Catálogo local de rutas con metadata y mapas simulados
│   ├── recommendations.js     # Recomendaciones generales y de seguridad
│   ├── glossary.js            # Textos estáticos para secciones (flora, geología, etc.)
│   └── translations.js        # Diccionario es/en para UI y secciones
├── navigation/
│   ├── DrawerNavigator.js     # Menú hamburguesa con secciones
│   ├── MainStack.js           # Stack principal (Home, Detalle, Mapa)
│   └── NavigationTheme.js     # Tema de colores bosques/montaña
├── context/
│   └── LocalizationContext.js # Manejo simple de idioma (es/en)
├── components/
│   ├── HeaderLogo.js          # Logo "Neura Exploradores"
│   ├── SearchBar.js           # Barra de búsqueda con ícono lupa
│   ├── RouteCard.js           # Item de ruta con datos clave y botón mapa/descarga
│   ├── OfflineBadge.js        # Indicador de contenido descargado/offline
│   ├── SectionListItem.js     # Ítems genéricos para menú lateral (flora/fauna, etc.)
│   └── WarningModal.js        # Modal con advertencia de Carabineros antes del mapa
├── screens/
│   ├── LoginScreen.js         # Inicio de sesión simple (email + botón)
│   ├── HomeScreen.js          # Lista de rutas + búsqueda
│   ├── RouteDetailScreen.js   # Detalle con info, recomendaciones, equipo, botones mapa
│   ├── MapScreen.js           # Vista de mapa/imagen con advertencia previa
│   └── StaticSectionScreen.js # Secciones estáticas (flora, geología, clima, etc.)
├── hooks/
│   └── useOfflineData.js      # Simula descarga/estado offline de mapas y textos
└── styles/
    └── palette.js             # Paleta de verdes, azules y tonos tierra reutilizable
```

## Consideraciones de diseño
- **Offline-first simulado:** datos cargados desde `data/` y estados de descarga en `useOfflineData`. Los botones "Descargar" solo alternan estado local.
- **Navegación:** `@react-navigation/native` con un Drawer para el menú lateral y un Stack interno para las pantallas. Tema personalizado para colores bosque/montaña.
- **Internacionalización:** `LocalizationContext` provee idioma actual y función `t(key)` usando `translations.js`. Todos los textos de UI referencian claves.
- **Accesibilidad y UX:** componentes con toques grandes, contrastes adecuados, y advertencias claras antes de abrir mapas.
- **Comentarios en español:** cada pantalla y componente documenta secciones clave y supuestos.

## Plan de implementación paso a paso
1. **Configurar proyecto Expo:** crear proyecto con `expo init`, instalar `@react-navigation/native`, `drawer`, `stack`, y dependencias (React Native Gesture Handler, Reanimated, etc.).
2. **Definir paleta y tema:** crear `styles/palette.js` con colores principales y derivar tema de navegación en `navigation/NavigationTheme.js`.
3. **Contexto de idioma:** implementar `LocalizationContext` con estado `language`, función `toggleLanguage`, y helper `t(key)` leyendo `data/translations.js`.
4. **Datos locales:** poblar `data/routes.js` con rutas solicitadas (nombre, descripción, dificultad, distancia, tiempo, disponibilidad de mapa) y `data/recommendations.js` con buenas prácticas y seguridad. Añadir textos de secciones en `data/glossary.js`.
5. **Componentes base:**
   - `HeaderLogo` con el texto "Neura Exploradores" y estilo de marca.
   - `SearchBar` con ícono de lupa y callback de filtro.
   - `RouteCard` mostrando ficha de cada ruta, botones de detalle y mapa/descarga, e indicador offline.
   - `WarningModal` reutilizable para la advertencia de Carabineros al abrir mapas.
6. **Navegación:**
   - Configurar `DrawerNavigator` con secciones del menú (Flora y fauna, Mapas, Geología y vulcanología, etc.).
   - `MainStack` con `HomeScreen`, `RouteDetailScreen`, `MapScreen`. Integrar drawer dentro del contenedor principal.
7. **Pantallas:**
   - `LoginScreen`: formulario simple (email + botón "Ingresar") que navega al stack principal.
   - `HomeScreen`: muestra barra de búsqueda y lista de `RouteCard` filtrable.
   - `RouteDetailScreen`: presenta datos completos de la ruta, recomendaciones, equipo y botones para abrir/descargar mapa.
   - `MapScreen`: muestra imagen de mapa o placeholder tras confirmar advertencia de Carabineros.
   - `StaticSectionScreen`: reutilizable para cada sección del menú, cargando contenido desde `data/glossary.js` y `translations`.
8. **Hook offline simulado:** `useOfflineData` maneja estados de descargas por ruta y almacena en `useState` (futuro: persistencia con AsyncStorage).
9. **Internacionalización en UI:** envolver la app en `LocalizationContext.Provider` y usar `t(key)` en componentes/pantallas. Añadir selector de idioma en el drawer.
10. **Pruebas manuales rápidas:** verificar navegación, cambio de idioma, búsqueda, toggles de descarga y advertencia antes de abrir mapas.

## Próximos pasos futuros
- Persistir descargas y preferencias de idioma con `AsyncStorage`.
- Integrar mapas reales (MapView o imágenes cacheadas) y geolocalización opcional.
- Agregar autenticación real y sincronización de contenido.
- Implementar pruebas unitarias de componentes clave.
