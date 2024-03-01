import axios from 'src/utils/axiosCreate';
import { Author } from 'src/models/author';

export const fetchAuthors = async () => {
  const response = await axios.get<{ data: Author[]; status: number }>(
    '/author'
  );
  return response;
};
