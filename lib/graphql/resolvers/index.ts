import { mergeResolvers } from '@graphql-tools/merge';
import * as UserQuery from './users.resolver';
import * as PostQuery from './posts.resolver';
import * as CommentQuery from './comments.resolver';

export const resolvers = mergeResolvers([UserQuery, PostQuery, CommentQuery]);

export default resolvers;
