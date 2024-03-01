import axios from 'src/utils/axiosCreate';
import { Slider } from 'src/models/slider';

export const fetchSliders = async () => {
  const response = await axios.get<{ data: Slider[]; status: number }>(
    '/sliders'
  );
  return response;
};
