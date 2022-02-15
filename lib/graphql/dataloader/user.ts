import { User, Post } from '@graphql-types@';
import { sort } from '.';
import DataLoader from 'dataloader';

const filterPostsByUserId = (posts: Post[], userId: string | number) => {
  return posts.filter((post) => post.userId.toString() === userId.toString());
};

export type UsersArgs = {
  orderBy: string;
};

export const getAllUsers = async (orderBy = 'ID_ASC') => {
  let users: User[] = await fetch(
    'https://jsonplaceholder.typicode.com/users'
  ).then((res) => res.json());

  return sort<User>(users, orderBy);
};

export const getPostsOfUser = async (ids: string[]) => {
  let posts: Post[] = await fetch(
    'https://jsonplaceholder.typicode.com/posts'
  ).then((res) => res.json());

  return ids.map((id) => filterPostsByUserId(posts, id));
};

export const getPostsOfUserLoader = () => {
  return new DataLoader(getPostsOfUser);
};
