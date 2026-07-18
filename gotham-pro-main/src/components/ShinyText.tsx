/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';

interface ShinyTextProps {
  text: string;
  className?: string;
  baseColor?: string;
  shineColor?: string;
  speed?: number;
  angle?: number;
}

export default function ShinyText({
  text,
  className = '',
  baseColor = '#D4AF37',
  shineColor = '#F9F6F0',
  speed = 3,
  angle = 100
}: ShinyTextProps) {
  return (
    <motion.span
      className={`inline-block bg-clip-text text-transparent bg-[length:200%_100%] ${className}`}
      style={{
        backgroundImage: `linear-gradient(${angle}deg, ${baseColor} 35%, ${shineColor} 50%, ${baseColor} 65%)`
      }}
      animate={{ backgroundPosition: ['200% 0%', '-200% 0%'] }}
      transition={{ duration: speed, repeat: Infinity, ease: 'linear' }}
    >
      {text}
    </motion.span>
  );
}
