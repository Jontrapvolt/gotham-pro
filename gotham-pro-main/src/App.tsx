/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Reveal, { StaggerGroup, staggerItem } from './components/Reveal';
import {
  Menu,
  X,
  Phone,
  Mail,
  MapPin,
  Check,
  ChevronDown,
  Building,
  Paintbrush,
  Compass,
  ShieldCheck,
  Award,
  ArrowRight,
  ArrowUpRight,
  Search,
  FileText,
  BadgePercent,
  CheckSquare,
  Instagram
} from 'lucide-react';
import { PROJECTS_DATA, SERVICES_DATA, TESTIMONIALS_DATA, FAQS_DATA, COVERAGE_DISTRICTS } from './data';
import BeforeAfterSlider from './components/BeforeAfterSlider';
import BudgetCalculator from './components/BudgetCalculator';
import Hero from './components/Hero';

const NAV_LINKS = [
  { label: 'Servicios', href: '#servicios' },
  { label: 'Portafolio', href: '#portafolio' },
  { label: 'Calculadora', href: '#calculadora' },
  { label: 'Garantía', href: '#testimonios' },
  { label: 'FAQs', href: '#faqs' }
];

export default function App() {
  // Navigation states
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Active Portfolio Filter
  const [activePortfolioFilter, setActivePortfolioFilter] = useState<string>('All');

  // Active Service Tab
  const [activeServiceTab, setActiveServiceTab] = useState<string>('s1');

  // FAQ Search & Accordion State
  const [faqSearch, setFaqSearch] = useState('');
  const [openFaqIds, setOpenFaqIds] = useState<string[]>(['f1']);
  const [faqCategory, setFaqCategory] = useState('All');

  // Project Details Expansion
  const [expandedProjectIds, setExpandedProjectIds] = useState<string[]>([]);

  // Form states
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    reformType: '',
    message: '',
    budgetInfo: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);
  const [submittedData, setSubmittedData] = useState<any>(null);

  // Ref to contact form for smooth scrolling
  const contactFormRef = useRef<HTMLDivElement>(null);

  // Scroll-aware header (transparent over hero → solid over light sections)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleToggleFaq = (id: string) => {
    if (openFaqIds.includes(id)) {
      setOpenFaqIds(openFaqIds.filter(item => item !== id));
    } else {
      setOpenFaqIds([...openFaqIds, id]);
    }
  };

  const handleToggleProjectDetails = (id: string) => {
    if (expandedProjectIds.includes(id)) {
      setExpandedProjectIds(expandedProjectIds.filter(pId => pId !== id));
    } else {
      setExpandedProjectIds([...expandedProjectIds, id]);
    }
  };

  // Populate data from budget calculator
  const handleApplyBudgetEstimation = (summary: string, propertyType: string, sqm: number, tier: string) => {
    let typeValue = 'integral';
    if (summary.toLowerCase().includes('cocina')) typeValue = 'cocina';
    else if (summary.toLowerCase().includes('baño')) typeValue = 'bano';
    else if (summary.toLowerCase().includes('oficina') || summary.toLowerCase().includes('local')) typeValue = 'oficina';

    setFormData({
      ...formData,
      reformType: typeValue,
      budgetInfo: summary,
      message: `Hola Gotham Perú. He calculado un presupuesto estimado de reforma para mi ${propertyType} de ${sqm}m² (Acabados ${tier.toUpperCase()}). Me gustaría agendar una consulta técnica in situ.`
    });

    // Smooth scroll to form
    setTimeout(() => {
      contactFormRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      alert('Por favor complete su nombre y número de teléfono.');
      return;
    }

    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setFormSuccess(true);
      setSubmittedData({ ...formData });
    }, 1200);
  };

  const handleResetForm = () => {
    setFormData({
      name: '',
      phone: '',
      reformType: '',
      message: '',
      budgetInfo: ''
    });
    setFormSuccess(false);
    setSubmittedData(null);
  };

  // Filtered portfolio
  const filteredProjects = activePortfolioFilter === 'All'
    ? PROJECTS_DATA
    : PROJECTS_DATA.filter(p => p.category === activePortfolioFilter);

  // Filtered FAQs
  const filteredFAQs = FAQS_DATA.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(faqSearch.toLowerCase()) ||
                          faq.answer.toLowerCase().includes(faqSearch.toLowerCase());
    const matchesCategory = faqCategory === 'All' || faq.category === faqCategory;
    return matchesSearch && matchesCategory;
  });

  // Active Service Details
  const activeService = SERVICES_DATA.find(s => s.id === activeServiceTab) || SERVICES_DATA[0];

  const getLucideIcon = (name: string) => {
    const cls = 'w-6 h-6 text-gold';
    switch (name) {
      case 'Architecture':
        return <Compass className={cls} />;
      case 'Countertops':
        return <Building className={cls} />;
      case 'Bathtub':
        return <Building className={cls} />;
      case 'MeetingRoom':
        return <Building className={cls} />;
      case 'FormatPaint':
        return <Paintbrush className={cls} />;
      default:
        return <Compass className={cls} />;
    }
  };

  // WhatsApp rich link generator
  const getWhatsAppLink = () => {
    const defaultText = "Hola Gotham Perú, me gustaría solicitar un presupuesto gratis para mi proyecto de reforma.";
    const detailText = formData.message
      ? `${formData.message} - Mi teléfono es ${formData.phone}`
      : defaultText;
    return `https://wa.me/51948238136?text=${encodeURIComponent(detailText)}`;
  };

  return (
    <div className="bg-paper text-ink font-sans text-sm antialiased min-h-screen flex flex-col">

      {/* ============================ HEADER ============================ */}
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-cream/85 backdrop-blur-md border-b border-line'
            : 'bg-transparent border-b border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex justify-between items-center w-full py-4">

          {/* Logo Brand */}
          <a href="#" className="flex items-center gap-3 group shrink-0">
            <div className="logo-chip p-1.5">
              <img
                src="/images/logo-gotham.jpg"
                alt="Gotham Perú"
                className="h-9 w-auto select-none block mix-blend-multiply"
              />
            </div>
            <span className="font-mono text-[9px] tracking-[0.4em] mt-0.5 hidden sm:inline text-gold-deep">
              PERÚ
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="px-4 py-2 rounded-full text-[13px] tracking-wide transition-colors duration-300 text-ink-soft hover:text-ink hover:bg-sand"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Right cluster: phone + CTA */}
          <div className="hidden lg:flex items-center gap-5 shrink-0">
            <a
              href="tel:948238136"
              className="flex items-center gap-2 transition-colors text-ink-soft hover:text-ink"
            >
              <Phone className="w-3.5 h-3.5 text-gold" />
              <span className="font-mono text-xs font-medium">948 238 136</span>
            </a>
            <a
              href="#contacto"
              className="gold-glow flex items-center gap-1.5 px-5 py-2.5 rounded-full text-[13px] text-cream bg-ink hover:bg-gold-deep transition-colors duration-300 font-medium"
            >
              Contacto
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Mobile menu trigger */}
          <div className="lg:hidden flex items-center gap-4">
            <a href="tel:948238136" className="text-gold p-1">
              <Phone className="w-4 h-4" />
            </a>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="transition-colors text-ink"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Panel */}
        <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="lg:hidden bg-cream border-b border-line absolute top-full left-0 w-full flex flex-col py-6 px-6 gap-1 shadow-xl">
            {NAV_LINKS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-ink font-display text-lg py-2.5 border-b border-line"
              >
                {item.label}
              </a>
            ))}
            <div className="pt-5 flex flex-col gap-3">
              <a
                href="https://wa.me/51948238136"
                target="_blank"
                rel="noreferrer"
                className="w-full text-center bg-[#128C7E] text-white py-3 text-xs font-mono tracking-widest uppercase rounded-full"
              >
                WhatsApp Rápido
              </a>
              <a
                href="#contacto"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full text-center bg-ink text-cream py-3 text-xs font-mono tracking-widest uppercase rounded-full"
              >
                Consulta Técnica
              </a>
            </div>
          </motion.div>
        )}
        </AnimatePresence>
      </header>

      {/* ============================ HERO (glassmorphism) ============================ */}
      <Hero />

      {/* ============================ TRUST BAR ============================ */}
      <section className="py-16 px-4 md:px-8 bg-cream border-b border-line">
        <StaggerGroup className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-y-10 gap-x-8 divide-line md:divide-x">
          {[
            { icon: <Award className="w-6 h-6 text-gold" />, value: '15+', label: 'Años de Experiencia' },
            { icon: <Building className="w-6 h-6 text-gold" />, value: '150+', label: 'Proyectos de Lujo' },
            { icon: <ShieldCheck className="w-6 h-6 text-gold" />, value: '5 años', label: 'Garantía por Contrato' },
            { icon: <CheckSquare className="w-6 h-6 text-gold" />, value: '100%', label: 'Clientes Satisfechos' }
          ].map((stat, i) => (
            <motion.div key={i} variants={staggerItem} className="flex flex-col items-center text-center gap-2 md:px-4">
              {stat.icon}
              <span className="font-display text-4xl font-light text-ink leading-none mt-1">{stat.value}</span>
              <span className="font-mono text-[10px] tracking-[0.2em] text-ink-soft uppercase">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </StaggerGroup>
      </section>

      {/* ============================ SERVICES ============================ */}
      <section id="servicios" className="py-24 md:py-28 px-4 md:px-8 relative overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto">

          <Reveal className="mb-14 flex flex-col md:flex-row md:justify-between md:items-end gap-6 rule-top pt-8">
            <div>
              <span className="eyebrow block mb-3">01 — Nuestras Especialidades</span>
              <h2 className="font-display text-4xl md:text-5xl text-ink font-light leading-[1.05]">
                Arquitectura &amp;<br /><span className="italic">Construcción</span>
              </h2>
            </div>
            <p className="text-ink-soft max-w-md leading-relaxed">
              Ofrecemos un servicio llave en mano (Turnkey) que abarca desde la conceptualización de planos hasta la entrega final de la llave, garantizando el presupuesto sin sorpresas.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

            {/* Left Tabs selection */}
            <StaggerGroup className="lg:col-span-4 flex flex-col gap-2">
              {SERVICES_DATA.map((service) => {
                const isActive = service.id === activeServiceTab;
                return (
                  <motion.button
                    variants={staggerItem}
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.98 }}
                    key={service.id}
                    type="button"
                    onClick={() => setActiveServiceTab(service.id)}
                    className={`group p-5 text-left rounded-lg border transition-colors duration-300 flex items-center justify-between ${
                      isActive
                        ? 'bg-ink border-ink text-cream'
                        : 'bg-cream border-line text-ink hover:border-line-strong'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <span className={isActive ? '[&_svg]:text-gold-soft' : ''}>{getLucideIcon(service.iconName)}</span>
                      <span className="font-display text-lg font-normal">
                        {service.name}
                      </span>
                    </div>
                    <ArrowRight className={`w-4 h-4 transition-transform duration-300 ${isActive ? 'translate-x-1 text-gold-soft' : 'text-gold/40 group-hover:translate-x-1'}`} />
                  </motion.button>
                );
              })}
            </StaggerGroup>

            {/* Right detailed display */}
            <div className="lg:col-span-8 card-paper rounded-lg p-8 md:p-10 flex flex-col justify-between overflow-hidden">
              <AnimatePresence mode="wait">
              <motion.div
                key={activeServiceTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-line pb-5 mb-6">
                  <h3 className="font-display text-2xl md:text-3xl text-ink font-light">
                    {activeService.name}
                  </h3>
                  <div className="flex flex-col sm:items-end gap-1 font-mono text-[11px] text-ink-soft">
                    <span>TIMING · <strong className="text-ink font-medium">{activeService.typicalDuration}</strong></span>
                    <span>RANGO · <strong className="text-gold-deep font-medium">${activeService.averagePriceMin} – ${activeService.averagePriceMax} USD/m²</strong></span>
                  </div>
                </div>

                <p className="text-ink-soft leading-relaxed mb-7 text-[15px]">
                  {activeService.description}
                </p>

                <h4 className="eyebrow mb-4">
                  Proceso de ingeniería y acabado incluido
                </h4>

                <ul className="space-y-3 mb-8">
                  {activeService.fullDetails.map((detail, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Check className="w-4 h-4 text-gold mt-0.5 shrink-0" />
                      <span className="text-[13px] text-ink/85 leading-relaxed">{detail}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
              </AnimatePresence>

              <div className="pt-6 border-t border-line flex flex-col sm:flex-row gap-4 items-center justify-between">
                <p className="text-[11px] text-ink-faint leading-relaxed">
                  *Los valores estimados varían según el metraje total y la complejidad estructural.
                </p>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  type="button"
                  onClick={() => handleApplyBudgetEstimation(
                    `Reforma: ${activeService.name} - Estimación base $${activeService.averagePriceMin} - $${activeService.averagePriceMax} USD/m²`,
                    'Departamento',
                    100,
                    'premium'
                  )}
                  className="w-full sm:w-auto shrink-0 bg-ink text-cream rounded-full text-xs tracking-wide font-medium px-6 py-3 hover:bg-gold-deep transition-colors"
                >
                  Solicitar propuesta de diseño
                </motion.button>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* ============================ PORTFOLIO ============================ */}
      <section id="portafolio" className="py-24 md:py-28 px-4 md:px-8 bg-cream border-y border-line">
        <div className="max-w-7xl mx-auto">

          <Reveal className="mb-14 flex flex-col md:flex-row md:justify-between md:items-end gap-6 rule-top pt-8">
            <div>
              <span className="eyebrow block mb-3">02 — Portafolio de Obra</span>
              <h2 className="font-display text-4xl md:text-5xl text-ink font-light leading-[1.05]">
                Proyectos realizados<br /><span className="italic">en Lima</span>
              </h2>
            </div>

            {/* Portfolio Filter Nav */}
            <div className="flex flex-wrap gap-2">
              {['All', 'Integral', 'Cocinas', 'Baños', 'Oficinas'].map((filter) => (
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  key={filter}
                  type="button"
                  onClick={() => setActivePortfolioFilter(filter)}
                  className={`px-4 py-2 rounded-full font-mono text-[10px] tracking-wider uppercase transition-colors duration-300 border ${
                    activePortfolioFilter === filter
                      ? 'bg-ink text-cream border-ink'
                      : 'bg-paper text-ink-soft border-line hover:border-line-strong hover:text-ink'
                  }`}
                >
                  {filter === 'All' ? 'Ver Todos' : filter}
                </motion.button>
              ))}
            </div>
          </Reveal>

          {/* Portfolio Grid */}
          <motion.div layout className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => {
              const isExpanded = expandedProjectIds.includes(project.id);
              return (
                <motion.div
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  key={project.id}
                  id={`project-card-${project.id}`}
                  className="card-paper rounded-lg p-5 md:p-6 flex flex-col justify-between"
                >

                  {/* Before/After Slider Interaction */}
                  <BeforeAfterSlider
                    beforeImage={project.beforeImage}
                    afterImage={project.afterImage}
                    title={project.title}
                  />

                  {/* Details Card */}
                  <div className="mt-6">
                    <div className="flex justify-between items-start gap-2 mb-2">
                      <span className="font-mono text-[10px] text-gold-deep tracking-widest uppercase">
                        {project.district} • {project.areaSqm} m²
                      </span>
                      <span className="font-mono text-[10px] text-ink-faint">
                        ENTREGADO · {project.completionYear}
                      </span>
                    </div>

                    <h3 className="font-display text-xl md:text-2xl text-ink font-normal mb-3 leading-snug">
                      {project.title}
                    </h3>

                    <p className="text-[13px] text-ink-soft leading-relaxed line-clamp-3">
                      {project.description}
                    </p>

                    {/* Expandable Technical Highlights */}
                    <div className="mt-4 border-t border-line pt-4">
                      <motion.button
                        whileTap={{ scale: 0.98 }}
                        type="button"
                        onClick={() => handleToggleProjectDetails(project.id)}
                        className="flex items-center justify-between w-full text-gold-deep hover:text-ink font-mono text-[10px] uppercase tracking-widest transition-colors"
                      >
                        <span>{isExpanded ? 'Ocultar Destacados de Obra' : 'Ver Destacados de Obra'}</span>
                        <motion.span animate={{ rotate: isExpanded ? 180 : 0 }} transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}>
                          <ChevronDown className="w-3.5 h-3.5" />
                        </motion.span>
                      </motion.button>

                      <AnimatePresence initial={false}>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                          className="overflow-hidden"
                        >
                        <div className="mt-4 bg-sand rounded-md p-4 space-y-3">
                          <div className="flex justify-between text-[11px] border-b border-line pb-2">
                            <span className="text-ink-soft">Cliente:</span>
                            <span className="font-medium text-ink">{project.clientName}</span>
                          </div>

                          <h4 className="eyebrow">
                            Sistemas &amp; Acabados Ejecutados
                          </h4>
                          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
                            {project.highlights.map((highlight, index) => (
                              <li key={index} className="flex items-center gap-2 text-ink/90">
                                <Check className="w-3 h-3 text-gold shrink-0" />
                                <span>{highlight}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        </motion.div>
                      )}
                      </AnimatePresence>
                    </div>
                  </div>

                  {/* Form apply CTA inside project card */}
                  <div className="mt-6 pt-4 border-t border-line flex justify-between items-center gap-4">
                    <span className="text-[10px] font-mono text-ink-faint uppercase tracking-wider">
                      Reforma de Autor
                    </span>
                    <button
                      type="button"
                      onClick={() => handleApplyBudgetEstimation(
                        `Reforma inspirada en ${project.title} (${project.district})`,
                        project.category === 'Oficinas' ? 'Oficina' : 'Departamento',
                        project.areaSqm,
                        'ultra'
                      )}
                      className="text-gold-deep hover:text-ink font-mono text-[10px] tracking-widest uppercase font-medium inline-flex items-center gap-1.5 transition-colors"
                    >
                      Presupuesto Similar
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>

                </motion.div>
              );
            })}
            </AnimatePresence>
          </motion.div>

        </div>
      </section>

      {/* ============================ BUDGET CALCULATOR ============================ */}
      <section id="calculadora" className="py-24 md:py-28 px-4 md:px-8 relative overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto">
          <Reveal className="text-center mb-14 max-w-2xl mx-auto">
            <span className="eyebrow block mb-3">03 — Transparencia de Costos</span>
            <h2 className="font-display text-4xl md:text-5xl text-ink font-light leading-[1.05]">
              Diseñe el presupuesto <span className="italic">de su próxima obra</span>
            </h2>
            <p className="text-ink-soft mt-4 leading-relaxed">
              Seleccione el tipo de espacio, deslice los metros cuadrados, configure la calidad y reciba un desglose inmediato alineado con las tarifas reales de mano de obra y materiales importados en el Perú.
            </p>
          </Reveal>

          {/* Embedded Custom Budget Calculator Component */}
          <Reveal delay={0.1}>
            <BudgetCalculator onApplyEstimation={handleApplyBudgetEstimation} />
          </Reveal>

        </div>
      </section>

      {/* ============================ TESTIMONIALS & PROCESS ============================ */}
      <section id="testimonios" className="py-24 md:py-28 px-4 md:px-8 bg-cream border-y border-line">
        <div className="max-w-7xl mx-auto">
          <Reveal className="text-center mb-14">
            <span className="eyebrow block mb-3">04 — Clientes Satisfechos</span>
            <h2 className="font-display text-4xl md:text-5xl text-ink font-light leading-[1.05]">
              Casos de éxito <span className="italic">en Lima premium</span>
            </h2>
          </Reveal>

          <StaggerGroup className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS_DATA.map((t) => (
              <motion.div
                variants={staggerItem}
                key={t.id}
                className="card-paper rounded-lg p-8 flex flex-col justify-between"
              >
                <div>
                  <div className="flex gap-1 mb-6">
                    {[...Array(t.rating)].map((_, i) => (
                      <span key={i} className="text-gold text-lg">★</span>
                    ))}
                  </div>
                  <p className="font-display text-ink/90 italic leading-relaxed text-lg mb-8">
                    “{t.quote}”
                  </p>
                </div>
                <div className="border-t border-line pt-4 flex items-center justify-between">
                  <div>
                    <h4 className="font-display text-base text-ink font-medium">
                      {t.name}
                    </h4>
                    <span className="font-mono text-[9px] text-ink-faint uppercase tracking-wider">
                      {t.location}
                    </span>
                  </div>
                  <span className="font-mono text-[9px] bg-sand text-gold-deep uppercase tracking-widest px-2.5 py-1 rounded-full">
                    {t.projectType}
                  </span>
                </div>
              </motion.div>
            ))}
          </StaggerGroup>

          {/* PROCESS METHODOLOGY */}
          <div className="mt-20 pt-14 border-t border-line">
            <Reveal>
              <h3 className="font-display text-2xl md:text-3xl text-ink font-light text-center mb-14">
                Nuestro riguroso <span className="italic">proceso de obra</span>
              </h3>
            </Reveal>

            <StaggerGroup className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { n: '01', t: 'Diagnóstico e Inspección', d: 'Evaluamos la estructura in situ, realizamos levantamiento 3D milimétrico de muros y verificamos factibilidad técnica municipal.' },
                { n: '02', t: 'Planos y Presupuesto', d: 'Presentamos fotorrealismos 3D detallados, muestras físicas de piedra natural/madera y un presupuesto estricto llave en mano sin sorpresas.' },
                { n: '03', t: 'Ejecución Residente', d: 'Coordinamos demolición controlada y construcción diaria supervisada por arquitecto residente, con reportes semanales al propietario.' },
                { n: '04', t: 'Control & Entrega de Llave', d: 'Limpieza profunda post-obra, pruebas de estanqueidad/iluminación, firma de conformidad y entrega de póliza de garantía escrita por 5 años.' }
              ].map((step) => (
                <motion.div variants={staggerItem} key={step.n} className="flex flex-col gap-3">
                  <span className="font-display text-5xl text-gold/50 font-light leading-none">
                    {step.n}
                  </span>
                  <h4 className="font-display text-lg text-ink font-normal mt-1">
                    {step.t}
                  </h4>
                  <p className="text-[13px] text-ink-soft leading-relaxed">
                    {step.d}
                  </p>
                </motion.div>
              ))}
            </StaggerGroup>
          </div>

        </div>
      </section>

      {/* ============================ FAQS ============================ */}
      <section id="faqs" className="py-24 md:py-28 px-4 md:px-8">
        <div className="max-w-4xl mx-auto">

          <Reveal className="text-center mb-12">
            <span className="eyebrow block mb-3">05 — Centro de Información</span>
            <h2 className="font-display text-4xl md:text-5xl text-ink font-light leading-[1.05]">
              Preguntas <span className="italic">frecuentes</span>
            </h2>
          </Reveal>

          {/* Search bar and Category Tabs */}
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between mb-8 card-paper rounded-lg p-4">
            <div className="relative w-full sm:w-1/2">
              <Search className="w-4 h-4 text-gold absolute left-3 top-3.5" />
              <input
                type="text"
                placeholder="Buscar duda técnica..."
                value={faqSearch}
                onChange={(e) => setFaqSearch(e.target.value)}
                className="w-full bg-paper border border-line rounded-md pl-10 pr-4 py-3 text-xs text-ink placeholder-ink-faint focus:outline-none focus:border-gold transition-colors"
              />
            </div>

            <div className="flex gap-1.5 flex-wrap justify-end">
              {['All', 'Proceso', 'Legal', 'Materiales y Costos', 'Garantía'].map((category) => (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  key={category}
                  type="button"
                  onClick={() => setFaqCategory(category)}
                  className={`px-3 py-1.5 rounded-full font-mono text-[9px] uppercase tracking-wider transition-colors duration-300 ${
                    faqCategory === category
                      ? 'bg-ink text-cream'
                      : 'text-ink-soft hover:text-ink hover:bg-sand'
                  }`}
                >
                  {category === 'All' ? 'Ver Todas' : category}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Accordion container */}
          <div className="space-y-3">
            {filteredFAQs.length > 0 ? (
              filteredFAQs.map((faq) => {
                const isOpen = openFaqIds.includes(faq.id);
                return (
                  <div
                    key={faq.id}
                    className="card-paper rounded-lg overflow-hidden"
                  >
                    <button
                      type="button"
                      onClick={() => handleToggleFaq(faq.id)}
                      className="w-full flex justify-between items-center text-left p-5 hover:bg-sand/50 transition-colors"
                    >
                      <span className="font-display text-lg text-ink font-normal pr-4">
                        {faq.question}
                      </span>
                      <motion.span animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}>
                        <ChevronDown className="w-4 h-4 text-gold shrink-0" />
                      </motion.span>
                    </button>

                    <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 pb-5 pt-1 text-[13px] text-ink-soft leading-relaxed border-t border-line">
                          <p className="pt-4">{faq.answer}</p>
                        </div>
                      </motion.div>
                    )}
                    </AnimatePresence>
                  </div>
                );
              })
            ) : (
              <div className="text-center py-12 text-ink-soft border border-dashed border-line-strong rounded-lg">
                No se encontraron respuestas para "{faqSearch}". Intente con términos más genéricos como "licencia" o "garantía".
              </div>
            )}
          </div>

        </div>
      </section>

      {/* ============================ COVERAGE DISTRICTS ============================ */}
      <section className="py-20 px-4 md:px-8 bg-cream border-y border-line">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          <Reveal className="lg:col-span-4">
            <span className="eyebrow block mb-3">06 — Despliegue Operativo</span>
            <h3 className="font-display text-3xl text-ink font-light mb-4 leading-tight">
              Cobertura &amp; trámites <span className="italic">en Lima</span>
            </h3>
            <p className="text-[13px] text-ink-soft leading-relaxed">
              La burocracia municipal varía sustancialmente en cada distrito. Gotham Perú cuenta con un equipo legal que gestiona de manera ágil los expedientes técnicos específicos para evitar paralizaciones innecesarias de obra.
            </p>
          </Reveal>

          <StaggerGroup className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {COVERAGE_DISTRICTS.map((district, index) => (
              <motion.div variants={staggerItem} key={index} className="card-paper rounded-lg p-4 flex flex-col justify-between">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-display text-lg text-ink font-normal">
                    {district.name}
                  </span>
                  <span className="font-mono text-[9px] text-gold-deep bg-sand px-2 py-0.5 rounded-full uppercase tracking-wider">
                    {district.status}
                  </span>
                </div>
                <span className="text-[11px] text-ink-soft font-mono">
                  {district.time}
                </span>
              </motion.div>
            ))}
          </StaggerGroup>

        </div>
      </section>

      {/* ============================ CONTACT (dark) ============================ */}
      <section
        ref={contactFormRef}
        id="contacto"
        className="py-24 md:py-28 px-4 md:px-8 relative overflow-hidden bg-night"
      >
        {/* Ambient gold glow */}
        <div className="absolute inset-0 z-0 opacity-70" style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(169,129,75,0.14), transparent 70%)' }} />

        <div className="relative z-10 max-w-4xl mx-auto">

          <Reveal className="text-center mb-12">
            <span className="eyebrow text-gold-soft block mb-3">07 — Rigor Arquitectónico</span>
            <h2 className="font-display text-4xl md:text-5xl text-on-night font-light leading-[1.05]">
              Empiece su reforma <span className="italic">hoy</span>
            </h2>
            <p className="text-on-night-soft max-w-lg mx-auto mt-4 leading-relaxed">
              Solicite una consulta de viabilidad técnica e inspección de obra sin compromiso.
            </p>
          </Reveal>

          <AnimatePresence mode="wait">
          {formSuccess ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="bg-night-2 p-8 md:p-12 border border-night-line rounded-xl text-center max-w-2xl mx-auto"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.15, type: 'spring', stiffness: 260, damping: 20 }}
                className="w-16 h-16 rounded-full border border-gold bg-night flex items-center justify-center mx-auto mb-6"
              >
                <Check className="w-8 h-8 text-gold" />
              </motion.div>

              <h3 className="font-display text-2xl text-on-night font-normal mb-3">
                ¡Solicitud de consulta recibida!
              </h3>

              <p className="text-[13px] text-on-night-soft leading-relaxed mb-6">
                Gracias, <strong className="text-on-night">{submittedData?.name}</strong>. Un arquitecto colegiado residente de Gotham Perú se pondrá en contacto al teléfono <strong className="text-on-night">{submittedData?.phone}</strong> dentro de las próximas 24 horas hábiles para coordinar la inspección in situ de su propiedad.
              </p>

              {submittedData?.budgetInfo && (
                <div className="bg-night p-4 border border-night-line rounded-lg text-left mb-6 font-mono text-[11px] text-gold-soft">
                  <strong>Resumen de Estimación de Presupuesto:</strong>
                  <p className="mt-2 text-on-night">{submittedData.budgetInfo}</p>
                </div>
              )}

              {/* Simulation download checklist */}
              <div className="bg-night p-4 border border-night-line rounded-lg mb-8 flex items-center justify-between gap-4 text-left">
                <div className="flex items-center gap-3">
                  <FileText className="w-6 h-6 text-gold shrink-0" />
                  <div>
                    <h4 className="font-mono text-[10px] uppercase tracking-wider text-on-night">
                      Guía Exclusiva de Reforma PDF
                    </h4>
                    <p className="text-[10px] text-on-night-soft">
                      Lista de verificación de acabados y normativa de Lima
                    </p>
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="button"
                  onClick={() => alert('Su descarga simulada del PDF de Reforma de Gotham Perú ha comenzado. ¡Consulte su carpeta de descargas!')}
                  className="bg-night-2 border border-gold/30 text-gold-soft hover:text-on-night px-3 py-1.5 text-[9px] font-mono uppercase tracking-wider rounded-full transition-colors"
                >
                  Descargar
                </motion.button>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.a
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  href={getWhatsAppLink()}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-[#128C7E] hover:bg-[#0f766e] text-white font-mono text-[11px] uppercase tracking-wider px-6 py-3.5 rounded-full inline-flex items-center justify-center gap-2 transition-colors"
                >
                  Confirmar por WhatsApp
                </motion.a>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  type="button"
                  onClick={handleResetForm}
                  className="border border-gold/30 text-gold-soft hover:text-on-night font-mono text-[11px] uppercase tracking-wider px-6 py-3.5 rounded-full transition-colors"
                >
                  Nueva Consulta
                </motion.button>
              </div>

            </motion.div>
          ) : (
            <motion.form
              key="form"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              onSubmit={handleFormSubmit}
              className="bg-night-2 p-8 md:p-12 border border-night-line rounded-xl flex flex-col gap-8 shadow-2xl"
            >

              {formData.budgetInfo && (
                <div className="bg-night p-4 border border-gold/25 rounded-lg flex items-center justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <BadgePercent className="w-5 h-5 text-gold shrink-0" />
                    <span className="font-mono text-[11px] text-gold-soft uppercase tracking-wider">
                      Presupuesto aplicado desde calculadora
                    </span>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="button"
                    onClick={() => setFormData({ ...formData, budgetInfo: '', message: '' })}
                    className="text-[10px] font-mono text-on-night-soft underline hover:text-on-night transition-colors"
                  >
                    Quitar
                  </motion.button>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                {/* Full name */}
                <div className="relative">
                  <label className="eyebrow text-gold-soft mb-2 block">
                    Nombre Completo *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Su nombre completo"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-transparent border-b border-night-line focus:border-gold focus:outline-none px-0 py-2.5 text-on-night placeholder-on-night-soft/60 transition-colors text-sm"
                  />
                </div>

                {/* Telephone */}
                <div className="relative">
                  <label className="eyebrow text-gold-soft mb-2 block">
                    Teléfono de Contacto *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="948 238 136"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-transparent border-b border-night-line focus:border-gold focus:outline-none px-0 py-2.5 text-on-night placeholder-on-night-soft/60 transition-colors font-mono text-sm"
                  />
                </div>

              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                {/* Reform type dropdown */}
                <div className="relative">
                  <label className="eyebrow text-gold-soft mb-2 block">
                    Tipo de Reforma
                  </label>
                  <select
                    value={formData.reformType}
                    onChange={(e) => setFormData({ ...formData, reformType: e.target.value })}
                    className="w-full bg-night border-b border-night-line focus:border-gold focus:outline-none px-2 py-3 text-on-night transition-colors text-sm appearance-none cursor-pointer rounded-t-md"
                  >
                    <option value="">Seleccione especialidad</option>
                    <option value="integral">Reforma Integral de Vivienda</option>
                    <option value="cocina">Cocina Gourmet Minimalista</option>
                    <option value="bano">Baño de Autor Wellness Spa</option>
                    <option value="oficina">Acondicionamiento Oficinas / Locales</option>
                    <option value="revestimientos">Pintura de Autor &amp; Revestimiento</option>
                  </select>
                </div>

                {/* Project location */}
                <div className="relative">
                  <label className="eyebrow text-gold-soft mb-2 block">
                    Ubicación del Proyecto (Distrito)
                  </label>
                  <input
                    type="text"
                    placeholder="Ej. Miraflores, San Isidro, Surco..."
                    className="w-full bg-transparent border-b border-night-line focus:border-gold focus:outline-none px-0 py-2.5 text-on-night placeholder-on-night-soft/60 transition-colors text-sm"
                  />
                </div>

              </div>

              {/* Message */}
              <div className="relative">
                <label className="eyebrow text-gold-soft mb-2 block">
                  Mensaje o Especificación de Obra (Opcional)
                </label>
                <textarea
                  rows={3}
                  placeholder="Describa el metraje, estado actual de la propiedad, materiales de preferencia y timing esperado..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-transparent border-b border-night-line focus:border-gold focus:outline-none px-0 py-2.5 text-on-night placeholder-on-night-soft/60 transition-colors text-sm resize-none"
                />
              </div>

              <div className="flex flex-col gap-4 pt-2">
                <motion.button
                  whileHover={{ scale: isSubmitting ? 1 : 1.01 }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                  type="submit"
                  disabled={isSubmitting}
                  className="gold-glow w-full justify-center items-center bg-gold text-night rounded-full py-4 font-medium text-sm tracking-wide transition-colors duration-300 hover:bg-gold-soft cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? 'Procesando solicitud de reforma...' : 'Solicitar Consulta Técnica Gratuita'}
                </motion.button>

                <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] text-on-night-soft italic font-mono border-t border-night-line pt-4">
                  <span>* Al enviar, acepta la evaluación de factibilidad in situ por arquitecto residente.</span>
                  <a
                    href={getWhatsAppLink()}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 text-gold-soft hover:text-on-night transition-colors not-italic font-sans text-[11px]"
                  >
                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    O contáctenos de inmediato por WhatsApp
                  </a>
                </div>
              </div>

            </motion.form>
          )}
          </AnimatePresence>

        </div>
      </section>

      {/* ============================ FOOTER (dark) ============================ */}
      <footer className="bg-night text-on-night py-16 px-4 md:px-8 mt-auto border-t border-night-line">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-10">

          {/* Col 1: Brand Info */}
          <div className="md:col-span-4 flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <div className="logo-chip p-2">
                <img
                  src="/images/logo-gotham.jpg"
                  alt="Gotham Perú"
                  className="h-14 w-auto select-none block mix-blend-multiply"
                />
              </div>
              <span className="font-mono text-[9px] tracking-[0.4em] text-gold-soft mt-0.5">
                PERÚ
              </span>
            </div>

            <p className="text-[13px] text-on-night-soft leading-relaxed">
              Gotham Perú es la constructora boutique líder en reformas integrales, acabados continuos y carpintería de autor frente al mar. Diseñamos con un espíritu de permanencia arquitectónica y lujo discreto.
            </p>

            <div className="flex items-center gap-3 text-xs text-on-night-soft">
              <span className="font-mono text-[10px] tracking-wider text-gold-soft uppercase">Síganos</span>
              <a href="#" className="hover:text-on-night transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Direct Contacts */}
          <div className="md:col-span-4 flex flex-col gap-4">
            <h4 className="font-mono text-[11px] uppercase tracking-widest text-on-night border-b border-night-line pb-2">
              Contacto Directo
            </h4>
            <div className="space-y-3 text-[13px] text-on-night-soft">
              <a href="tel:948238136" className="flex items-center gap-3 hover:text-on-night transition-colors">
                <Phone className="w-4 h-4 text-gold shrink-0" />
                <span className="font-mono">948 238 136</span>
              </a>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-gold shrink-0" />
                <span>contacto@gothamperu.com</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-gold shrink-0" />
                <span>Lima, Perú (Operamos a nivel metropolitano)</span>
              </div>
            </div>

            <h4 className="font-mono text-[10px] uppercase tracking-widest text-on-night mt-4">
              Zonas de Servicio Frecuente
            </h4>
            <p className="text-[11px] text-on-night-soft leading-relaxed">
              Casuarinas, Chacarilla, Monterrico, Golf de San Isidro, El Olivar, Miraflores Malecón, San Borja, Barranco Bohemio.
            </p>
          </div>

          {/* Col 3: Legals */}
          <div className="md:col-span-4 flex flex-col gap-4">
            <h4 className="font-mono text-[11px] uppercase tracking-widest text-on-night border-b border-night-line pb-2">
              Privacidad &amp; Legal
            </h4>
            <div className="flex flex-col gap-2.5 text-[12px] text-on-night-soft">
              <a href="#" className="hover:text-on-night transition-colors">Aviso de Privacidad</a>
              <a href="#" className="hover:text-on-night transition-colors">Términos y Condiciones de Obra</a>
              <a href="#" className="hover:text-on-night transition-colors">Libro de Reclamaciones</a>
              <a href="#" className="hover:text-on-night transition-colors">Manual de Mantenimiento Preventivo</a>
            </div>
            <div className="mt-4 bg-night-2 p-4 border border-night-line rounded-lg">
              <span className="font-mono text-[9px] uppercase tracking-wider text-gold-soft block mb-1">
                Registro Nacional de Construcción
              </span>
              <p className="text-[9px] text-on-night-soft font-mono">
                R.N.P. N° 382928-C • Colegiatura de Arquitectos CAP N° 28392
              </p>
            </div>
          </div>

        </div>

        {/* Sub-footer */}
        <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-night-line text-center flex flex-col sm:flex-row justify-between items-center gap-4 text-[11px] text-on-night-soft">
          <p>© 2026 GOTHAM PERÚ — Luxury Renovation &amp; Remodeling. Todos los derechos reservados.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-on-night transition-colors">Política de cookies</a>
            <span>•</span>
            <a href="#" className="hover:text-on-night transition-colors">Mapa del sitio</a>
          </div>
        </div>
      </footer>

    </div>
  );
}
