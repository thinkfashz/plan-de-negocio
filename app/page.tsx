'use client'; // Directiva necesaria para componentes de cliente en Next.js App Router

import React, { useState, useEffect, useCallback } from 'react';

// --- Iconos SVG para un diseño más profesional ---
const IconCheck = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-500 mr-4 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>;
const IconXCircle = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const IconClipboardCheck = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg>;

// --- Definición de Tipos para TypeScript ---
interface BaseSlide {
  type: string;
}
interface TitleSlide extends BaseSlide {
  type: 'title';
  content: { mainTitle: string; subtitle: string; presentationTitle: string; details: string; };
}
interface BreakSlide extends BaseSlide {
  type: 'break';
  title: string;
  subtitle: string;
}
interface IconPoint { icon: React.ReactNode; title: string; text: string; }
interface ProblemSlide extends BaseSlide {
  type: 'problem';
  title: string;
  points: IconPoint[];
}
interface SolutionSlide extends BaseSlide {
  type: 'solution';
  title: string;
  points: IconPoint[];
}
interface MarketSlide extends BaseSlide {
  type: 'market';
  title: string;
  stats: { value: string; title: string; text: string; }[];
  conclusion: string;
}
interface PriceAnalysisSlide extends BaseSlide {
  type: 'price_analysis';
  title: string;
  intro: string;
  comparison: { tier: string; price: string; description: string; }[];
  conclusion: string;
}
interface ProfitAnalysisSlide extends BaseSlide {
    type: 'profit_analysis';
    title: string;
    subtitle: string;
    intro: string;
    table: { component: string; percentage: string; value: string; type: string; }[];
}
interface BusinessModelSlide extends BaseSlide {
  type: 'business_model';
  title: string;
  subtitle: string;
  points: { title: string; text: string; }[];
  phases: { percentage: string; name: string; detail: string; }[];
}
interface InvestmentSlide extends BaseSlide {
  type: 'investment';
  title: string;
  items: { name: string; amount: string; detail: string; }[];
}
interface RecoverySlide extends BaseSlide {
  type: 'recovery';
  title: string;
  points: { title: string; value: string; text: string; }[];
}
interface MessageSlide extends BaseSlide {
  type: 'message';
  title: string;
  intro: string;
  points: { title: string; text: string; }[];
}
interface ContactSlide extends BaseSlide {
  type: 'contact';
  content: { mainTitle: string; subtitle: string; company: string; email: string; phone: string; location: string; };
}

type SlideData = TitleSlide | BreakSlide | ProblemSlide | SolutionSlide | MarketSlide | PriceAnalysisSlide | ProfitAnalysisSlide | BusinessModelSlide | InvestmentSlide | RecoverySlide | MessageSlide | ContactSlide;


