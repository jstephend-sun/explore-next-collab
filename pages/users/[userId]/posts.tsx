import React from 'react';
import { GetStaticPaths } from 'next';
import { Post, User } from 'lib/types';
import { fetchPostsOfUser, fetchUser } from 'lib/apiCalls';

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
          <div
            className="card shadow-2xl lg:card-side bg-primary text-primary-content"
            key={post.id}
          >
            <div className="card-body">
              <h2 className="card-title">{post.title}</h2>
              <p className="text-sm">{post.body}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

type UrlParams = {
  params: {
    userId: number;
  };
};

export const getStaticProps = async ({ params }: UrlParams) => {
  let { userId } = params;
  let user: User = await fetchUser(userId);

  return {
    props: {
      user,
      posts: await fetchPostsOfUser(userId),
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
