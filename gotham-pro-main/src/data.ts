/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Project, Service, Testimonial, FAQ } from './types';

export const HERO_VIDEO_URL = 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260428_193507_4286c423-2fd9-4efd-92bd-91a939453fc1.mp4';

export const PROJECTS_DATA: Project[] = [
  {
    id: 'p1',
    title: 'Penthouse San Isidro - Reforma Integral',
    category: 'Integral',
    description: 'Transformación absoluta de un penthouse de 280m² en el corazón de San Isidro. Se redefinió la distribución espacial para capturar la luz del Pacífico, aplicando microcemento gris plata y revestimientos de roble oscuro importado.',
    beforeImage: '/images/antes-2.jpg',
    afterImage: '/images/despues-2.jpg',
    areaSqm: 280,
    completionYear: '2025',
    clientName: 'Familia Miró Quesada',
    district: 'San Isidro',
    highlights: ['Microcemento gris plata continuo', 'Iluminación LED domótica oculta', 'Paneles acústicos de madera de roble', 'Carpintería de aluminio minimalista']
  },
  {
    id: 'p2',
    title: 'Cocina Minimalista - Casuarinas, Surco',
    category: 'Cocinas',
    description: 'Bespoke culinary space. Integración de encimeras de Dekton Kelya con veta dorada, mobiliario texturizado antihuellas sin tiradores con herrajes Blum de última generación, y una espectacular isla central de corte monolítico.',
    beforeImage: '/images/antes-1.jpeg',
    afterImage: '/images/despues-1.jpeg',
    areaSqm: 45,
    completionYear: '2024',
    clientName: 'Sr. y Sra. Belmont',
    district: 'Surco (Casuarinas)',
    highlights: ['Encimeras de Dekton Kelya', 'Electrodomésticos Gaggenau integrados', 'Cajonería oculta con sistema Push-to-Open', 'Iluminación indirecta integrada en zócalos']
  },
  {
    id: 'p3',
    title: 'Spa Residencial - Malecón de Miraflores',
    category: 'Baños',
    description: 'Conceptualizado como un santuario de relajación frente al mar. Baño principal con tina exenta de piedra natural, grifería empotrada de negro mate de alta gama, revestimientos de mármol Carrara de gran formato y sauna seca integrada.',
    beforeImage: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=1200',
    afterImage: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&q=80&w=1200',
    areaSqm: 24,
    completionYear: '2024',
    clientName: 'Dra. Patricia Arrieta',
    district: 'Miraflores',
    highlights: ['Tina exenta monolítica', 'Mármol de Carrara en placas completas', 'Ducha de lluvia con cromoterapia', 'Grifería Dornbracht negro mate']
  },
  {
    id: 'p4',
    title: 'Oficinas Corporativas - Centro Financiero',
    category: 'Oficinas',
    description: 'Un entorno corporativo de ultra-lujo que equilibra eficiencia y distinción. Diseño espacial fluido, acabados acústicos en techos, salas de directorio con vidrios inteligentes electrocrómicos y detalles metálicos en bronce cepillado.',
    beforeImage: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=1200',
    afterImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200',
    areaSqm: 350,
    completionYear: '2025',
    clientName: 'Holding Inmobiliario Continental',
    district: 'San Isidro',
    highlights: ['Vidrios electrocrómicos inteligentes', 'Suelos acústicos de Bolon Suecia', 'Detalles en latón y bronce cepillado', 'Sistema de purificación de aire HEPA integrado']
  },
  {
    id: 'p5',
    title: 'Flat de Lujo - Barranco Cultural',
    category: 'Integral',
    description: 'Reconstrucción total de un departamento histórico en Barranco. Preservación del espíritu bohemio mediante vigas de fierro expuestas pintadas en negro satinado, combinadas con suelos de terrazo vaciado in situ y revestimientos de mármol Nero Marquina.',
    beforeImage: 'https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?auto=format&fit=crop&q=80&w=1200',
    afterImage: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&q=80&w=1200',
    areaSqm: 140,
    completionYear: '2025',
    clientName: 'Diego de Almenara',
    district: 'Barranco',
    highlights: ['Terrazo pulido vaciado in situ', 'Vigas metálicas estructurales expuestas', 'Cocina abierta con mármol Nero Marquina', 'Automatización de iluminación Lutron']
  }
];

