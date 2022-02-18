// import {
//   QueryResolvers,
//   UserResolvers,
//   PostResolvers,
//   Post as PostType,
//   User as UserType,
//   Comment as CommentType,
//   // MutationResolvers
// } from '@graphql-types@';
// import { ResolverContext } from './apollo';
// import { getAllUsers, UsersArgs } from './dataloader';

// const Query: Required<QueryResolvers<ResolverContext>> = {
//   posts: async (_parent, _args, _context, _info) => {
//     return await fetch('https://jsonplaceholder.typicode.com/posts').then(
//       (res) => res.json()
//     );
//   },
//   users: async (
//     _parent,
//     { orderBy = 'ID_ASC' }: UsersArgs,
//     _context,
//     _info
//   ) => {
//     return await getAllUsers(orderBy);
//   },
//   comments: async (_parent, _args, _context, _info) => {
//     return await fetch('https://jsonplaceholder.typicode.com/comments').then(
//       (res) => res.json()
//     );
//   },
// };

// const User: UserResolvers<ResolverContext> = {
//   posts: async ({ id }: UserType, _args, { loaders }, _info) => {
//     // ---- toggle useLoader below and above to see difference in performance (N+1 optimization)
//     let useLoader = true;

//     if (useLoader) {
//       let { getPostsOfUserLoader } = loaders!;
//       return getPostsOfUserLoader.load(id);
//     } else {
//       let posts: PostType[] = await fetch(
//         'https://jsonplaceholder.typicode.com/posts'
//       ).then((res) => res.json());

//       return posts.filter((post) => post?.userId?.toString() === id.toString());
//     }
//   },
// };

// const Post: PostResolvers<ResolverContext> = {
//   comments: async ({ id }: PostType, _args, { loaders }, _info) => {
//     // ---- toggle useLoader below and above to see difference in performance (N+1 optimization)
//     let useLoader = true;

//     if (useLoader) {
//       let { getCommentsOfPostLoader } = loaders!;
//       return getCommentsOfPostLoader?.load(id);
//     } else {
//       let comments: CommentType[] = await fetch(
//         'https://jsonplaceholder.typicode.com/comments'
//       ).then((res) => res.json());

//       return comments.filter(
//         (comment) => comment?.postId?.toString() === id.toString()
//       );
//     }
//   },
// };

// // const Mutation: Required<MutationResolvers<ResolverContext>> = {};

// const resolvers = {
//   Query,
//   User,
//   Post,
//   // Mutation
// };

import { mergeResolvers } from '@graphql-tools/merge';
import * as UserQuery from './resolvers/users.resolver';
import * as PostQuery from './resolvers/posts.resolver';
import * as CommentQuery from './resolvers/comments.resolver';

export const resolvers = mergeResolvers([UserQuery, PostQuery, CommentQuery]);

export default resolvers;
