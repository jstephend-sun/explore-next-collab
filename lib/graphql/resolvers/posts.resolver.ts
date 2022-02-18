import {
  QueryResolvers,
  PostResolvers,
  Post as PostType,
  Comment as CommentType,
} from '@graphql-types@';
import { ResolverContext } from '../apollo';

export const Query: QueryResolvers<ResolverContext> = {
  posts: async (_parent, _args, _context, _info) => {
    return await fetch('https://jsonplaceholder.typicode.com/posts').then(
      (res) => res.json()
    );
  },
};

export const Post: PostResolvers<ResolverContext> = {
  comments: async ({ id }: PostType, _args, { loaders }, _info) => {
    // ---- toggle useLoader below and above to see difference in performance (N+1 optimization)
    let useLoader = true;

    if (useLoader) {
      let { getCommentsOfPostLoader } = loaders!;
      return getCommentsOfPostLoader?.load(id);
    } else {
      let comments: CommentType[] = await fetch(
        'https://jsonplaceholder.typicode.com/comments'
      ).then((res) => res.json());

      return comments.filter(
        (comment) => comment?.postId?.toString() === id.toString()
      );
    }
  },
};
