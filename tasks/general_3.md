Feb 11, 2022

tasks:

- [Reference Basic](https://github.com/vercel/next.js/tree/canary/examples/api-routes-apollo-server)
- [Reference Typescript](https://github.com/vercel/next.js/tree/canary/examples/with-typescript-graphql)

# Part 1: GraphQL Setup
- install
    - [x] graphql
    - [x] apollo-server-micro
    - [x] typescript related packages (mostly codegen)

- files
    - [x] /lib/apollo
        - [x] schema
        - [x] typedefs  
        - [x] resolvers

---

# Part 2: Typedefs
- [ ] User
- [x] Post

- [ ] User { Posts }

---

# Part 3: Resolvers
- [ ] Query
    - [x] const Query: Required<QueryResolvers<ResolverContext>>
        - ResolverContext -> { req: IncomingMessage; res: ServerResponse } from 'http'   or maybe from nextjs ? :: nvm it also uses 'http'
        
    - [ ] users
        - fetch all users from jsonplaceholder
    - [x] posts
        - fetch all posts 


---

# Part 4: /api/graphql (Some parts in "setup" might not be necessary)
- [x] create ApolloServer ( { schema } )
- [x] export apollo handler


# Future plans:
- Breeze + Next.js -> redo exploratory project in this stack
- [ ] setup express server (Database to API)
- [ ] setup db
