import axios from 'src/utils/axiosCreate';
import type { User } from 'src/models/user';

export const fetchUser = async (userId: number) => {
  const response = await axios.get<{ data: User }>(`/users/${userId}`);
  return response;
};

export const fetchUserByAuthID = async (uid: string) => {
  const response = await axios.get<{ data: User }>(`/users/uid/${uid}`);
  return response;
};
