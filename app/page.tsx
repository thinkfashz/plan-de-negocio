'use client'; // Directiva necesaria para componentes de cliente en Next.js App Router

import React, { useState, useEffect, useCallback } from 'react';

// --- Iconos SVG para el nuevo diseño ---
const IconCheck = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>;
const IconXCircle = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const IconClipboardCheck = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg>;

// --- Definición de Tipos para TypeScript ---
interface BaseSlide { type: string; }
interface TitleSlide extends BaseSlide { type: 'title'; content: { mainTitle: string; subtitle: string; presentationTitle: string; details: string; }; }
interface SummarySlide extends BaseSlide { type: 'summary'; title: string; points: { title: string; text: string; }[]; }
interface IconPoint { icon: React.ReactNode; title: string; text: string; }
interface ProblemSlide extends BaseSlide { type: 'problem'; title: string; points: IconPoint[]; }
interface SolutionSlide extends BaseSlide { type: 'solution'; title: string; points: IconPoint[]; }
interface MarketSlide extends BaseSlide { type: 'market'; title: string; stats: { value: string; title: string; text: string; }[]; conclusion: string; }
interface ProfitAnalysisSlide extends BaseSlide { type: 'profit_analysis'; title: string; subtitle: string; intro: string; table: { component: string; percentage: string; value: string; type: string; }[]; }
interface SuccessChanceSlide extends BaseSlide { type: 'success_chance'; title: string; percentage: number; points: string[]; }
interface BrandStrategySlide extends BaseSlide { type: 'brand_strategy'; title: string; summary: { title: string; text: string }; keywords: { title: string; text: string }; }
interface InvestmentSlide extends BaseSlide { type: 'investment'; title: string; items: { name: string; amount: string; detail: string; }[]; }
interface RecoverySlide extends BaseSlide { type: 'recovery'; title: string; points: { title: string; value: string; text: string; }[]; }

type SlideData = TitleSlide | SummarySlide | ProblemSlide | SolutionSlide | MarketSlide | ProfitAnalysisSlide | SuccessChanceSlide | BrandStrategySlide | InvestmentSlide | RecoverySlide;


