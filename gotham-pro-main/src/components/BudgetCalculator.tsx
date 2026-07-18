/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'motion/react';

interface BudgetCalculatorProps {
  onApplyEstimation: (summary: string, propertyType: string, sqm: number, tier: string) => void;
}

export default function BudgetCalculator({ onApplyEstimation }: BudgetCalculatorProps) {
  const [propertyType, setPropertyType] = useState<string>('Departamento');
  const [sqm, setSqm] = useState<number>(100);
  const [qualityTier, setQualityTier] = useState<'premium' | 'ultra' | 'bespoke'>('premium');
  const [extras, setExtras] = useState<string[]>([]);
  const [estimatedCost, setEstimatedCost] = useState<number>(0);

  const propertyMultipliers: { [key: string]: number } = {
    'Departamento': 1.0,
    'Casa': 1.15,
    'Oficina': 0.85,
    'Local Comercial': 0.90
  };

  const tierPrices = {
    premium: 950, // USD per sqm
    ultra: 1700,
    bespoke: 2600
  };

  const extrasConfig = [
    { id: 'domotica', name: 'Domótica Completa (Lutron/Crestron)', price: 4800, desc: 'Control integral de luces, audio, cortinas y clima.' },
    { id: 'acustica', name: 'Aislamiento Acústico Profesional', price: 3500, desc: 'Doble panel de vidrio templado y lana de roca mineral.' },
    { id: 'clima', name: 'Climatización Central Frio/Calor', price: 6500, desc: 'Sistemas VRF invisibles empotrados en falso cielo.' },
    { id: 'marmol', name: 'Mármoles Exóticos Italianos', price: 5800, desc: 'Placas importadas bookmatch de veta dramática.' }
  ];

  const handleToggleExtra = (id: string) => {
    if (extras.includes(id)) {
      setExtras(extras.filter(item => item !== id));
    } else {
      setExtras([...extras, id]);
    }
  };

  // Recalculate cost
  useEffect(() => {
    const basePricePerSqm = tierPrices[qualityTier];
    const baseMultiplier = propertyMultipliers[propertyType] || 1.0;

    const baseConstructionCost = sqm * basePricePerSqm * baseMultiplier;

    // Extras cost
    const extrasTotalCost = extrasConfig
      .filter(item => extras.includes(item.id))
      .reduce((sum, item) => sum + item.price, 0);

    // Architectural design fee is 8% of construction
    const designFee = baseConstructionCost * 0.08;

    const total = baseConstructionCost + extrasTotalCost + designFee;
    setEstimatedCost(Math.round(total));
  }, [propertyType, sqm, qualityTier, extras]);

  // Animated price counter
  const animatedCost = useMotionValue(0);
  const displayedCost = useTransform(animatedCost, (v) => `$${Math.round(v).toLocaleString()}`);
  const displayedPen = useTransform(animatedCost, (v) => `S/. ${(Math.round(v) * 3.75).toLocaleString(undefined, { maximumFractionDigits: 0 })}`);

  useEffect(() => {
    const controls = animate(animatedCost, estimatedCost, { duration: 0.6, ease: [0.16, 1, 0.3, 1] });
    return controls.stop;
  }, [estimatedCost]);

  const getTierNameSpanish = (tier: string) => {
    if (tier === 'premium') return 'Materiales Premium Colección Nacional/Importado';
    if (tier === 'ultra') return 'Ultra-Luxury Mármoles y Chapas Importadas';
    return 'Bespoke Artístico con Diseñador Firmante';
  };

  const handleApply = () => {
    const activeExtrasNames = extrasConfig
      .filter(item => extras.includes(item.id))
      .map(item => item.name)
      .join(', ');

    const summaryText = `Estimación: ${propertyType} de ${sqm}m² - Calidad ${qualityTier.toUpperCase()} (${getTierNameSpanish(qualityTier)}). Extras: ${activeExtrasNames || 'Ninguno'}. Presupuesto estimado: $${estimatedCost.toLocaleString()} USD.`;
    onApplyEstimation(summaryText, propertyType, sqm, qualityTier);
  };

  const tierOptions = [
    { id: 'premium' as const, name: 'Premium · Obsidian Collection', price: tierPrices.premium, desc: 'Porcelanatos importados rectificados, cuarzo premium en tableros, grifería alemana Kohler/Hansgrohe estándar, carpintería nacional selecta de madera sólida.' },
    { id: 'ultra' as const, name: 'Ultra-Luxury · Aurum Vault', price: tierPrices.ultra, desc: 'Revestimientos completos de Dekton/Neolith en cocinas, mármol de Carrara o calacatta en baños, madera noble importada de roble, griferías suspendidas y perfiles de iluminación integrados.' },
    { id: 'bespoke' as const, name: 'Bespoke Monolith · Signature', price: tierPrices.bespoke, desc: 'Diseño de autor firmado, mármoles exóticos en libro, carpintería ebanista vaciada in situ, sistemas integrados invisibles, y control de ingeniería integral de nivel residencial privado.' }
  ];

  return (
    <div
      id="budget-calculator-container"
      className="card-paper rounded-xl p-6 md:p-10 relative"
    >
      <div className="border-b border-line pb-6 mb-8">
        <h3 className="font-display text-2xl md:text-3xl text-ink font-light mb-2">
          Calculadora de Presupuesto <span className="italic text-gold-deep">Quiet Luxury</span>
        </h3>
        <p className="text-[13px] text-ink-soft max-w-2xl leading-relaxed">
          Obtenga una estimación instantánea y de alta fidelidad basada en los metros cuadrados de su proyecto, el nivel de acabados deseado y la ubicación en zonas exclusivas de Lima.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* INPUTS PANEL */}
        <div className="lg:col-span-7 flex flex-col gap-7">
          {/* STEP 1: Property Type */}
          <div>
            <label className="eyebrow mb-3 block">
              1 — Tipo de Propiedad
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {Object.keys(propertyMultipliers).map((type) => (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  key={type}
                  type="button"
                  onClick={() => setPropertyType(type)}
                  className={`py-3 px-2 text-center text-[11px] rounded-md transition-colors duration-300 border font-medium ${
                    propertyType === type
                      ? 'bg-ink text-cream border-ink'
                      : 'bg-paper text-ink-soft border-line hover:border-line-strong hover:text-ink'
                  }`}
                >
                  {type}
                </motion.button>
              ))}
            </div>
          </div>

          {/* STEP 2: Square Meters Slider */}
          <div>
            <div className="flex justify-between items-center mb-3">
              <label className="eyebrow">
                2 — Dimensión del Espacio (m²)
              </label>
              <span className="font-display text-2xl text-ink font-normal leading-none">
                {sqm} <span className="text-sm text-ink-soft">m²</span>
              </span>
            </div>
            <input
              type="range"
              min="30"
              max="500"
              step="5"
              value={sqm}
              onChange={(e) => setSqm(Number(e.target.value))}
              className="range-gold w-full cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-ink-faint mt-2 font-mono">
              <span>30 m²</span>
              <span>150 m²</span>
              <span>300 m²</span>
              <span>500 m²</span>
            </div>
          </div>

          {/* STEP 3: Quality Tier */}
          <div>
            <label className="eyebrow mb-3 block">
              3 — Nivel de Acabado e Ingeniería
            </label>
            <div className="flex flex-col gap-3">
              {tierOptions.map((tier) => (
                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  key={tier.id}
                  type="button"
                  onClick={() => setQualityTier(tier.id)}
                  className={`text-left p-4 rounded-md border transition-colors duration-300 ${
                    qualityTier === tier.id
                      ? 'border-gold bg-sand'
                      : 'border-line bg-paper hover:border-line-strong'
                  }`}
                >
                  <div className="flex justify-between items-center mb-1 gap-3">
                    <span className="font-display text-base text-ink font-normal">
                      {tier.name}
                    </span>
                    <span className="font-mono text-xs text-gold-deep shrink-0">
                      ~${tier.price} USD/m²
                    </span>
                  </div>
                  <p className="text-[11px] text-ink-soft leading-relaxed">
                    {tier.desc}
                  </p>
                </motion.button>
              ))}
            </div>
          </div>

          {/* STEP 4: Extras */}
          <div>
            <label className="eyebrow mb-3 block">
              4 — Sistemas y Equipamientos Adicionales
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {extrasConfig.map((item) => {
                const isSelected = extras.includes(item.id);
                return (
                  <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    key={item.id}
                    type="button"
                    onClick={() => handleToggleExtra(item.id)}
                    className={`p-3 text-left rounded-md border transition-colors duration-300 flex flex-col justify-between ${
                      isSelected
                        ? 'border-gold bg-sand'
                        : 'border-line bg-paper hover:border-line-strong'
                    }`}
                  >
                    <div className="flex justify-between items-start w-full mb-1 gap-2">
                      <span className="text-[11px] font-medium text-ink leading-snug">
                        {item.name}
                      </span>
                      <span className="font-mono text-[10px] text-gold-deep shrink-0">
                        +${item.price.toLocaleString()}
                      </span>
                    </div>
                    <span className="text-[10px] text-ink-soft">
                      {item.desc}
                    </span>
                  </motion.button>
                );
              })}
            </div>
          </div>
        </div>

        {/* PRICE SUMMARY PANEL (dark) */}
        <div className="lg:col-span-5 bg-night rounded-xl p-6 md:p-7 border border-night-line flex flex-col justify-between">
          <div>
            <span className="eyebrow text-gold-soft block mb-1">
              Estimación en tiempo real
            </span>
            <h4 className="font-display text-xl text-on-night font-light border-b border-night-line pb-4 mb-4">
              Resumen del Proyecto
            </h4>

            <div className="space-y-3 text-[13px]">
              <div className="flex justify-between text-on-night-soft">
                <span>Tipo de Propiedad:</span>
                <span className="text-on-night font-mono">{propertyType}</span>
              </div>
              <div className="flex justify-between text-on-night-soft">
                <span>Metraje total:</span>
                <span className="text-on-night font-mono">{sqm} m²</span>
              </div>
              <div className="flex justify-between text-on-night-soft">
                <span>Nivel de acabados:</span>
                <span className="text-on-night font-mono capitalize">{qualityTier}</span>
              </div>
              <div className="flex justify-between text-on-night-soft">
                <span>Extras seleccionados:</span>
                <span className="text-on-night font-mono text-right">
                  {extras.length} ({extras.map(e => e.toUpperCase()).join(', ') || 'Ninguno'})
                </span>
              </div>
              <div className="flex justify-between text-on-night-soft pt-2 border-t border-night-line">
                <span>Diseño y Planos (8%):</span>
                <span className="text-on-night font-mono">
                  +${Math.round(sqm * tierPrices[qualityTier] * (propertyMultipliers[propertyType] || 1.0) * 0.08).toLocaleString()} USD
                </span>
              </div>
              <div className="flex justify-between text-on-night-soft">
                <span>Asistencia de Licencia:</span>
                <span className="text-gold-soft font-mono text-[11px] font-semibold uppercase">Incluido</span>
              </div>
            </div>
          </div>

          <div className="mt-8 border-t border-night-line pt-6">
            <div className="mb-5">
              <span className="font-mono text-[10px] text-on-night-soft uppercase tracking-widest block mb-2">
                Presupuesto Total Estimado (USD)
              </span>
              <div className="flex items-baseline gap-2">
                <motion.span className="font-display text-4xl md:text-5xl font-light text-on-night">
                  {displayedCost}
                </motion.span>
                <span className="text-xs text-gold-soft font-mono">USD</span>
              </div>
              <p className="text-[10px] text-on-night-soft mt-2 leading-relaxed">
                *Equivalente aproximado a <motion.span className="text-gold-soft">{displayedPen}</motion.span> PEN. Sujeto a inspección estructural in situ.
              </p>
            </div>

            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              type="button"
              onClick={handleApply}
              className="gold-glow w-full text-center bg-gold text-night rounded-full py-4 text-xs font-medium tracking-wide uppercase hover:bg-gold-soft transition-colors duration-300"
            >
              Aplicar a Consulta de Obra
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
}
