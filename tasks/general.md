tasks:

- [x] setup nextjs ts w/ tailwind [ts](https://nextjs.org/docs/getting-started#setup) [tailwind](https://tailwindcss.com/docs/guides/nextjs)
- [x] api -> jsonplaceholder [link](https://jsonplaceholder.typicode.com/)

- [x] features:
    - [x] pages
        - [x] users [link](https://jsonplaceholder.typicode.com/users)
            - [x] users/id -> posts of user (field: "userId"), fetch users, fetch posts, [link](https://nextjs.org/docs/routing/dynamic-routes) [router](https://nextjs.org/docs/api-reference/next/router#userouter)
            - [x] users_v2 -> ISR implementation of users
        - [x] posts [link](https://jsonplaceholder.typicode.com/posts)
        - [x] home -> just show links  
    - [x] getServerSideProps
        - [x] posts (shuffle posts list, take only 20) [link](https://nextjs.org/docs/api-reference/data-fetching/get-static-paths#paths)

    - [x] getStaticProps
        - [x] users (take only 5)
            - [x] button to "refresh" users list, show all (10) -> just api call
        - [x] revalidate (ISR)  [link](https://nextjs.org/docs/basic-features/data-fetching/incremental-static-regeneration)
            - [x] users_v2 (randomize users list, take 5)
            - [x] revalidate every 5 secs  

    - [x] getStaticPaths
        - [x] users/id
        - [x] preload [1,2,3]  [link](https://nextjs.org/docs/api-reference/data-fetching/get-static-paths#paths)
        - [x] fallback: "blocking" [link](https://nextjs.org/docs/api-reference/data-fetching/get-static-paths)

- [ ] optional:
    - [ ] setup rtk