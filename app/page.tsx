'use client';

import React, { useState, useEffect, useCallback } from 'react';

// --- Iconos SVG para el diseño ---
const IconBriefcase = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>;
const IconChartBar = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>;
const IconCash = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" /></svg>;
const IconShieldCheck = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 20.944A12.02 12.02 0 0012 22a12.02 12.02 0 009-1.056c.343-.362.668-.74.98-1.134a11.955 11.955 0 00-1.968-13.79z" /></svg>;
const IconUserGroup = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>;
const IconLightBulb = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>;

type IconArrowProps = { direction: 'left' | 'right'; };
const IconArrow = ({ direction }: IconArrowProps) => {
    const rotations = { left: 'rotate-180', right: 'rotate-0' };
    return <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 transition-transform duration-300 ${rotations[direction]}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>;
};

type SlideData = { type: string; [key: string]: any; };

const slidesData: SlideData[] = [
  { type: 'title', mainTitle: "CASAS FABRICK", subtitle: "PLAN DE INVERSIÓN", slogan: "Construimos casas, construimos historias." },
  { type: 'vision', title: "Nuestra Visión", text: "Ser la empresa constructora líder en la Región del Maule, reconocida por nuestra calidad, transparencia y compromiso inquebrantable con la satisfacción del cliente, transformando el estándar de la construcción de viviendas." },
  { type: 'summary', title: "La Oportunidad de Inversión", points: [
      { icon: <IconCash />, title: "Inversión Inicial de $51.4M", text: "Para la adquisición de activos productivos clave que garantizan nuestra capacidad operativa desde el día uno." },
      { icon: <IconChartBar />, title: "Alta Rentabilidad Proyectada", text: "Utilidad neta anual estimada de $10.7M, con una recuperación de la inversión en activos en solo 4.7 años." },
      { icon: <IconBriefcase />, title: "Modelo de Negocio Seguro", text: "El flujo de caja positivo está garantizado por un anticipo del 55% en cada proyecto, eliminando el riesgo de liquidez." },
      { icon: <IconShieldCheck />, title: "Ventaja Competitiva Clara", text: "Nos diferenciamos a través de una calidad superior, procesos transparentes y una marca profesional y confiable." },
  ]},
  { type: 'problem', title: "El Dolor del Mercado Actual", points: ["Acabados deficientes y de baja calidad.", "Incumplimiento sistemático de los plazos de entrega.", "Pésimo servicio post-venta y falta de garantías.", "Falta de profesionalismo y comunicación clara."] },
  { type: 'solution', title: "Nuestra Solución: El Compromiso Fabrick", points: ["Maestros especialistas dedicados exclusivamente a terminaciones finas.", "Checklist de 200 puntos de calidad supervisado con el cliente.", "Dashboard de seguimiento en tiempo real para total transparencia.", "Garantía post-venta sólida y un equipo que responde."] },
  { type: 'market', title: "Una Oportunidad de Mercado Masiva", value: ">70%", description: "Del mercado de construcción de viviendas en la Región del Maule corresponde a proyectos de madera y metalcon.", conclusion: "No apuntamos a un nicho, sino a la mayor parte del mercado con una oferta de calidad superior." },
  { type: 'business_model', title: "Modelo de Negocio Simple y Efectivo", steps: [{ title: "Contacto y Cotización", text: "Atraemos clientes a través de marketing digital y generamos una cotización detallada." }, { title: "Anticipo del 55%", text: "Aseguramos el capital para materiales y mano de obra, garantizando flujo de caja positivo." }, { title: "Construcción y Seguimiento", text: "El cliente sigue el avance en su dashboard. Hitos de pago contra avance." }, { title: "Entrega y Post-Venta", text: "Entrega final con checklist de satisfacción y activación de nuestra garantía." }] },
  { type: 'competitive_advantage', title: "Nuestra Ventaja Competitiva", advantages: [{ icon: <IconLightBulb />, title: "Calidad Obsesiva", text: "Nuestro equipo de terminaciones es una ventaja estructural. No es un costo, es nuestra mejor herramienta de marketing." }, { icon: <IconUserGroup />, title: "Enfoque en el Cliente", text: "Desde el dashboard hasta la post-venta, todo el proceso está diseñado para generar confianza y satisfacción." }, { icon: <IconBriefcase />, title: "Marca Profesional", text: "A diferencia de la competencia informal, invertimos en una marca que comunica solidez, confianza y profesionalismo." }] },
  { type: 'marketing', title: "Estrategia de Adquisición de Clientes", channels: ["Publicidad segmentada en Redes Sociales (Instagram, Facebook) dirigida a personas con interés en construcción.", "Posicionamiento en Google (SEO y SEM) para búsquedas como 'construir casa en Maule'.", "Alianzas estratégicas con arquitectos y corredores de propiedades locales.", "Creación de contenido de valor: tours virtuales de obras, guías de construcción, etc."] },
  { type: 'investment', title: "Uso de los Fondos: $51.4M", items: [{ name: "Flota y Movilidad", amount: "$14.4M" }, { name: "Equipamiento de Construcción", amount: "$14.6M" }, { name: "Tecnología y Marketing", amount: "$7.8M" }, { name: "Infraestructura y Capital Inicial", amount: "$14.6M" }] },
  { type: 'roadmap', title: "Hoja de Ruta a 3 Años", phases: [{ year: "Año 1", goals: ["Consolidar operaciones con 4 proyectos en paralelo.", "Alcanzar el punto de equilibrio y rentabilidad.", "Posicionar la marca como referente de calidad en la región."] }, { year: "Año 2", goals: ["Expandir la capacidad a 6 proyectos en paralelo.", "Invertir en un taller de pre-fabricado para optimizar tiempos.", "Abrir una segunda oficina en una ciudad clave de la región."] }, { year: "Año 3", goals: ["Iniciar la exploración de proyectos de mayor envergadura (condominios pequeños).", "Desarrollar un sistema de franquicias del modelo Fabrick.", "Ser la empresa constructora con mayor satisfacción de cliente en Chile."] }] },
  { type: 'contact', title: "Construyamos Juntos", subtitle: "Estamos buscando socios estratégicos para revolucionar el mercado de la construcción.", email: "contacto@casasfabrick.cl", phone: "+56 9 3012 1625", slogan: "Casas Fabrick: Construimos casas, construimos historias." }
];

