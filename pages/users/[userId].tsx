import React from 'react';
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import { Post } from 'pages/posts';
import { User } from '.';
import { useRouter } from 'next/router';

type Props = {
  user: User;
  posts: Post[];
};

const UserIdPage = (props: Props) => {
  return (
    <div className="container mx-auto mt-4">
      <p className="font-bold text-2xl">Posts of {props.user.name}</p>
      <div className="grid grid-cols-3 gap-x-2 gap-y-4 mt-4">
        {props.posts.map((post) => (
          <div className="card shadow-blue-500/50" key={post.id}>
            <h2 className="font-bold text-md h-16">{post.title}</h2>
            <p className="text-xs">{post.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export const fetchUser = async (id: number | string) => {
  let result = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
  return await result.json();
};

export const fetchPostsOfUser = async (userId: number | string) => {
  let posts: Post[] = await fetch(
    `https://jsonplaceholder.typicode.com/posts`
  ).then((res) => res.json());

  return posts.filter((post) => post.userId === userId);
};

type UrlParams = {
  params: {
    userId: string | number;
  };
};

export const getStaticProps = async ({ params }: UrlParams) => {
  let { userId } = params;
  let user: User = await fetchUser(userId);

  return {
    props: {
      user,
      posts: await fetchPostsOfUser(user.id),
    },
  };
};

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [
      { params: { userId: '1' } },
      { params: { userId: '2' } },
      { params: { userId: '3' } },
    ],
    fallback: 'blocking',
  };
};

export default UserIdPage;