export const SERVICES_DATA: Service[] = [
  {
    id: 's1',
    name: 'Reforma Integral',
    iconName: 'Architecture',
    description: 'Planificación arquitectónica y ejecución total para residencias y comercios premium. Coordinamos licencias, demolición especializada, instalaciones electromecánicas avanzadas, tabiquería termoacústica y acabados de lujo.',
    fullDetails: [
      'Desarrollo de planos 3D y simulaciones fotorrealistas de alta fidelidad.',
      'Gestión integral de licencias municipales en distritos exclusivos de Lima.',
      'Instalaciones sanitarias y eléctricas completamente nuevas con materiales certificados.',
      'Sistemas de aire acondicionado centralizado e iluminación domótica.',
      'Supervisión residente de obra diaria por arquitectos colegiados.'
    ],
    averagePriceMin: 850,
    averagePriceMax: 1500,
    typicalDuration: '12 - 16 semanas'
  },
  {
    id: 's2',
    name: 'Cocinas Premium',
    iconName: 'Countertops',
    description: 'Espacios gastronómicos de nivel culinario profesional. Utilizamos materiales ultracompactos (Dekton, Silestone, Neolith) de altísima resistencia a impactos y manchas, complementados con herrajes europeos premium.',
    fullDetails: [
      'Mobiliario con frentes lacados, maderas nobles o acabados Fenix antihuellas.',
      'Herrajes Blum con sistemas de amortiguación Soft-Close y servo-drive.',
      'Encimeras de gran formato sin juntas visibles.',
      'Campanas extractoras empotradas invisibles de alta capacidad y bajo ruido.',
      'Integración total de electrodomésticos empotrados.'
    ],
    averagePriceMin: 1200,
    averagePriceMax: 2200,
    typicalDuration: '6 - 8 semanas'
  },
  {
    id: 's3',
    name: 'Baños de Autor',
    iconName: 'Bathtub',
    description: 'Santuarios personales tipo wellness y spa. Diseñamos con grifería empotrada de tecnologías alemanas, inodoros suspendidos inteligentes, cabinas de ducha con vidrios templados antical y revestimientos continuos sin juntas.',
    fullDetails: [
      'Sistemas de duchas termostáticas con salidas de cascada y rociadores de techo.',
      'Instalación de inodoros suspendidos con cisterna empotrada Geberit.',
      'Revestimientos de placas completas de mármol o porcelanatos de gran formato.',
      'Espejos inteligentes con calefacción desempañante y luz perimetral regulable.',
      'Instalación de saunas secas y jacuzzis de diseño.'
    ],
    averagePriceMin: 950,
    averagePriceMax: 1800,
    typicalDuration: '4 - 6 semanas'
  },
  {
    id: 's4',
    name: 'Oficinas y Locales',
    iconName: 'MeetingRoom',
    description: 'Acondicionamiento corporativo y comercial de alta costura. Diseñamos entornos de trabajo que proyectan la identidad de marcas de prestigio, optimizando la acústica, iluminación ergonómica y flujos operativos.',
    fullDetails: [
      'Tabiquería acústica de doble panel de vidrio con perfiles minimalistas.',
      'Suelos técnicos elevados y alfombras modulares de alto tránsito de diseño europeo.',
      'Iluminación inteligente adaptativa según el aporte de luz natural.',
      'Sistemas integrados de seguridad, control de accesos y conectividad estructurada.',
      'Mobiliario corporativo a medida y paneles de absorción acústica decorativos.'
    ],
    averagePriceMin: 700,
    averagePriceMax: 1300,
    typicalDuration: '8 - 12 semanas'
  },
  {
    id: 's5',
    name: 'Pintura y Revestimientos',
    iconName: 'FormatPaint',
    description: 'Aplicación artística y de alta ingeniería en revestimientos de muros. Especialistas certificados en microcemento premium continuo, estuco veneciano clásico a la cal, texturas minerales de autor y pinturas de grado quirúrgico duraderas.',
    fullDetails: [
      'Microcemento continuo de alta resistencia bicomponente para pisos y muros.',
      'Estuco veneciano con acabado espejo bruñido a mano.',
      'Preparación perfecta de muros con masillado completo y mallas antifisuras.',
      'Pinturas ecológicas premium libres de compuestos orgánicos volátiles (Zero VOC).',
      'Impermeabilización avanzada de muros de contención y terrazas.'
    ],
    averagePriceMin: 150,
    averagePriceMax: 350,
    typicalDuration: '2 - 3 semanas'
  }
];

