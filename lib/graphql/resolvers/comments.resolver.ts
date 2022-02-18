import { QueryResolvers } from '@graphql-types@';
import { ResolverContext } from '../apollo';

export const Query: QueryResolvers<ResolverContext> = {
  comments: async (_parent, _args, _context, _info) => {
    return await fetch('https://jsonplaceholder.typicode.com/comments').then(
      (res) => res.json()
    );
  },
};