// --- Contenido Estratégico Organizado en una Cuadrícula 2D ---
const slidesData: SlideData[][] = [
  // Fila 0: Introducción
  [
    {
      type: 'title',
      content: {
        mainTitle: "FUTURE",
        subtitle: "HERE AND NOW",
        presentationTitle: "Plan de Inversión: Casas Fabrick",
        details: "Agosto, 2025 | Región del Maule, Chile",
      },
    },
    {
      type: 'summary',
      title: "Resumen Ejecutivo",
      points: [
        { title: "Inversión Solicitada", text: "Capital inicial de $49.6M para adquirir activos productivos clave." },
        { title: "Modelo de Negocio Sólido", text: "Flujo de caja positivo garantizado por un 55% de anticipo en cada proyecto." },
        { title: "Proyección Rentable", text: "Utilidad neta anual de $10.7M y recuperación de activos en 4.6 años." },
        { title: "Ventaja Competitiva", text: "Imagen de marca profesional y capacidad operativa superior." },
      ],
    },
  ],
  // Fila 1: El Problema y Nuestra Solución
  [
    {
      type: 'problem',
      title: "El Problema: La Decepción en la Construcción",
      points: [
        { icon: <IconXCircle />, title: "Terminaciones Deficientes", text: "El principal reclamo de los clientes. Detalles mal ejecutados que arruinan la experiencia." },
        { icon: <IconXCircle />, title: "Plazos Incumplidos", text: "Retrasos constantes y falta de comunicación que generan desconfianza." },
        { icon: <IconXCircle />, title: "Servicio Ineficiente", text: "Empresas que desaparecen post-venta, dejando a los clientes sin respaldo." },
      ],
    },
    {
      type: 'solution',
      title: "Nuestra Solución: El Compromiso Fabrick",
      points: [
        { icon: <IconClipboardCheck />, title: "Maestros Especialistas", text: "Equipo dedicado exclusivamente a terminaciones finas para un nivel de detalle superior." },
        { icon: <IconClipboardCheck />, title: "Checklist de Calidad Total", text: "Inspección de 200 puntos junto al cliente para asegurar la conformidad total." },
        { icon: <IconClipboardCheck />, title: "Transparencia y Seguimiento", text: "Dashboard de seguimiento del proyecto con estadísticas de avance claras." },
      ],
    },
  ],
  // Fila 2: La Oportunidad y la Rentabilidad
  [
    {
      type: 'market',
      title: "La Oportunidad de Mercado",
      stats: [
          { value: ">70%", title: "Mercado Potencial", text: "Al dominar Madera y Metalcon, cubrimos la gran mayoría de la demanda regional." },
      ],
      conclusion: "Nos posicionamos en un mercado masivo con una solución de calidad superior.",
    },
    {
      type: 'profit_analysis',
      title: "Análisis de Rentabilidad",
      subtitle: "Cada Proyecto es una Oportunidad",
      intro: "Con un precio de venta de $740.000/m², nuestro modelo es sólido y predecible.",
      table: [
          { component: "Gastos (Costos)", percentage: "84%", value: "$621.600", type: "cost" },
          { component: "Ganancia (Utilidad)", percentage: "16%", value: "$118.400", type: "profit" }
      ]
    },
    {
      type: 'success_chance',
      title: "Probabilidad de Éxito del Proyecto",
      percentage: 95,
      points: [
        "El 55% de anticipo cubre todos los costos, eliminando el riesgo financiero.",
        "Equipos de maestros especialistas reducen errores y retrasos.",
        "El control de calidad constante asegura la satisfacción del cliente y evita sobrecostos."
      ]
    },
  ],
  // Fila 3: La Estrategia y la Inversión
  [
    {
        type: 'brand_strategy',
        title: "Nuestra Marca: Casas Fabrick",
        summary: { title: "Un Nombre con Propósito", text: "Fusiona 'Fabricar' y 'Brick' (ladrillo), comunicando modernidad, eficiencia y solidez. Es un nombre memorable que nos posiciona como innovadores." },
        keywords: { title: "Dominio de Palabras Clave", text: "Nos enfocaremos en 'casas' y 'fabrick' para atraer un alto volumen de búsquedas y ser el identificador de marca único en la región." }
    },
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
      title: "Sostenibilidad y Retorno",
      points: [
          { title: "Sostenibilidad Inmediata", value: "Flujo de Caja Positivo", text: "El negocio se autofinancia desde el Día 1 gracias al anticipo del 55%." },
          { title: "Recuperación de Activos", value: "4.7 Años", text: "Es el tiempo contable que tardarán las utilidades en igualar el valor de los activos." },
      ],
    },
  ],
];

