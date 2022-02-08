import { GetStaticProps, GetStaticPaths } from 'next';

type Props = {
  users: User[];
};

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  // address: {
  //   street: string;
  //   city: string;
  // };
}

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

export const getStaticProps: GetStaticProps = async (context) => {
  const response = await fetch('https://jsonplaceholder.typicode.com/users');
  const allUsers: User[] = await response.json();

  //fisher-yates
  for (var i = allUsers.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1)); //random index
    [allUsers[i], allUsers[j]] = [allUsers[j], allUsers[i]]; // swap
  }

  const randomUsers = allUsers.slice(0, 5);

  return {
    props: {
      users: randomUsers,
    },
    revalidate: 5,
  };
};

export default UsersList;
