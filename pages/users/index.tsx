import React, { useEffect, useState } from 'react';
import { GetStaticProps } from 'next';
import { useRouter } from 'next/router';

import { compose, getUsersProps } from 'lib/props';
import { fetchAllUsers } from 'lib/apiCalls';
import { User } from 'lib/types';

import {
  UsersQuery, // Typing
  useUsersQuery, // Hooker
  UsersDocument, // GQL gql`query { user  {id }}`
} from '../../lib/graphql/queries/Users.graphql';
import { initializeApollo } from 'lib/graphql/apollo';
import { useQuery } from '@apollo/client';

export type UsersPageProps = {
  initialApolloState: any;
};

const UsersPage = ({ initialApolloState }: UsersPageProps) => {
  // const [users, setUsers] = useState<User[] | null>(props.users.splice(0, 5)); before
  // const [users, setUsers] = useState<User[] | null>(null); // this line
  const router = useRouter();

  const { data, loading, error, refetch } = useUsersQuery();

  // useEffect(() => {
  //   setUsers(props.users.splice(0, 5));
  // }, [props.users]);

  const handleReloadUsers = async (ev: any) => {
    // data?.users!.forEach((user) => {
    //   console.log(user);
    // });
    // setUsers(await fetchAllUsers());
    console.log(initialApolloState);
    await refetch();
  };

  const handleUserClick = (ev: any, id: number) => {
    router.push(`/users/${id}/posts`);
  };

  return (
    <div className="container mx-auto py-10">
      <p className="font-bold">Users</p>
      <div className="flex flex-wrap">
        {loading
          ? 'Wow'
          : data?.users?.map((user) => {
              return (
                <div key={user!.id} className="flex-grow">
                  <p
                    onDoubleClick={(ev) =>
                      handleUserClick(ev, parseInt(user!.id))
                    }
                  >
                    {user!.name}
                  </p>
                </div>
              );
            })}
      </div>

      <button className="btn btn-success mt-4" onClick={handleReloadUsers}>
        Reload users list
      </button>
    </div>
  );
};

// export const getStaticProps: GetStaticProps = compose(getUsersProps);
export const getStaticProps: GetStaticProps = async () => {
  const apolloClient = initializeApollo();
  //networkError: Error: Expected undefined to be a GraphQL schema.
  // error - Error: Expected undefined to be a GraphQL schema.

  // console.log(apolloClient);
  // UsersQuery?
  await apolloClient.query({
    query: UsersDocument,
  });

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
  };
};

export default UsersPage;