// --- Componente Principal de la Presentación ---
export default function PresentationPage() {
  const [position, setPosition] = useState({ row: 0, col: 0 });
  const [touchStart, setTouchStart] = useState({ x: 0, y: 0 });

  const navigate = useCallback((dRow: number, dCol: number) => {
    setPosition(prev => {
      const newRow = prev.row + dRow;
      const newCol = prev.col + dCol;
      if (slidesData[newRow] && slidesData[newRow][newCol]) {
        return { row: newRow, col: newCol };
      }
      return prev;
    });
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') navigate(0, 1);
      else if (e.key === 'ArrowLeft') navigate(0, -1);
      else if (e.key === 'ArrowDown') navigate(1, 0);
      else if (e.key === 'ArrowUp') navigate(-1, 0);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigate]);
  
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart({ x: e.touches[0].clientX, y: e.touches[0].clientY });
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const dx = e.changedTouches[0].clientX - touchStart.x;
    const dy = e.changedTouches[0].clientY - touchStart.y;
    if (Math.abs(dx) > Math.abs(dy)) { // Horizontal swipe
      if (dx > 50) navigate(0, -1); // Swipe right
      else if (dx < -50) navigate(0, 1); // Swipe left
    } else { // Vertical swipe
      if (dy > 50) navigate(-1, 0); // Swipe down
      else if (dy < -50) navigate(1, 0); // Swipe up
    }
  };


  const GlobalStyles = () => (
    <style>{`
      body { font-family: 'Inter', sans-serif; overflow: hidden; background-color: #030712; }
      @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
      .slide { min-height: 100vh; width: 100%; position: absolute; top: 0; left: 0; display: flex; flex-direction: column; justify-content: center; align-items: center; padding: 1rem; opacity: 0; visibility: hidden; transition: opacity 0.6s ease-in-out, visibility 0.6s; }
      .slide.active { opacity: 1; visibility: visible; z-index: 10; }
      .slide.active .animated-content { animation: fadeInUp 0.8s ease-out forwards; }
      .slide-content { max-width: 1200px; width: 100%; background-color: rgba(17, 24, 39, 0.6); backdrop-filter: blur(12px); border-radius: 1.5rem; padding: 2rem; border: 1px solid rgba(255, 255, 255, 0.1); }
      .nav-button { position: fixed; z-index: 20; background-color: rgba(17, 24, 39, 0.8); color: white; width: 40px; height: 40px; border-radius: 9999px; cursor: pointer; transition: all 0.3s; border: 1px solid rgba(255, 255, 255, 0.2); display: flex; justify-content: center; align-items: center; }
      .nav-button:hover { background-color: #007BFF; transform: scale(1.1); }
      .progress-bar { position: fixed; bottom: 0; left: 0; height: 4px; background: linear-gradient(90deg, #007BFF, #00BFFF); z-index: 30; transition: width 0.3s ease; }
      .glow-text { text-shadow: 0 0 8px rgba(0, 123, 255, 0.8); }
    `}</style>
  );

  const totalSlidesInGrid = slidesData.flat().length;
  const completedSlides = slidesData.slice(0, position.row).flat().length + position.col + 1;
  const progressPercentage = (completedSlides / totalSlidesInGrid) * 100;

  return (
    <>
      <GlobalStyles />
      <div className="bg-black text-gray-200" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
        {slidesData.map((row, rowIndex) => (
          row.map((slide, colIndex) => (
            <section key={`${rowIndex}-${colIndex}`} className={`slide ${position.row === rowIndex && position.col === colIndex ? 'active' : ''}`}>
              <div className="animated-content w-full flex justify-center p-4">
                {/* Renderizado dinámico según el tipo de diapositiva */}
                {slide.type === 'title' && (
                  <div className="text-center text-white">
                      <p className="text-xl md:text-2xl font-semibold text-blue-400">{slide.content.subtitle}</p>
                      <h1 className="text-6xl md:text-8xl 2xl:text-9xl font-black uppercase tracking-widest glow-text">{slide.content.mainTitle}</h1>
                      <div className="mt-12 max-w-2xl mx-auto">
                        <h2 className="text-2xl md:text-3xl font-bold">{slide.content.presentationTitle}</h2>
                        <p className="mt-2 text-md text-gray-400">{slide.content.details}</p>
                      </div>
                  </div>
                )}
                
                {slide.type === 'summary' && (
                  <div className="slide-content grid md:grid-cols-2 gap-12 items-center">
                    <div className="text-center md:text-left">
                        <h2 className="text-3xl sm:text-5xl font-black text-blue-400">{slide.title}</h2>
                        <p className="text-lg text-gray-400 mt-4">Una oportunidad de inversión robusta, rentable y de bajo riesgo.</p>
                    </div>
                    <ul className="space-y-4 text-md sm:text-lg">
                      {slide.points.map((point, i) => (
                        <li key={i} className="flex items-start"><IconCheck /><div><strong className="text-white">{point.title}:</strong> {point.text}</div></li>
                      ))}
                    </ul>
                  </div>
                )}

                {slide.type === 'problem' && (
                    <div className="slide-content">
                         <h2 className="text-3xl sm:text-5xl font-black text-red-400 mb-8 text-center">{slide.title}</h2>
                         <div className="grid md:grid-cols-3 gap-8">
                            {slide.points.map((point, i) => (
                                <div key={i} className="text-center bg-gray-900/50 p-6 rounded-lg">
                                    {point.icon}
                                    <h3 className="text-lg sm:text-xl font-bold text-white mt-4">{point.title}</h3>
                                    <p className="text-sm text-gray-400 mt-2">{point.text}</p>
                                </div>
                            ))}
                         </div>
                    </div>
                )}
                
                {slide.type === 'solution' && (
                    <div className="slide-content">
                         <h2 className="text-3xl sm:text-5xl font-black text-green-400 mb-8 text-center">{slide.title}</h2>
                         <div className="grid md:grid-cols-3 gap-8">
                            {slide.points.map((point, i) => (
                                <div key={i} className="text-center bg-gray-900/50 p-6 rounded-lg">
                                    {point.icon}
                                    <h3 className="text-lg sm:text-xl font-bold text-white mt-4">{point.title}</h3>
                                    <p className="text-sm text-gray-400 mt-2">{point.text}</p>
                                </div>
                            ))}
                         </div>
                    </div>
                )}

                {slide.type === 'market' && (
                  <div className="slide-content text-center">
                    <h2 className="text-3xl sm:text-5xl font-black text-blue-400 mb-8">{slide.title}</h2>
                    <div className="grid md:grid-cols-1 gap-8 max-w-4xl mx-auto">
                      {slide.stats.map((stat, i) => (
                        <div key={i} className="bg-gray-800 p-6 rounded-lg hover:bg-gray-700 transition-colors">
                          <h3 className="text-2xl font-bold text-white">{stat.title}</h3>
                          <p className="text-6xl font-black text-blue-400 my-3">{stat.value}</p>
                          <p className="text-gray-400">{stat.text}</p>
                        </div>
                      ))}
                    </div>
                    <p className="mt-10 text-xl font-semibold text-white">Conclusión Estratégica: <span className="text-blue-400">{slide.conclusion}</span>.</p>
                  </div>
                )}
                
                {slide.type === 'profit_analysis' && (
                    <div className="slide-content grid md:grid-cols-2 gap-12 items-center">
                        <div className="text-left">
                            <p className="text-blue-400 font-bold">{slide.subtitle}</p>
                            <h2 className="text-4xl md:text-5xl font-black text-white mt-2">{slide.title}</h2>
                            <p className="text-lg text-gray-400 mt-4">{slide.intro}</p>
                        </div>
                        <div className="bg-gray-800 p-6 rounded-lg">
                            {slide.table.map((row, i) => (
                                <div key={i} className="mb-4">
                                    <div className="flex justify-between items-baseline mb-1">
                                        <p className={`font-semibold ${row.type === 'profit' ? 'text-green-400' : 'text-gray-300'}`}>{row.component}</p>
                                        <p className={`text-lg font-bold ${row.type === 'profit' ? 'text-green-400' : 'text-white'}`}>{row.value}</p>
                                    </div>
                                    <div className="w-full bg-gray-700 rounded-full h-4">
                                        <div className={`h-4 rounded-full ${row.type === 'cost' ? 'bg-red-500' : 'bg-green-500'}`} style={{ width: row.percentage }}></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {slide.type === 'success_chance' && (
                    <div className="slide-content text-center">
                        <h2 className="text-3xl sm:text-5xl font-black text-blue-400 mb-4">{slide.title}</h2>
                        <p className="text-8xl font-black text-white my-6 glow-text">{slide.percentage}%</p>
                        <div className="grid md:grid-cols-3 gap-4 text-left">
                            {slide.points.map((point, i) => (
                                <div key={i} className="bg-gray-800 p-4 rounded-lg text-sm text-gray-400 flex items-start">
                                    <IconCheck /> {point}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
                
                {slide.type === 'brand_strategy' && (
                    <div className="slide-content grid md:grid-cols-2 gap-12 items-center">
                        <div className="text-left">
                            <h2 className="text-3xl sm:text-5xl font-black text-blue-400">{slide.title}</h2>
                        </div>
                        <div className="space-y-6">
                            <div className="bg-gray-800 p-6 rounded-lg">
                                <h3 className="font-bold text-white text-lg">{slide.summary.title}</h3>
                                <p className="text-sm text-gray-400 mt-1">{slide.summary.text}</p>
                            </div>
                            <div className="bg-gray-800 p-6 rounded-lg">
                                <h3 className="font-bold text-white text-lg">{slide.keywords.title}</h3>
                                <p className="text-sm text-gray-400 mt-1">{slide.keywords.text}</p>
                            </div>
                        </div>
                    </div>
                )}
                
                {slide.type === 'investment' && (
                    <div className="slide-content text-center">
                        <h2 className="text-3xl sm:text-5xl font-black text-blue-400 mb-8">{slide.title}</h2>
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {slide.items.map((item, i) => (
                                <div key={i} className="bg-gray-800 border border-gray-700 p-6 rounded-lg">
                                    <h3 className="text-lg font-bold text-white">{item.name}</h3>
                                    <p className="text-3xl font-bold text-blue-400 mt-2">{item.amount}</p>
                                    <p className="text-sm text-gray-400 mt-1">{item.detail}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {slide.type === 'recovery' && (
                    <div className="slide-content grid md:grid-cols-2 gap-12 items-center">
                        <div className="text-center md:text-left">
                            <h2 className="text-3xl sm:text-5xl font-black text-blue-400">{slide.title}</h2>
                        </div>
                        <div className="space-y-8">
                            {slide.points.map((point, i) => (
                                 <div key={i} className={`p-6 rounded-xl ${i === 0 ? 'bg-blue-900/30 border-2 border-blue-500' : 'bg-gray-800'}`}>
                                    <h3 className="text-xl font-bold text-white">{point.title}</h3>
                                    <p className={`text-5xl font-black my-2 ${i === 0 ? 'text-blue-400' : 'text-white'}`}>{point.value}</p>
                                    <p className="text-gray-400 text-sm">{point.text}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
                
                {/* Omitido el slide de 'message' para brevedad en este ejemplo */}

              </div>
            </section>
          ))
        ))}

        {/* Controles de Navegación */}
        {slidesData[position.row-1] && slidesData[position.row-1][position.col] && <button onClick={() => navigate(-1, 0)} className="nav-button top-1/2 -translate-y-1/2 left-8 hidden md:flex" style={{top: '50%', transform: 'translateY(-50%)'}}>↑</button>}
        {slidesData[position.row+1] && slidesData[position.row+1][position.col] && <button onClick={() => navigate(1, 0)} className="nav-button top-1/2 -translate-y-1/2 right-8 hidden md:flex" style={{top: '50%', transform: 'translateY(-50%)'}}>↓</button>}
        {slidesData[position.row][position.col-1] && <button onClick={() => navigate(0, -1)} className="nav-button left-1/2 -translate-x-1/2 top-8 hidden md:flex" style={{left: '50%', transform: 'translateX(-50%)'}}>←</button>}
        {slidesData[position.row][position.col+1] && <button onClick={() => navigate(0, 1)} className="nav-button left-1/2 -translate-x-1/2 bottom-8 hidden md:flex" style={{left: '50%', transform: 'translateX(-50%)'}}>→</button>}
        
        <div id="progressBar" className="progress-bar" style={{ width: `${progressPercentage}%` }}></div>
      </div>
    </>
  );
}