// --- Contenido Estratégico y Reordenado de la Presentación ---
const slidesData: SlideData[] = [
  {
    type: 'title',
    content: {
      mainTitle: "Casas Fabrick",
      subtitle: "Construimos Casas, Creamos Historias",
      presentationTitle: "Plan de Negocio y Propuesta de Inversión",
      details: "Agosto, 2025 | Región del Maule, Chile",
    },
  },
  { type: 'break', title: 'Parte 01', subtitle: 'El Mercado y Nuestra Propuesta' },
  {
    type: 'problem',
    title: "El Problema: La Decepción en la Construcción Chilena",
    points: [
        { icon: <IconXCircle />, title: "Terminaciones Deficientes", text: "El principal reclamo de los clientes. Detalles mal ejecutados que arruinan la experiencia de una casa nueva." },
        { icon: <IconXCircle />, title: "Plazos Incumplidos", text: "Retrasos constantes y falta de comunicación que generan desconfianza y sobrecostos." },
        { icon: <IconXCircle />, title: "Servicio Ineficiente", text: "Una vez entregada la casa, muchas empresas desaparecen, dejando a los clientes sin respaldo." },
    ],
  },
  {
    type: 'solution',
    title: "Nuestra Solución: El Compromiso Fabrick",
    points: [
        { icon: <IconClipboardCheck />, title: "Maestros Especialistas", text: "Un equipo dedicado exclusivamente a las terminaciones finas, garantizando un nivel de detalle superior." },
        { icon: <IconClipboardCheck />, title: "Checklist de Calidad Total", text: "Inspección exhaustiva de 200 puntos junto al cliente para asegurar la conformidad total antes de la entrega." },
        { icon: <IconClipboardCheck />, title: "Transparencia y Seguimiento", text: "Acceso a un dashboard de seguimiento del proyecto con estadísticas de avance claras y comunicación constante." },
    ],
  },
  {
    type: 'market',
    title: "La Oportunidad de Mercado es Inmensa",
    stats: [
        { value: ">50%", title: "Preferencia por la Madera", text: "De las viviendas unifamiliares en la zona centro-sur." },
        { value: "~30%", title: "Crecimiento del Metalcon", text: "De las soluciones habitacionales a nivel nacional." },
    ],
    conclusion: "Al ser expertos en ambos sistemas, podemos satisfacer a más del 70% de un mercado con demanda constante.",
  },
  { type: 'break', title: 'Parte 02', subtitle: 'El Modelo de Negocio' },
  {
    type: 'price_analysis',
    title: "Análisis de Precios: El Valor de la Calidad",
    intro: "Nos posicionamos en el 'punto dulce' del mercado: ofrecemos una calidad percibida de lujo, con terminaciones premium y un servicio profesional, a un precio significativamente más competitivo que las constructoras de alta gama.",
    comparison: [
        { tier: "Vivienda Estándar", price: "~$1.3M / m²", description: "Terminaciones básicas, baja personalización." },
        { tier: "Casas Fabrick", price: "$740.000 / m²", description: "Terminaciones premium, diseño personalizado y servicio superior." },
        { tier: "Vivienda de Lujo", price: "> $1.8M / m²", description: "Proyectos de alto costo para un nicho reducido." },
    ],
    conclusion: "Nuestra eficiencia nos permite entregar más valor por cada metro cuadrado."
  },
  {
    type: 'profit_analysis',
    title: "Análisis de Rentabilidad",
    subtitle: "Cada Proyecto es una Oportunidad de Crecimiento",
    intro: "Con un precio de venta de $740.000 por m², nuestro modelo no solo es competitivo, sino que garantiza una rentabilidad sólida y predecible en cada casa que construimos.",
    table: [
        { component: "Materiales de Construcción", percentage: "40%", value: "$296.000", type: "cost" },
        { component: "Mano de Obra Directa", percentage: "32%", value: "$236.800", type: "cost" },
        { component: "Costos Indirectos (Permisos, etc.)", percentage: "12%", value: "$88.800", type: "cost" },
        { component: "Total Gastos por m²", percentage: "84%", value: "$621.600", type: "total_cost" },
        { component: "Ganancia Bruta por m²", percentage: "16%", value: "$118.400", type: "profit" }
    ]
  },
  {
    type: 'business_model',
    title: "Nuestro Modelo de Negocio",
    subtitle: "Cero Riesgo, Máxima Transparencia",
    points: [
        { title: "Propuesta de Valor", text: "Solucionamos los problemas de calidad y plazos del mercado a través de un proceso controlado y maestros especialistas." },
        { title: "Cliente Ideal", text: "Familias y profesionales que valoran la tranquilidad, la calidad y un servicio profesional de principio a fin." },
        { title: "La Ventaja Decisiva", text: "El anticipo del 55% cubre todos los costos. La inversión inicial es para activos, no para financiar obras. Cada proyecto se autofinancia." }
    ],
    phases: [
      { percentage: "55%", name: "Inicio", detail: "Obra Gruesa" },
      { percentage: "25%", name: "Techo", detail: "Estructura" },
      { percentage: "15%", name: "Terminaciones", detail: "Interiores" },
      { percentage: "5%", name: "Entrega", detail: "Recepción" },
    ]
  },
  { type: 'break', title: 'Parte 03', subtitle: 'La Inversión y el Retorno' },
  {
    type: 'investment',
    title: "La Inversión Requerida: $51.4M",
    items: [
      { name: "Flota y Movilidad", amount: "$14.4M", detail: "1 Camión de Trabajo + 1 Camioneta." },
      { name: "Equipamiento Construcción", amount: "$14.6M", detail: "Herramientas Base y Mayor." },
      { name: "Tecnología y Marketing", amount: "$7.8M", detail: "Laptop, Drone, Branding." },
      { name: "Infraestructura Inicial", amount: "$4.6M", detail: "Garantía y arriendo de Galpón." },
    ],
  },
  {
    type: 'recovery',
    title: "Sostenibilidad y Recuperación del Negocio",
    points: [
        { title: "Sostenibilidad Inmediata", value: "Flujo de Caja Positivo", text: "Gracias al anticipo del 55%, el negocio se autofinancia desde el Día 1. No hay que esperar a generar ganancias para ser sostenible." },
        { title: "Recuperación de Activos", value: "4.7 Años", text: "Es el tiempo contable que tardarán las utilidades en igualar el valor de los activos. Mientras, estos ya están generando ingresos y posicionando la marca." },
    ],
  },
  {
    type: 'message',
    title: "Mensaje a los Inversionistas",
    intro: "Esta inversión es la fundación de una empresa líder, rentable y sostenible.",
    points: [
      { title: "Riesgo Minimizado", text: "El anticipo del 55% asegura la auto-sostenibilidad." },
      { title: "Activos Tangibles", text: "La inversión se traduce en vehículos y maquinaria." },
      { title: "Marketing como Activo", text: "La flota y la imagen profesional construyen confianza." },
      { title: "Rentabilidad y Crecimiento", text: "Un retorno sólido con un modelo diseñado para escalar." },
    ],
  },
  {
    type: 'contact',
    content: {
      mainTitle: "Construyamos el Futuro Juntos",
      subtitle: "Los invitamos a ser parte de este proyecto y a capitalizar una oportunidad real en el mercado de la construcción.",
      company: "Casas Fabrick",
      email: "contacto@casasfabrick.cl",
      phone: "+56 9 3012 1625",
      location: "Linares, Región del Maule",
    },
  },
];

