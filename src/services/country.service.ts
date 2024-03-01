import axios from 'src/utils/axiosCreate';
import { Country } from 'src/models/country';

export const fetchCountries = async () => {
  const response = await axios.get<{ data: Country[]; status: number }>(
    '/countries'
  );
  return response;
};
