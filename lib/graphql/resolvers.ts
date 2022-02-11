import { QueryResolvers, MutationResolvers } from '@graphql-types@';
import { ResolverContext } from './apollo';

const userProfile = {
  id: String(1),
  name: 'John Smith',
  status: 'cached',
};

const Query: Required<QueryResolvers<ResolverContext>> = {
  viewer(_parent, _args, _context, _info) {
    return userProfile;
  },
  hello(_parent, _args, _context, _info) {
    // <how to add // prolly create schema of hello // god daamit
    // wait no wtf hahahah
    // linte ano man HAHAHA
    // ahh // prolly have to rs server to codegen types <------ fix
    // nvm did not work lmao
    // wait it got fixed hahahah
    // it worked nvm the nvm
    // how did u fix
    return 'world';
  },
  posts: async (_parent, _args, _context, _info) => {
    return await fetch('https://jsonplaceholder.typicode.com/posts').then(
      (res) => res.json()
    );
  },
};

const Mutation: Required<MutationResolvers<ResolverContext>> = {
  updateName(_parent, _args, _context, _info) {
    userProfile.name = _args.name;
    return userProfile;
  },
};

const resolvers = { Query, Mutation };

export default resolvers;
