import React, { useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';

const MAX_POSTS = 20;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts');
  const posts = await res.json();

  return {
    props: {
      posts,
    },
  };
};

export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

type Props = {
  posts: Post[];
};

const PostsPage = ({ posts }: Props) => {
  const [pagePosts, setPagePosts] = useState<Post[]>([]);

  useEffect(() => {
    setPagePosts(shuffle(posts).slice(0, MAX_POSTS));
  }, [posts]);

  return (
    <div className="container mx-auto grid grid-cols-3 gap-x-2 gap-y-4 mt-4">
      {pagePosts.map((post) => (
        <div className="card shadow-blue-500/50" key={post.id}>
          <h2 className="font-bold text-md h-16">{post.title}</h2>
          <p className="text-xs">{post.body}</p>
        </div>
      ))}
    </div>
  );
};

// Shamelessly stolen from https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
const shuffle = (array: Post[]): Post[] => {
  let currentIndex = array.length,
    randomIndex;

  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
};

export default PostsPage;
