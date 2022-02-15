import { ApolloServer } from 'apollo-server-micro';
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';
import { schema } from '../../lib/graphql/schema';
import { MicroRequest } from 'apollo-server-micro/dist/types';
import { ServerResponse } from 'http';
import micro_cors from 'micro-cors';

import {
  getCommentsOfPostsLoader,
  getPostsOfUserLoader,
} from '../../lib/graphql/dataloader';

const apolloServer = new ApolloServer({
  schema,
  //   plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
  context: {
    loaders: {
      getPostsOfUserLoader: getPostsOfUserLoader(),
      getCommentsOfPostLoader: getCommentsOfPostsLoader(),
    },
  },
});

const startServer = apolloServer.start();

const cors = micro_cors();

const handler = async (req: MicroRequest, res: ServerResponse) => {
  if (req.method === 'OPTIONS') {
    res.end();
    return false;
  }

  await startServer;

  await apolloServer.createHandler({
    path: '/api/graphql',
  })(req, res);
};

export const config = {
  api: {
    bodyParser: false,
  },
};

export default cors(handler);
