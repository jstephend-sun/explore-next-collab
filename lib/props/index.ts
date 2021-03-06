import { Post, User } from 'lib/types';

export type GlobalProps = {
  users?: User[];
  posts?: Post[];
  user?: User;
};

export * from './compose';
export * from './getUsersProps';
export * from './getPostsProps';
export * from './getUsersProps_v2';