export const TESTIMONIALS_DATA: Testimonial[] = [
  {
    id: 't1',
    name: 'Carlos Miró Quesada',
    location: 'San Isidro',
    projectType: 'Reforma Integral Penthouse',
    quote: 'El nivel de detalle y rigor técnico de Gotham Perú es insuperable. Desde el primer día de diseño hasta la entrega final de las llaves, cada centímetro de nuestro penthouse fue tratado con un cuidado artesanal y precisión milimétrica.',
    rating: 5
  },
  {
    id: 't2',
    name: 'Dra. Patricia Arrieta',
    location: 'Miraflores',
    projectType: 'Baño de Autor Spa',
    quote: 'Buscaba un espacio de desconexión absoluta y lograron diseñar un spa de nivel internacional en mi departamento de Miraflores. El mármol emparejado en libro (bookmatch) es una obra de arte.',
    rating: 5
  },
  {
    id: 't3',
    name: 'Mariana Belmont',
    location: 'Surco',
    projectType: 'Cocina Monolítica Dekton',
    quote: 'La cocina se ha convertido en el corazón de nuestra casa. Los cajones automáticos, la textura del Dekton Kelya y la funcionalidad de cada elemento demuestran que valió cada sol de la inversión.',
    rating: 5
  }
];

export const FAQS_DATA: FAQ[] = [
  {
    id: 'f1',
    question: '¿Cómo garantizan el cumplimiento de los plazos de entrega?',
    answer: 'Utilizamos software de gestión de proyectos en tiempo real (Ms Project / Gantt interactivo) donde el cliente puede supervisar los hitos semanales. Además, nuestros contratos de obra estipulan penalidades económicas a nuestro cargo por retrasos injustificados, lo que asegura nuestro compromiso absoluto con el cronograma acordado.',
    category: 'Proceso'
  },
  {
    id: 'f2',
    question: '¿Se encargan del trámite de licencias municipales?',
    answer: 'Sí, contamos con un equipo legal y de arquitectura colegiado experto en las normativas específicas de Miraflores, San Isidro, Surco, La Molina, San Borja, Magdalena y Barranco. Preparamos el expediente técnico completo, firmas de ingenieros especializados y realizamos el seguimiento ante la municipalidad hasta la obtención de la conformidad de obra.',
    category: 'Legal'
  },
  {
    id: 'f3',
    question: '¿Cuál es la diferencia entre los niveles Premium, Ultra-Luxury y Bespoke Architect?',
    answer: 'La diferencia radica en el origen de los materiales y el grado de personalización artesanal. Premium utiliza materiales de marca líder nacional e importado estándar (porcelanatos italianos, encimeras de cuarzo). Ultra-Luxury incluye revestimientos de piedra natural importada (mármoles exóticos), chapas de madera noble y grifería termostática de diseño. Bespoke Architect es diseño exclusivo firmado por arquitecto de renombre, domótica completa, piezas hechas a medida por ebanistas in situ y sistemas acústicos invisibles.',
    category: 'Materiales y Costos'
  },
  {
    id: 'f4',
    question: '¿Tienen garantía los trabajos realizados?',
    answer: 'Todas nuestras obras cuentan con una garantía estructural de hasta 5 años por escrito en contrato. Además, entregamos un manual de mantenimiento preventivo y realizamos visitas de inspección gratuitas a los 6 y 12 meses de entregada la obra para asegurar que los acabados se mantengan impecables.',
    category: 'Garantía'
  }
];

export const COVERAGE_DISTRICTS = [
  { name: 'Miraflores', time: '15-20 días hábiles de trámite municipal', status: 'Alta Demanda' },
  { name: 'San Isidro', time: '20-25 días hábiles de trámite municipal', status: 'Regulación Estricta' },
  { name: 'Surco', time: '15-20 días hábiles de trámite municipal', status: 'Alta Demanda' },
  { name: 'La Molina', time: '20-30 días hábiles de trámite municipal', status: 'Regulación Estricta' },
  { name: 'San Borja', time: '15-25 días hábiles de trámite municipal', status: 'Disponible' },
  { name: 'Barranco', time: '25-35 días hábiles (Patrimonio Monumental)', status: 'Especializado' },
  { name: 'Magdalena', time: '15-20 días hábiles de trámite municipal', status: 'Disponible' }
];
