import type { Event } from './event';

export interface Slider {
  id: number;
  name: string;
  description: string;
  order: number;
  created_at: string;
  updated_at: string;
  events: Event[];
}
