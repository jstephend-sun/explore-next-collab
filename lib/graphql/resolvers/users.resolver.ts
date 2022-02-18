import {
  QueryResolvers,
  UserResolvers,
  Post as PostType,
  User as UserType,
} from '@graphql-types@';
import { ResolverContext } from '../apollo';
import { getAllUsers, UsersArgs } from '../dataloader';

export const Query: QueryResolvers<ResolverContext> = {
  users: async (_parent, { orderBy }: UsersArgs, _context, _info) => {
    return await getAllUsers(orderBy);
  },
};

export const User: UserResolvers<ResolverContext> = {
  posts: async ({ id }: UserType, _args, { loaders }, _info) => {
    // ---- toggle useLoader below and above to see difference in performance (N+1 optimization)
    let useLoader = true;

    if (useLoader) {
      let { getPostsOfUserLoader } = loaders!;
      return getPostsOfUserLoader.load(id);
    } else {
      let posts: PostType[] = await fetch(
        'https://jsonplaceholder.typicode.com/posts'
      ).then((res) => res.json());

      return posts.filter((post) => post?.userId?.toString() === id.toString());
    }
  },
};
