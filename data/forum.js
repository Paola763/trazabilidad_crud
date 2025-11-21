// Datos simulados para el foro comunitario y alertas oficiales de Neura Exploradores.
// Se utilizan en modo offline para mostrar ejemplos de publicaciones y avisos.

export const forumPosts = [
  {
    id: 'post-1',
    title: 'Estado del sendero Shangri-La después de la lluvia',
    author: 'Marcela R.',
    authorType: 'turista',
    date: '2024-05-02',
    content:
      'El sendero está con barro en la primera parte, recomendable usar bastones y llevar cubre pantalón impermeable.',
  },
  {
    id: 'post-2',
    title: 'Avistamiento de carpintero negro en Valle Aguas Calientes',
    author: 'Guía local - Pedro',
    authorType: 'local',
    date: '2024-04-18',
    content: 'Se observaron dos ejemplares cerca del km 3, favor mantener distancia y no usar playback.',
  },
  {
    id: 'post-3',
    title: 'Acceso a Fumarolas habilitado solo hasta el mirador',
    author: 'CONAF Ñuble',
    authorType: 'institucion',
    date: '2024-03-27',
    content: 'Se restringe el paso a zonas de actividad fumarólica por seguridad. Seguir señalética en terreno.',
  },
];

export const officialAlerts = [
  {
    id: 'alert-1',
    institution: 'ONEMI Ñuble',
    level: 'advertencia',
    title: 'Precaución por viento blanco en sector alto',
    description: 'Pronóstico indica ráfagas sobre 70 km/h en cota alta durante la tarde. Evaluar aplazar ascensos.',
    date: '2024-05-05',
  },
  {
    id: 'alert-2',
    institution: 'SERNAGEOMIN',
    level: 'informativa',
    title: 'Actividad estable del complejo Nevados de Chillán',
    description: 'Se mantiene alerta técnica amarilla. No acercarse a cráter activo y respetar perímetros de seguridad.',
    date: '2024-04-30',
  },
  {
    id: 'alert-3',
    institution: 'CONAF Ñuble',
    level: 'alerta',
    title: 'Cierre temporal de Laguna del Huemul por nieve',
    description: 'Riesgo de resbalones y avalanchas menores. Sendero cerrado hasta nuevo aviso.',
    date: '2024-04-12',
  },
];
