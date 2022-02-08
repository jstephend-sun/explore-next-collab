import React, { useState } from 'react';
import { GetStaticProps } from 'next';
import { useRouter } from 'next/router';

type Props = {
  users: User[];
};

export type User = {
  id: number | string;
  name: string;
  username: string;
  email: string;
  phone: string;
};

const UsersPage = (props: Props) => {
  const [users, setUsers] = useState<User[] | null>(props.users);
  const router = useRouter();

  const handleReloadUsers = async (ev: any) => {
    setUsers(await fetchUsers());
  };

  const handleUserClick = (ev: any, id: number | string) => {
    router.push(`/users/${id}`);
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

      <button
        className="mt-4 bg-green-400"
        onClick={(ev) => handleReloadUsers(ev)}
      >
        Reload users list
      </button>
    </div>
  );
};

export const fetchUsers = async () => {
  let result = await fetch('https://jsonplaceholder.typicode.com/users');
  return await result.json();
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  let users: User[] = await fetchUsers();

  return {
    props: {
      users: users.splice(0, 5),
    },
  };
};

export default UsersPage;
