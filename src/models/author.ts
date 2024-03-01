import { Country } from './country';

export interface Author {
  id: number;
  first_name: string;
  last_name: string;
  country: Country;
  created_at: string;
  updated_at: string;
}