const SlideComponent = ({ slide, isCurrent }: { slide: SlideData, isCurrent: boolean }) => {
    const animationClass = (delay = 300) => `transition-all duration-700 ${isCurrent ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`;
    const SlideTitle = ({ text }: { text: string }) => <h2 className={`text-4xl md:text-5xl font-bold text-gray-900 mb-12 text-center ${animationClass()}`}>{text}</h2>;

    switch (slide.type) {
        case 'title':
            return (
                <div className="w-full h-full flex flex-col justify-center items-center text-center bg-white p-8">
                    <div className={animationClass(200)}>
                        <p className="text-lg font-semibold tracking-widest text-gray-500">{slide.subtitle}</p>
                        <h1 className="text-7xl md:text-9xl font-extrabold uppercase tracking-tighter my-4 text-gray-800">
                            {slide.mainTitle}
                        </h1>
                        <div className="h-1.5 w-24 bg-amber-500 mx-auto"></div>
                        <p className="text-2xl text-gray-600 font-light italic mt-6">{slide.slogan}</p>
                    </div>
                </div>
            );
        case 'vision':
             return (
                <div className="w-full max-w-5xl text-center">
                    <SlideTitle text={slide.title} />
                    <p className={`text-2xl md:text-3xl font-light text-gray-700 leading-relaxed italic ${animationClass(500)}`}>"{slide.text}"</p>
                </div>
            );
        case 'summary':
            return (
                <div className="w-full max-w-6xl">
                    <SlideTitle text={slide.title} />
                    <div className="grid md:grid-cols-2 gap-8">
                        {slide.points.map((point: any, i: number) => (
                            <div key={i} className={`flex items-start bg-white p-6 rounded-xl shadow-md ${animationClass(400 + i * 100)}`}>
                                <div className="flex-shrink-0 text-amber-500">{point.icon}</div>
                                <div className="ml-5">
                                    <h3 className="text-lg font-bold text-gray-900">{point.title}</h3>
                                    <p className="text-gray-600 mt-1">{point.text}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            );
        case 'problem':
            return (
                <div className="w-full max-w-4xl text-center">
                    <SlideTitle text={slide.title} />
                    <div className="space-y-4">
                        {slide.points.map((point: string, i: number) => (
                            <div key={i} className={`bg-red-50 border-l-4 border-red-400 text-red-800 p-4 text-left font-semibold text-lg rounded-r-md ${animationClass(400 + i * 100)}`}>
                                {point}
                            </div>
                        ))}
                    </div>
                </div>
            );
        case 'solution':
            return (
                <div className="w-full max-w-4xl text-center">
                    <SlideTitle text={slide.title} />
                    <div className="space-y-4">
                        {slide.points.map((point: string, i: number) => (
                            <div key={i} className={`bg-green-50 border-l-4 border-green-500 text-green-800 p-4 text-left font-semibold text-lg rounded-r-md ${animationClass(400 + i * 100)}`}>
                                {point}
                            </div>
                        ))}
                    </div>
                </div>
            );
        case 'market':
            return (
                <div className="w-full max-w-5xl">
                    <SlideTitle text={slide.title} />
                    <div className={`grid md:grid-cols-2 gap-10 items-center ${animationClass(400)}`}>
                        <div className="text-center md:text-left">
                            <p className="text-lg text-gray-600">{slide.description}</p>
                            <p className="text-xl text-gray-900 font-semibold mt-6 italic">{slide.conclusion}</p>
                        </div>
                        <div className="bg-gray-800 text-white p-10 rounded-xl shadow-2xl text-center">
                            <p className="text-7xl md:text-8xl font-bold text-amber-400">{slide.value}</p>
                            <p className="text-lg text-gray-300 mt-2">del Mercado Potencial</p>
                        </div>
                    </div>
                </div>
            );
        case 'business_model':
            return (
                <div className="w-full max-w-6xl">
                    <SlideTitle text={slide.title} />
                    <div className="grid md:grid-cols-4 gap-4 text-center">
                        {slide.steps.map((step: any, i: number) => (
                            <div key={i} className={`relative ${animationClass(400 + i * 100)}`}>
                                <div className="bg-white p-6 rounded-xl shadow-md h-full">
                                    <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-amber-400 text-gray-900 font-bold w-10 h-10 rounded-full flex items-center justify-center border-4 border-gray-100">{i + 1}</div>
                                    <h3 className="text-lg font-bold text-gray-900 mt-6">{step.title}</h3>
                                    <p className="text-gray-600 text-sm mt-2">{step.text}</p>
                                </div>
                                {i < slide.steps.length - 1 && <div className="hidden md:block absolute top-1/2 left-full -translate-y-1/2 text-gray-300 text-4xl mx-2">&rarr;</div>}
                            </div>
                        ))}
                    </div>
                </div>
            );
        case 'competitive_advantage':
            return (
                <div className="w-full max-w-6xl">
                    <SlideTitle text={slide.title} />
                    <div className="grid md:grid-cols-3 gap-8">
                        {slide.advantages.map((adv: any, i: number) => (
                            <div key={i} className={`bg-white p-8 rounded-xl shadow-md text-center ${animationClass(400 + i * 100)}`}>
                                <div className="w-20 h-20 bg-gray-100 rounded-full mx-auto flex items-center justify-center">{adv.icon}</div>
                                <h3 className="text-xl font-bold text-gray-900 mt-5">{adv.title}</h3>
                                <p className="text-gray-600 mt-2">{adv.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            );
        case 'marketing':
            return (
                <div className="w-full max-w-5xl">
                    <SlideTitle text={slide.title} />
                    <div className="space-y-4">
                        {slide.channels.map((channel: string, i: number) => (
                            <div key={i} className={`bg-white p-4 rounded-xl shadow-sm flex items-center ${animationClass(400 + i * 100)}`}>
                                <div className="bg-amber-400 text-gray-900 font-bold w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center mr-4">{i + 1}</div>
                                <p className="text-gray-700">{channel}</p>
                            </div>
                        ))}
                    </div>
                </div>
            );
        case 'investment':
            return (
                <div className="w-full max-w-5xl text-center">
                    <SlideTitle text={slide.title} />
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {slide.items.map((item: any, i: number) => (
                            <div key={i} className={`bg-white border-b-4 border-amber-400 p-6 shadow-lg rounded-lg ${animationClass(400 + i * 100)}`}>
                                <h3 className="text-md font-bold text-gray-800">{item.name}</h3>
                                <p className="text-3xl font-bold text-gray-900 mt-2">{item.amount}</p>
                            </div>
                        ))}
                    </div>
                </div>
            );
        case 'roadmap':
             return (
                <div className="w-full max-w-6xl">
                    <SlideTitle text={slide.title} />
                    <div className="grid md:grid-cols-3 gap-8">
                        {slide.phases.map((phase: any, i: number) => (
                            <div key={i} className={`bg-white p-6 rounded-xl shadow-lg border-t-4 border-amber-400 ${animationClass(400 + i * 100)}`}>
                                <h3 className="text-2xl font-bold text-gray-900">{phase.year}</h3>
                                <ul className="list-disc list-inside text-gray-600 mt-4 space-y-2">
                                    {phase.goals.map((goal: string, j: number) => <li key={j}>{goal}</li>)}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            );
        case 'contact':
            return (
                <div className="w-full max-w-5xl text-center">
                    <SlideTitle text={slide.title} />
                    <p className={`text-xl text-gray-600 mt-4 mb-10 max-w-xl mx-auto ${animationClass(400)}`}>{slide.subtitle}</p>
                    <div className={`bg-gray-800 text-white shadow-2xl p-8 max-w-sm mx-auto inline-block text-center rounded-xl ${animationClass(500)}`}>
                        <h3 className="text-xl font-bold text-amber-400 mb-4">Información de Contacto</h3>
                        <p className="text-gray-300 text-lg"><a href={`mailto:${slide.email}`} className="hover:text-amber-400">{slide.email}</a></p>
                        <p className="text-gray-300 text-lg mt-2"><a href={`tel:${slide.phone.replace(/\s/g, '')}`} className="hover:text-amber-400">{slide.phone}</a></p>
                    </div>
                     <p className={`text-xl text-gray-700 font-semibold mt-10 italic ${animationClass(600)}`}>"{slide.slogan}"</p>
                </div>
            );
        default:
            return <div className="text-center">Diapositiva no encontrada</div>;
    }
};

export default function PresentationPage() {
    const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
    const [touchStart, setTouchStart] = useState<number | null>(null);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkIsMobile = () => setIsMobile(window.innerWidth < 768);
        checkIsMobile();
        window.addEventListener('resize', checkIsMobile);
        return () => window.removeEventListener('resize', checkIsMobile);
    }, []);

    const navigate = useCallback((step: number) => {
        const newIndex = currentSlideIndex + step;
        if (newIndex >= 0 && newIndex < slidesData.length) {
            setCurrentSlideIndex(newIndex);
        }
    }, [currentSlideIndex]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowRight' || e.key === 'ArrowDown') navigate(1);
            else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') navigate(-1);
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [navigate]);
    
    const handleTouchStart = (e: React.TouchEvent) => setTouchStart(e.touches[0].clientX);
    const handleTouchMove = (e: React.TouchEvent) => {
        if (touchStart === null) return;
        const currentX = e.touches[0].clientX;
        const diffX = touchStart - currentX;
        if (Math.abs(diffX) > 50) {
            if (diffX > 0) navigate(1);
            else navigate(-1);
            setTouchStart(null);
        }
    };

    const GlobalStyles = () => (
        <style>{`
            :root { --main-bg: #F9FAFB; --accent-color: #D97706; }
            body, html { margin: 0; padding: 0; overflow: hidden; background-color: #ffffff; font-family: 'Inter', sans-serif; }
            .desktop-container { position: relative; height: 100vh; width: 100vw; overflow: hidden; }
            .slide-container {
                position: absolute; inset: 0;
                display: flex; justify-content: center; align-items: center;
                padding: 6rem 2rem;
                transition: transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
                background-color: var(--main-bg);
            }
            .slide-container:first-child { background-color: white; }

            .mobile-container {
                height: 100vh;
                overflow-y: auto;
                scroll-snap-type: y mandatory;
            }
            .mobile-slide {
                min-height: 100vh;
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 4rem 1.5rem;
                border-bottom: 1px solid #e5e7eb;
                scroll-snap-align: start;
                background-color: var(--main-bg);
            }
            .mobile-slide:first-child { background-color: white; }
            .mobile-slide:last-child { border-bottom: none; }
        `}</style>
    );

    const progressPercentage = ((currentSlideIndex + 1) / slidesData.length) * 100;

    if (isMobile) {
        return (
            <>
                <GlobalStyles />
                <div className="mobile-container">
                    {slidesData.map((slide, index) => (
                        <section key={index} className="mobile-slide">
                            <SlideComponent slide={slide} isCurrent={true} />
                        </section>
                    ))}
                </div>
            </>
        );
    }

    return (
        <>
            <GlobalStyles />
            <div 
                className="h-screen w-screen text-gray-800 bg-white"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
            >
                <div className="desktop-container">
                    {slidesData.map((slide, index) => (
                       <div 
                            key={index} 
                            className="slide-container"
                            style={{
                                transform: `translateX(${index < currentSlideIndex ? -25 : (index > currentSlideIndex ? 100 : 0)}%)`,
                                zIndex: index === currentSlideIndex ? 10 : (index < currentSlideIndex ? 1 : 5),
                                transition: 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
                            }}
                        >
                            <SlideComponent slide={slide} isCurrent={index === currentSlideIndex} />
                        </div>
                    ))}
                </div>

                <div className="fixed top-0 left-0 w-full z-30 p-4 pointer-events-none">
                    <div className="w-full bg-gray-200 h-1.5 rounded-full">
                        <div className="bg-amber-500 h-1.5 rounded-full" style={{ width: `${progressPercentage}%`, transition: 'width 0.5s' }}></div>
                    </div>
                </div>
                
                <div className="fixed bottom-0 left-0 w-full z-30 p-4 flex justify-between items-center">
                    <span className="text-sm font-bold text-gray-800">CASAS FABRICK</span>
                    <div className="flex items-center gap-2">
                        <button onClick={() => navigate(-1)} disabled={currentSlideIndex === 0} className="p-2 bg-white border rounded-full shadow-md disabled:opacity-50 hover:bg-gray-100 transition-opacity"><IconArrow direction="left" /></button>
                        <span className="text-sm font-semibold text-gray-600 mx-2">{currentSlideIndex + 1} / {slidesData.length}</span>
                        <button onClick={() => navigate(1)} disabled={currentSlideIndex === slidesData.length - 1} className="p-2 bg-white border rounded-full shadow-md disabled:opacity-50 hover:bg-gray-100 transition-opacity"><IconArrow direction="right" /></button>
                    </div>
                </div>
            </div>
        </>
    );
}
