import { Event } from './event';
interface Banners {
  id: number;
  name: string;
  description?: string;
  link: string;
  image: string;
  order?: number;
  button_name: string;
  event: Event;
}

export default Banners;
