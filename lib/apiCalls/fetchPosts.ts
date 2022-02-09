import { Post } from 'lib/types';

export const fetchAllPosts = async (): Promise<Post[]> => {
  return await fetch(`${process.env.API_URL}/posts`).then((res) => res.json());
};
