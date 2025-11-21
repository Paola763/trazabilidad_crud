// data/routes.js
// Fuente centralizada de rutas reales del Valle Las Trancas para uso offline.
// Cada objeto incluye campos estandarizados para listados y detalle.
export const routes = [
  {
    id: 'fumarolas',
    name: 'Fumarolas',
    distanceKm: '1,11 km',
    time: '1 h 20 min',
    difficulty: 'Moderado',
    elevationGain: '0 m',
    elevationLoss: '269 m',
    description:
      'Ruta de dificultad media que atraviesa un paisaje volcánico activo del complejo Nevados de Chillán. El sendero conduce a zonas de vapores sulfurosos y suelos minerales calientes, ofreciendo vistas únicas de la geotermia del sector y panorámicas a los volcanes cercanos.',
    risks: [
      'Gases sulfurosos y actividad volcánica.',
      'Terreno inestable y caliente alrededor de las fumarolas.',
      'Cambios bruscos de clima en alta montaña.',
    ],
    recommendations: [
      'Calzado de trekking, cortaviento, primera capa, gorro, bloqueador, linterna frontal.',
      'Llevar mínimo 1,5 L de agua y snacks energéticos.',
      'Revisar pronóstico, evitar tormentas, registrar salida en Carabineros.',
    ],
    pdf: 'fumarolas.pdf',
  },
  {
    id: 'valle-aguas-calientes',
    name: 'Valle de Aguas Calientes',
    distanceKm: '10,99 km',
    time: '5 h 44 min',
    difficulty: 'Difícil',
    elevationGain: '1.074 m',
    elevationLoss: null,
    description:
      'El sendero Aguas Calientes recorre un valle de origen volcánico rodeado de bosques nativos, ríos cristalinos y vistas al complejo Nevados de Chillán. Finaliza en pozones termales naturales, un lugar ideal para descansar tras la caminata.',
    risks: [
      'Cruces de río y humedad en el terreno.',
      'Clima variable de montaña.',
      'Proximidad a zonas termales con agua muy caliente.',
    ],
    recommendations: [
      'Calzado de trekking, bastones opcionales, cortaviento, traje de baño, toalla.',
      'Llevar 1,5–2 L de agua y snacks energéticos.',
      'Evitar días de lluvia, descargar mapa offline, registrarse en Carabineros.',
    ],
    pdf: 'aguas_calientes.pdf',
  },
  {
    id: 'garganta-del-diablo',
    name: 'Garganta del Diablo',
    distanceKm: '7,95 km',
    time: '4 h 23 min',
    difficulty: 'Moderado',
    elevationGain: '440 m',
    elevationLoss: null,
    description:
      'Sendero de nivel medio que avanza entre bosques nativos y formaciones rocosas hasta una estrecha quebrada donde el río corre encajonado con fuerza. Destaca por cascadas, paredones y tramos angostos con vista imponente.',
    risks: [
      'Terreno resbaloso cerca del río.',
      'Caudal variable y posibles crecidas.',
      'Exposición a viento en zonas estrechas.',
    ],
    recommendations: [
      'Calzado de trekking, bastones opcionales, cortaviento y ropa de recambio.',
      'Llevar 1,5 L de agua y snacks energéticos.',
      'Evitar días de lluvia, descargar mapa offline, registrarse en Carabineros.',
    ],
    pdf: 'garganta_diablo.pdf',
  },
  {
    id: 'ruinas-refugio-waldorf',
    name: 'Ruinas del Refugio Waldorf',
    distanceKm: '5,52 km',
    time: '2 h 35 min',
    difficulty: 'Moderado',
    elevationGain: '603 m',
    elevationLoss: null,
    description:
      'Sendero de dificultad baja a media que atraviesa bosques nativos y antiguos caminos hasta las ruinas del histórico Hotel Waldorf, ligado al turismo termal del pasado. Mezcla naturaleza, patrimonio y vistas al valle.',
    risks: [
      'Estructuras inestables.',
      'Terreno húmedo y resbaloso.',
      'Vegetación densa y posibles desvíos.',
    ],
    recommendations: [
      'Calzado de trekking, cortaviento, linterna opcional y protector solar.',
      'Llevar 1 L de agua y snacks simples.',
      'Evitar días de lluvia, descargar mapa offline, registrarse en Carabineros.',
    ],
    pdf: 'waldorf.pdf',
  },
  {
    id: 'shangri-la',
    name: 'Shangri-La',
    distanceKm: '2,7 km',
    time: '50 min',
    difficulty: 'Leve',
    elevationGain: '337 m',
    elevationLoss: null,
    description:
      'Sendero que asciende entre bosques de coigüe, miradores y formaciones rocosas hasta el anfiteatro natural de Shangri-La, con vistas panorámicas al complejo Nevados de Chillán.',
    risks: [
      'Pendientes y rocas sueltas.',
      'Clima de montaña variable.',
      'Exposición al sol.',
    ],
    recommendations: [
      'Calzado de trekking, cortaviento, bloqueador, gorro, bastones opcionales.',
      'Llevar 1,5–2 L de agua y snacks.',
      'Salir temprano, descargar mapa offline, registrarse en Carabineros.',
    ],
    pdf: 'shangrila.pdf',
  },
  {
    id: 'laguna-del-huemul',
    name: 'Laguna del Huemul',
    distanceKm: '1,44 km',
    time: '2 h 30 min',
    difficulty: 'Difícil',
    elevationGain: '450 m',
    elevationLoss: null,
    description:
      'Ruta exigente que asciende entre bosques nativos y zonas rocosas hasta la Laguna del Huemul, un espejo de agua rodeado de paredes montañosas y vistas amplias al Nevados de Chillán.',
    risks: [
      'Rocas sueltas y pendientes pronunciadas.',
      'Clima frío y viento en altura.',
      'Exposición al sol.',
    ],
    recommendations: [
      'Calzado de trekking, cortaviento, bloqueador, gorro y bastones opcionales.',
      'Llevar 1,5–2 L de agua y snacks.',
      'Salir temprano, ropa de abrigo, mapa offline, registrarse en Carabineros.',
    ],
    pdf: 'laguna_huemul.pdf',
  },
];
