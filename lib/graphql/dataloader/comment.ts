import { Comment } from '@graphql-types@';
import DataLoader from 'dataloader';

const filterCommentsByPost = (comments: Comment[], postId: string | number) => {
  return comments.filter(
    (comment) => comment?.postId?.toString() === postId.toString()
  );
};

export const getCommentsOfPosts = async (ids: string[]) => {
  let comments: Comment[] = await fetch(
    'https://jsonplaceholder.typicode.com/comments'
  ).then((res) => res.json());

  return ids.map((id) => filterCommentsByPost(comments, id));
};

export const getCommentsOfPostsLoader = () =>
  new DataLoader(getCommentsOfPosts);
