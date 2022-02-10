import React, { useEffect, useState } from 'react';
import { GetStaticProps } from 'next';
import { useRouter } from 'next/router';

import { compose, getUsersProps } from 'lib/props';
import { fetchAllUsers } from 'lib/apiCalls';
import { User } from 'lib/types';

export type UsersPageProps = {
  users: User[];
};

const UsersPage = (props: UsersPageProps) => {
  // const [users, setUsers] = useState<User[] | null>(props.users.splice(0, 5)); before
  const [users, setUsers] = useState<User[] | null>(null); // this line
  const router = useRouter();

  useEffect(() => {
    setUsers(props.users.splice(0, 5));
  }, [props.users]);

  const handleReloadUsers = async (ev: any) => {
    setUsers(await fetchAllUsers());
  };

  const handleUserClick = (ev: any, id: number) => {
    router.push(`/users/${id}/posts`);
  };

  return (
    <div className="container mx-auto py-10">
      <p className="font-bold">Users</p>
      <div className="flex flex-wrap">
        {users?.map((user) => {
          return (
            <div key={user.id} className="flex-grow">
              <p onDoubleClick={(ev) => handleUserClick(ev, user.id)}>
                {user.name}
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

export const getStaticProps: GetStaticProps = compose(getUsersProps);

export default UsersPage;
