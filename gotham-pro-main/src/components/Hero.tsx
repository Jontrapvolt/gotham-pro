/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, ArrowUpRight, ArrowRight, ChevronRight } from 'lucide-react';
import { HERO_VIDEO_URL } from '../data';

/* Glassmorphism editorial hero — light ivory palette, bronze accents.
   Composition adapted from the RIVR reference: one full-bleed rounded panel
   with a video background, a soft light wash, a glass badge, a floating glass
   stat card, and a bottom-right corner cutout link. */

export default function Hero() {
  return (
    <div className="w-full min-h-[100dvh] flex items-center justify-center p-3 md:p-5 bg-paper">
      <section className="relative w-full max-w-[1536px] min-h-[640px] h-[calc(100dvh-1.5rem)] md:h-[calc(100dvh-2.5rem)] rounded-[1.5rem] md:rounded-[3rem] overflow-hidden flex flex-col items-center bg-cream group">

        {/* Video Background */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover object-[65%] lg:object-center z-0 transition-transform duration-[4s] ease-out group-hover:scale-105"
          src={HERO_VIDEO_URL}
        />

        {/* Soft light wash — keeps the panel bright and the ink text readable */}
        <div className="absolute inset-0 z-[1] bg-gradient-to-b from-paper/75 via-paper/15 to-paper/55 pointer-events-none" />
        <div className="absolute inset-0 z-[1] bg-gradient-to-tr from-paper/55 via-transparent to-transparent pointer-events-none" />

        {/* Content Layer */}
        <div className="relative z-10 w-full h-full flex flex-col items-center">

          {/* Text Container — minimal */}
          <div className="w-full flex flex-col items-center pt-28 md:pt-32 px-6 text-center max-w-4xl">

            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 backdrop-blur-md border border-white/40 mx-auto mb-5 w-fit shadow-sm"
            >
              <Sparkles className="w-4 h-4 text-gold-deep" />
              <span className="text-[13px] font-medium text-ink tracking-wide">Consulta Técnica Abierta</span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-6xl sm:text-7xl md:text-8xl lg:text-[112px] font-light text-ink mb-3 tracking-tight leading-[0.95]"
            >
              <span className="block">Transformamos</span>
              <span className="block italic text-gold-deep">tu espacio.</span>
            </motion.h1>

            {/* Subcopy — single short line */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-sm sm:text-base md:text-lg text-ink-soft leading-relaxed max-w-md font-normal"
            >
              Reformas integrales, cocinas y baños de autor en las zonas más exclusivas de Lima.
            </motion.p>

            {/* Primary CTA */}
            <motion.a
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.55 }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              href="#contacto"
              className="group/cta gold-glow mt-7 inline-flex items-center gap-2 bg-ink hover:bg-gold-deep text-cream rounded-full pl-6 pr-2 py-2 text-sm tracking-wide font-medium transition-colors duration-300"
            >
              Solicitar Consulta Gratuita
              <span className="bg-white/15 rounded-full p-1.5 flex items-center justify-center transition-transform duration-300 group-hover/cta:translate-x-0.5">
                <ArrowRight className="w-4 h-4" />
              </span>
            </motion.a>
          </div>

          {/* Bottom-left floating glass stat card */}
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="absolute bottom-28 right-4 left-auto md:left-6 md:right-auto md:bottom-6 lg:bottom-10 lg:left-10 p-4 lg:p-5 rounded-[1.5rem] lg:rounded-[2rem] bg-white/35 backdrop-blur-xl border border-white/40 flex flex-col gap-3 min-w-[150px] lg:min-w-[190px] w-fit shadow-lg"
          >
            <div className="flex flex-col">
              <span className="font-display text-3xl lg:text-4xl font-light text-ink tracking-tight leading-none">+150</span>
              <span className="text-[10px] md:text-[11px] font-medium text-ink-soft uppercase tracking-[0.18em] mt-1">Obras entregadas</span>
            </div>
            <motion.a
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              href="https://wa.me/51948238136"
              target="_blank"
              rel="noreferrer"
              className="flex items-center bg-white rounded-full pl-1.5 pr-5 py-1.5 gap-2 hover:bg-white/90 transition-colors self-start group/wa shadow-sm"
            >
              <span className="bg-gold/15 p-1 rounded-full flex items-center justify-center transition-transform duration-300 group-hover/wa:translate-x-0.5">
                <ArrowUpRight className="w-4 h-4 text-gold-deep" />
              </span>
              <span className="text-[13px] font-medium text-ink">WhatsApp</span>
            </motion.a>
          </motion.div>

          {/* Bottom-right corner cutout — link to portfolio */}
          <motion.a
            href="#portafolio"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="absolute bottom-0 right-0 p-4 pt-6 pl-10 sm:p-5 sm:pt-7 sm:pl-12 md:p-6 md:pt-8 md:pl-14 bg-paper rounded-tl-[1.5rem] sm:rounded-tl-[2rem] md:rounded-tl-[3.5rem] flex items-center gap-3 sm:gap-4 md:gap-6 group/doc"
          >
            {/* Corner intersection masks */}
            <div className="absolute -top-[1.5rem] sm:-top-[2rem] md:-top-[3.5rem] right-0 w-[1.5rem] sm:w-[2rem] md:w-[3.5rem] h-[1.5rem] sm:h-[2rem] md:h-[3.5rem] pointer-events-none">
              <svg width="100%" height="100%" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M56 56V0C56 30.9279 30.9279 56 0 56H56Z" fill="#F4F0E8"/></svg>
            </div>
            <div className="absolute bottom-0 -left-[1.5rem] sm:-left-[2rem] md:-left-[3.5rem] w-[1.5rem] sm:w-[2rem] md:w-[3.5rem] h-[1.5rem] sm:h-[2rem] md:h-[3.5rem] pointer-events-none">
              <svg width="100%" height="100%" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M56 56H0C30.9279 56 56 30.9279 56 0V56Z" fill="#F4F0E8"/></svg>
            </div>

            {/* Circle icon */}
            <div className="bg-ink/[0.04] w-11 h-11 md:w-14 md:h-14 rounded-full flex items-center justify-center border border-ink/10 transition-colors group-hover/doc:bg-ink/[0.08]">
              <ArrowUpRight className="w-5 h-5 md:w-6 md:h-6 text-ink transition-transform duration-300 group-hover/doc:translate-x-0.5 group-hover/doc:-translate-y-0.5" />
            </div>

            {/* Info column */}
            <div className="flex flex-col">
              <span className="font-display text-[17px] md:text-[22px] font-normal text-ink leading-tight">Portafolio</span>
              <span className="flex items-center gap-1 text-ink-soft group-hover/doc:text-gold-deep transition-colors">
                <span className="text-[12px] md:text-[14px] font-normal">Ver obras</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </motion.a>

        </div>
      </section>
    </div>
  );
}
