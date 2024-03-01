import axios from 'src/utils/axiosCreate';
import type { Event } from 'src/models/event';

export const fetchEvents = async (
) => {
  const response = await axios.get<{ data: Event[]; status: number }>('/events');
  return response;
};