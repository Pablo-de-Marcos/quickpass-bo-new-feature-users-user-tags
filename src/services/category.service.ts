import axios from 'src/utils/axiosCreate';
import { Category } from 'src/models/category';

export const fetchCategories = async () => {
  const response = await axios.get<{ data: Category[]; status: number }>(
    '/categories'
  );
  return response;
};
