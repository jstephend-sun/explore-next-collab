import { User, Post } from '@graphql-types@';
import { sort } from '.';
import DataLoader from 'dataloader';
import { map, groupBy } from 'ramda';

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

  let postsByUserId = groupBy((post) => post.userId.toString(), posts);
  return map((id) => postsByUserId[id], ids);
};

export const getPostsOfUserLoader = () => new DataLoader(getPostsOfUser);
