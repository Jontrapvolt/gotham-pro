/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  height?: string;
  title?: string;
}

export default function BeforeAfterSlider({
  beforeImage,
  afterImage,
  height = 'h-[300px] md:h-[480px]',
  title
}: BeforeAfterSliderProps) {
  const [sliderPosition, setSliderPosition] = useState<number>(50); // percentage 0 - 100
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef<boolean>(false);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const position = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(position);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging.current) return;
    handleMove(e.clientX);
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!isDragging.current) return;
    if (e.touches.length > 0) {
      handleMove(e.touches[0].clientX);
    }
  };

  const handleMouseUp = () => {
    isDragging.current = false;
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };

  const handleTouchEnd = () => {
    isDragging.current = false;
    document.removeEventListener('touchmove', handleTouchMove);
    document.removeEventListener('touchend', handleTouchEnd);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    isDragging.current = true;
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    isDragging.current = true;
    document.addEventListener('touchmove', handleTouchMove, { passive: true });
    document.addEventListener('touchend', handleTouchEnd);
  };

  useEffect(() => {
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);

  return (
    <div className="flex flex-col gap-2">
      <div
        ref={containerRef}
        id={`before-after-slider-${title ? title.replace(/\s+/g, '-').toLowerCase() : 'project'}`}
        className={`relative ${height} w-full overflow-hidden select-none rounded-lg border border-line`}
      >
        {/* AFTER IMAGE (Background - Full) */}
        <img
          src={afterImage}
          alt="Después de la reforma"
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        />
        <div className="absolute right-4 bottom-4 bg-night/80 backdrop-blur-sm px-3 py-1 rounded-full font-mono text-[10px] tracking-widest text-on-night border border-gold/30 pointer-events-none">
          DESPUÉS
        </div>

        {/* BEFORE IMAGE (Overlay - Width controlled by sliderPosition) */}
        <div
          className="absolute inset-y-0 left-0 overflow-hidden pointer-events-none"
          style={{ width: `${sliderPosition}%` }}
        >
          <img
            src={beforeImage}
            alt="Antes de la reforma"
            className="absolute inset-y-0 left-0 w-full h-full object-cover max-w-none"
            style={{ width: containerRef.current?.getBoundingClientRect().width }}
          />
          <div className="absolute left-4 bottom-4 bg-night/80 backdrop-blur-sm px-3 py-1 rounded-full font-mono text-[10px] tracking-widest text-gold-soft border border-white/15 pointer-events-none">
            ANTES
          </div>
        </div>

        {/* SLIDER CONTROLLER HANDLE */}
        <div
          className="absolute inset-y-0 w-[2px] bg-gold cursor-ew-resize flex items-center justify-center group"
          style={{ left: `${sliderPosition}%` }}
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
        >
          <div className="w-9 h-9 rounded-full bg-cream border border-gold text-gold-deep flex items-center justify-center transition-all duration-300 absolute pointer-events-none select-none group-hover:scale-110 shadow-lg">
            <svg
              className="w-4 h-4 fill-none stroke-current"
              viewBox="0 0 24 24"
              strokeWidth="2.5"
            >
              <path d="M8 7l-5 5 5 5M16 7l5 5-5 5" />
            </svg>
          </div>
        </div>
      </div>
      <p className="text-[11px] text-ink-faint italic text-center">
        Arrastre la línea central para ver el antes y el después
      </p>
    </div>
  );
}
