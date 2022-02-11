import { ApolloServer, gql } from 'apollo-server-micro';

let book = {
  name: 'The Large Hungarian Sausage',
  author: 'Ben Grunfeld',
};

const typeDefs = gql`
  type Book {
    name: String
    author: String
  }
  type Query {
    book: Book
  }
  type Mutation {
    updateBook(name: String!, author: String!): Book
  }
`;

const resolvers = {
  Query: {
    book: () => book,
  },

  Mutation: {
    updateBook: (root, args) => {
      book.name = args.name;
      book.author = args.author;
      return book;
    },
  },
};

export const config = {
  api: {
    bodyParser: false,
  },
};

const schema = { typeDefs, resolvers };

const apolloServer = new ApolloServer(schema);

const startServer = apolloServer.start();

const handler = async (req, res) => {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'POST, GET, PUT, PATCH, DELETE, OPTIONS, HEAD'
  );
  if (req.method === 'OPTIONS') {
    res.end();
    return false;
  }

  await startServer;
  await apolloServer.createHandler({
    path: '/api/graphql-data',
  })(req, res);
};

export default handler;
