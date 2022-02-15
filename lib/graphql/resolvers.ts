import {
  QueryResolvers,
  UserResolvers,
  PostResolvers,
  Post,
  User,
  Comment,
  // MutationResolvers
} from '@graphql-types@';
import { ResolverContext } from './apollo';
import { getAllUsers, UsersArgs } from './dataloader';

const Query: Required<QueryResolvers<ResolverContext>> = {
  posts: async (_parent, _args, _context, _info) => {
    return await fetch('https://jsonplaceholder.typicode.com/posts').then(
      (res) => res.json()
    );
  },
  users: async (_parent, { orderBy }: UsersArgs, _context, _info) => {
    return await getAllUsers(orderBy);
  },
  comments: async (_parent, _args, _context, _info) => {
    return await fetch('https://jsonplaceholder.typicode.com/comments').then(
      (res) => res.json()
    );
  },
};

const User: UserResolvers<ResolverContext> = {
  posts: async ({ id }: User, _args, { loaders }, _info) => {
    // ---- toggle useLoader below and above to see difference in performance (N+1 optimization)
    let useLoader = true;

    if (useLoader) {
      let { getPostsOfUserLoader } = loaders;
      return getPostsOfUserLoader.load(id);
    } else {
      let posts: Post[] = await fetch(
        'https://jsonplaceholder.typicode.com/posts'
      ).then((res) => res.json());

      return posts.filter((post) => post.userId.toString() === id.toString());
    }
  },
};

const Post: PostResolvers<ResolverContext> = {
  comments: async ({ id }: Post, _args, { loaders }, _info) => {
    // ---- toggle useLoader below and above to see difference in performance (N+1 optimization)
    let useLoader = true;

    if (useLoader) {
      let { getCommentsOfPostLoader } = loaders;
      return getCommentsOfPostLoader.load(id);
    } else {
      let comments: Comment[] = await fetch(
        'https://jsonplaceholder.typicode.com/comments'
      ).then((res) => res.json());

      return comments.filter(
        (comment) => comment.postId.toString() === id.toString()
      );
    }
  },
};

// const Mutation: Required<MutationResolvers<ResolverContext>> = {};

const resolvers = {
  Query,
  User,
  Post,
  // Mutation
};

export default resolvers;
