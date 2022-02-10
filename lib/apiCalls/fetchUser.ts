import { Post, User } from 'lib/types';

export const fetchUser = async (id: number | string): Promise<User> => {
  let users: User[] = await fetch(`${process.env.API_URL}/users`).then((res) =>
    res.json()
  );
  let found = users.find((user) => user.id.toString() === id.toString()) || {
    id: -1,
    name: '',
    email: '',
    username: '',
    phone: '',
  };

  return found;
};

export const fetchPostsOfUser = async (userId: number | string) => {
  let posts: Post[] = await fetch(`${process.env.API_URL}/posts`).then((res) =>
    res.json()
  );

  return posts.filter((post) => post.userId.toString() === userId.toString());
};
