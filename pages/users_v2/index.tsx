import { GetStaticProps, GetStaticPaths } from 'next';
import { compose, getUsersProps_v2 } from '../../lib/props';
import { User } from '../../lib/types';

type Props = {
  users: User[];
};

const UsersList = ({ users }: Props) => {
  return (
    <div className="grid grid-cols-4 gap-5 mx-10">
      {users.map((user) => {
        return (
          <div
            className="max-w-md py-4 px-8 bg-white shadow-lg rounded-lg my-20 flex flex-col"
            key={user.id}
          >
            <span>{user.id}</span>
            <span className="font-bold text-xl">{user.name}</span>
            <span>{user.email}</span>
          </div>
        );
      })}
    </div>
  );
};

export const getStaticProps: GetStaticProps = compose(getUsersProps_v2);

export default UsersList;
