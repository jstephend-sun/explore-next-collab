import React, { useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import { Post } from '../../lib/types/Post';
import { shuffle } from '../../lib/helper';
import { compose, getPostsProps } from 'lib/props';

export type PostsPageProps = {
  // posts: Post[];
};

import {
  PostsMaloneQuery,
  usePostsMaloneQuery,
  PostsMaloneDocument,
} from '../../lib/graphql/queries/Posts.graphql';

const PostsPage = (props: PostsPageProps) => {
  // const [pagePosts, setPagePosts] = useState<Post[]>([]);
  // const MAX_POSTS = 20;

  const {data, loading, error, refetch} = usePostsMaloneQuery();

  // useEffect(() => {
  //   setPagePosts(shuffle(posts).slice(0, MAX_POSTS));
  // }, [posts]);

  return (
    <div className="container mx-auto grid grid-cols-3 gap-x-4 gap-y-2 mt-4">
      {data?.posts?.map((post) => post && (
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
  );
};

// export const getServerSideProps: GetServerSideProps = compose(getPostsProps);

export default PostsPage;