// --- Componente Principal de la Presentación ---
export default function PresentationPage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = slidesData.length;

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev < totalSlides - 1 ? prev + 1 : prev));
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev > 0 ? prev - 1 : prev));
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') nextSlide();
      else if (e.key === 'ArrowLeft') prevSlide();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide]);

  const GlobalStyles = () => (
    <style>{`
      body { font-family: 'Inter', sans-serif; overflow: hidden; background-color: #F8F9FA; }
      @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
      .slide { min-height: 100vh; width: 100%; position: absolute; top: 0; left: 0; display: flex; flex-direction: column; justify-content: center; align-items: center; padding: 2rem; opacity: 0; visibility: hidden; transition: opacity 0.6s ease-in-out, visibility 0.6s; }
      .slide.active { opacity: 1; visibility: visible; z-index: 10; }
      .slide.active .animated-content { animation: fadeInUp 0.8s ease-out forwards; }
      .nav-button { position: fixed; bottom: 2rem; z-index: 20; background-color: #ffffff; color: #111827; padding: 0.75rem 1.5rem; border-radius: 9999px; cursor: pointer; transition: all 0.3s; box-shadow: 0 4px 14px 0 rgba(0,0,0,0.1); }
      .nav-button:hover { background-color: #FFC107; color: #111827; transform: scale(1.05); }
      .side-nav-button { position: fixed; top: 50%; z-index: 20; background-color: rgba(255, 255, 255, 0.8); color: #111827; padding: 1rem; border-radius: 9999px; cursor: pointer; transition: all 0.3s; box-shadow: 0 4px 14px 0 rgba(0,0,0,0.1); transform: translateY(-50%); }
      .side-nav-button:hover { background-color: #FFC107; transform: translateY(-50%) scale(1.1); }
      .progress-bar { position: fixed; top: 0; left: 0; height: 5px; background-color: #FFC107; z-index: 30; transition: width 0.3s ease; }
    `}</style>
  );

  const progressPercentage = ((currentSlide + 1) / totalSlides) * 100;

  return (
    <>
      <GlobalStyles />
      <div className="bg-white text-gray-800">
        {slidesData.map((slide, index) => (
          <section key={index} className={`slide ${currentSlide === index ? 'active' : ''}`}>
            <div className="animated-content w-full max-w-6xl mx-auto">
            {/* Renderizado dinámico según el tipo de diapositiva */}
            {slide.type === 'title' && (
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="text-center md:text-left">
                    <h1 className="text-5xl md:text-7xl 2xl:text-9xl font-black uppercase tracking-tighter text-gray-900">{slide.content.mainTitle}</h1>
                    <p className="text-xl md:text-2xl 2xl:text-3xl font-semibold text-gray-600 mt-2">{slide.content.subtitle}</p>
                    <div className="mt-8 border-l-4 border-yellow-400 pl-6">
                      <h2 className="text-2xl md:text-3xl 2xl:text-4xl font-bold text-gray-900">{slide.content.presentationTitle}</h2>
                      <p className="mt-1 text-md 2xl:text-lg text-gray-500">{slide.content.details}</p>
                    </div>
                </div>
                <div className="hidden md:block">
                    <img src="https://placehold.co/600x600/111827/FFC107?text=Fabrick" alt="Casa Fabrick" className="rounded-2xl shadow-2xl"/>
                </div>
              </div>
            )}
            
            {slide.type === 'break' && (
                <div className="text-center">
                    <p className="text-yellow-500 font-bold text-lg">{slide.subtitle}</p>
                    <h2 className="text-6xl md:text-8xl 2xl:text-9xl font-black text-gray-900 uppercase tracking-tighter">{slide.title}</h2>
                </div>
            )}

            {slide.type === 'problem' && (
                <div>
                     <h2 className="text-4xl md:text-5xl 2xl:text-6xl font-black text-gray-900 mb-12 text-center">{slide.title}</h2>
                     <div className="grid md:grid-cols-3 gap-8">
                        {slide.points.map((point, i) => (
                            <div key={i} className="text-center bg-gray-100 p-8 rounded-2xl">
                                {point.icon}
                                <h3 className="text-xl 2xl:text-2xl font-bold text-gray-900 mt-4">{point.title}</h3>
                                <p className="text-gray-600 mt-2 2xl:text-lg">{point.text}</p>
                            </div>
                        ))}
                     </div>
                </div>
            )}
            
            {slide.type === 'solution' && (
                <div>
                     <h2 className="text-4xl md:text-5xl 2xl:text-6xl font-black text-gray-900 mb-12 text-center">{slide.title}</h2>
                     <div className="grid md:grid-cols-3 gap-8">
                        {slide.points.map((point, i) => (
                            <div key={i} className="text-center bg-gray-100 p-8 rounded-2xl">
                                {point.icon}
                                <h3 className="text-xl 2xl:text-2xl font-bold text-gray-900 mt-4">{point.title}</h3>
                                <p className="text-gray-600 mt-2 2xl:text-lg">{point.text}</p>
                            </div>
                        ))}
                     </div>
                </div>
            )}

            {slide.type === 'market' && (
              <div className="text-center">
                <h2 className="text-4xl md:text-5xl 2xl:text-6xl font-black text-gray-900 mb-12">{slide.title}</h2>
                <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                  {slide.stats.map((stat, i) => (
                    <div key={i} className="bg-white p-8 rounded-2xl shadow-xl border">
                      <h3 className="text-2xl 2xl:text-3xl font-bold text-gray-900">{stat.title}</h3>
                      <p className="text-6xl 2xl:text-7xl font-black text-yellow-400 my-3">{stat.value}</p>
                      <p className="text-gray-600 2xl:text-lg">{stat.text}</p>
                    </div>
                  ))}
                </div>
                <p className="mt-10 text-xl 2xl:text-2xl font-semibold text-gray-700 max-w-3xl mx-auto">Conclusión Estratégica: <span className="text-gray-900">{slide.conclusion}</span>.</p>
              </div>
            )}

            {slide.type === 'price_analysis' && (
                <div>
                    <h2 className="text-4xl md:text-5xl 2xl:text-6xl font-black text-gray-900 mb-4 text-center">{slide.title}</h2>
                    <p className="text-center text-gray-600 mb-10 max-w-2xl mx-auto 2xl:text-lg">{slide.intro}</p>
                    <div className="grid md:grid-cols-3 gap-8 text-center">
                        {slide.comparison.map((item, i) => (
                            <div key={i} className={`p-8 rounded-2xl ${i === 1 ? 'bg-gray-900 text-white shadow-2xl transform scale-105' : 'bg-gray-100'}`}>
                                <h3 className={`font-bold text-xl 2xl:text-2xl ${i === 1 ? 'text-white' : 'text-gray-900'}`}>{item.tier}</h3>
                                <p className={`text-4xl 2xl:text-5xl font-black my-3 ${i === 1 ? 'text-yellow-400' : 'text-gray-900'}`}>{item.price}</p>
                                <p className={`${i === 1 ? 'text-gray-300' : 'text-gray-600'} 2xl:text-base`}>{item.description}</p>
                            </div>
                        ))}
                    </div>
                     <p className="mt-10 text-center text-xl 2xl:text-2xl font-semibold text-gray-700">{slide.conclusion}</p>
                </div>
            )}

            {slide.type === 'profit_analysis' && (
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div className="text-left">
                        <p className="text-yellow-500 font-bold">{slide.subtitle}</p>
                        <h2 className="text-4xl md:text-5xl 2xl:text-6xl font-black text-gray-900 mt-2">{slide.title}</h2>
                        <p className="text-lg 2xl:text-xl text-gray-600 mt-4">{slide.intro}</p>
                    </div>
                    <div className="bg-white rounded-2xl shadow-2xl border overflow-hidden">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="p-4 text-sm 2xl:text-base font-semibold text-gray-600 uppercase tracking-wider">Componente</th>
                                    <th className="p-4 text-sm 2xl:text-base font-semibold text-gray-600 uppercase tracking-wider text-center">Porcentaje</th>
                                    <th className="p-4 text-sm 2xl:text-base font-semibold text-gray-600 uppercase tracking-wider text-right">Valor / m²</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {slide.table.map((row, i) => (
                                    <tr key={i} className={`${row.type === 'total_cost' ? 'bg-gray-100 font-bold' : ''} ${row.type === 'profit' ? 'bg-green-100 font-bold' : ''}`}>
                                        <td className="p-4 whitespace-nowrap 2xl:text-lg">{row.component}</td>
                                        <td className="p-4 whitespace-nowrap text-center align-middle">
                                            <div className="w-full bg-gray-200 rounded-full h-6 relative">
                                                <div className={`h-6 rounded-full ${row.type === 'cost' ? 'bg-red-400' : row.type === 'total_cost' ? 'bg-red-600' : 'bg-green-500'}`} style={{ width: row.percentage }}></div>
                                                <span className="absolute inset-0 flex items-center justify-center text-xs font-semibold text-white mix-blend-lighten">{row.percentage}</span>
                                            </div>
                                        </td>
                                        <td className={`p-4 whitespace-nowrap text-right text-lg 2xl:text-xl font-semibold ${row.type === 'profit' ? 'text-green-600' : 'text-gray-800'}`}>{row.value}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
            
            {slide.type === 'business_model' && (
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div className="text-left">
                        <p className="text-yellow-500 font-bold">{slide.subtitle}</p>
                        <h2 className="text-4xl md:text-5xl 2xl:text-6xl font-black text-gray-900 mt-2">{slide.title}</h2>
                        <div className="mt-8 space-y-6">
                            {slide.points.map((point, i) => (
                                <div key={i} className="flex items-start">
                                    <IconCheck />
                                    <div>
                                        <h3 className="font-bold text-lg 2xl:text-xl text-gray-900">{point.title}</h3>
                                        <p className="text-gray-600 2xl:text-lg">{point.text}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="bg-gray-100 p-8 rounded-2xl">
                        <h3 className="text-2xl 2xl:text-3xl font-bold text-center text-gray-900 mb-6">Fases de Pago del Proyecto</h3>
                        <div className="space-y-4">
                            {slide.phases.map((phase, i) => (
                                <div key={i} className={`p-4 rounded-lg flex justify-between items-center ${i === 0 ? 'bg-gray-900 text-white' : 'bg-white'}`}>
                                    <div>
                                        <p className={`font-bold text-lg 2xl:text-xl ${i === 0 ? 'text-white' : 'text-gray-900'}`}>{phase.name}</p>
                                        <p className={`text-sm 2xl:text-base ${i === 0 ? 'text-gray-300' : 'text-gray-600'}`}>{phase.detail}</p>
                                    </div>
                                    <p className={`text-3xl 2xl:text-4xl font-black ${i === 0 ? 'text-yellow-400' : 'text-gray-900'}`}>{phase.percentage}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
            
            {slide.type === 'investment' && (
                <div className="text-center">
                    <h2 className="text-4xl md:text-5xl 2xl:text-6xl font-black text-gray-900 mb-12">{slide.title}</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {slide.items.map((item, i) => (
                            <div key={i} className="bg-white border p-6 rounded-2xl shadow-lg">
                                <h3 className="text-lg 2xl:text-xl font-bold text-gray-900">{item.name}</h3>
                                <p className="text-3xl 2xl:text-4xl font-bold text-yellow-500 mt-2">{item.amount}</p>
                                <p className="text-sm 2xl:text-base text-gray-600 mt-1">{item.detail}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {slide.type === 'recovery' && (
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div className="text-center md:text-left">
                        <h2 className="text-4xl md:text-5xl 2xl:text-6xl font-black text-gray-900">{slide.title}</h2>
                    </div>
                    <div className="space-y-8">
                        {slide.points.map((point, i) => (
                             <div key={i} className={`p-6 rounded-xl ${i === 0 ? 'bg-yellow-100 border-yellow-400 border' : 'bg-gray-100'}`}>
                                <h3 className="text-xl 2xl:text-2xl font-bold text-gray-900">{point.title}</h3>
                                <p className={`text-5xl 2xl:text-6xl font-black my-2 ${i === 0 ? 'text-yellow-500' : 'text-gray-900'}`}>{point.value}</p>
                                <p className="text-gray-600 text-sm 2xl:text-base">{point.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {slide.type === 'message' && (
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div className="text-center md:text-left">
                        <h2 className="text-4xl md:text-5xl 2xl:text-6xl font-black text-gray-900">{slide.title}</h2>
                        <p className="text-lg 2xl:text-xl text-gray-600 mt-4">{slide.intro}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        {slide.points.map((point, i) => (
                            <div key={i} className="bg-gray-100 p-6 rounded-lg text-center">
                                <h3 className="font-bold text-gray-900 text-md 2xl:text-lg">{point.title}</h3>
                                <p className="text-xs 2xl:text-sm text-gray-600 mt-1">{point.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {slide.type === 'contact' && (
              <div className="text-center text-gray-800 p-4">
                <h2 className="text-4xl sm:text-5xl md:text-6xl 2xl:text-7xl font-black">{slide.content.mainTitle}</h2>
                <p className="mt-6 max-w-2xl mx-auto text-md sm:text-lg 2xl:text-xl text-gray-600">{slide.content.subtitle}</p>
                <div className="mt-10">
                  <h3 className="text-2xl 2xl:text-3xl font-bold text-gray-900">{slide.content.company}</h3>
                  <p className="text-gray-600 mt-2 text-base 2xl:text-lg">{slide.content.email} | {slide.content.phone}</p>
                  <p className="text-gray-600 text-base 2xl:text-lg">{slide.content.location}</p>
                </div>
              </div>
            )}
            </div>
          </section>
        ))}

        {/* Controles de Navegación */}
        {currentSlide > 0 && <button onClick={prevSlide} className="side-nav-button left-8 hidden md:block">&larr;</button>}
        {currentSlide < totalSlides - 1 && <button onClick={nextSlide} className="side-nav-button right-8 hidden md:block">&rarr;</button>}
        
        <div className="md:hidden">
            {currentSlide > 0 && <button onClick={prevSlide} className="nav-button left-4">&larr;</button>}
            {currentSlide < totalSlides - 1 && <button onClick={nextSlide} className="nav-button right-4">&rarr;</button>}
        </div>

        <div id="progressBar" className="progress-bar" style={{ width: `${progressPercentage}%` }}></div>
      </div>
    </>
  );
}
