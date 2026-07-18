/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Project {
  id: string;
  title: string;
  category: 'Integral' | 'Cocinas' | 'Baños' | 'Oficinas' | 'Acabados';
  description: string;
  beforeImage: string;
  afterImage: string;
  areaSqm: number;
  completionYear: string;
  clientName: string;
  district: string;
  highlights: string[];
}

export interface Service {
  id: string;
  name: string;
  iconName: string;
  description: string;
  fullDetails: string[];
  averagePriceMin: number;
  averagePriceMax: number;
  typicalDuration: string;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  projectType: string;
  quote: string;
  rating: number;
  image?: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface QuoteEstimation {
  propertyType: string;
  sqm: number;
  qualityTier: 'premium' | 'ultra' | 'bespoke';
  extras: string[];
  name: string;
  phone: string;
  message: string;
}
