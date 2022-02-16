import { Comment } from '@graphql-types@';
import DataLoader from 'dataloader';
import { groupBy, map } from 'ramda';

export const getCommentsOfPosts = async (ids: readonly string[]) => {
  let comments: Comment[] = await fetch(
    'https://jsonplaceholder.typicode.com/comments'
  ).then((res) => res.json());

  let commentsOfPost = groupBy((comment) => comment?.postId ?? '0', comments);
  return Promise.all(map((id) => commentsOfPost[id], ids));
};

export const getCommentsOfPostsLoader = () =>
  new DataLoader(getCommentsOfPosts);
