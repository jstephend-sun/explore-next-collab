import { User } from 'lib/types';

export const fetchAllUsers = async (): Promise<User[]> => {
  return await fetch(`${process.env.API_URL}/users`).then((res) => res.json());
};
