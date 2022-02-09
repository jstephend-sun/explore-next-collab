import { User } from 'lib/types';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<User[]>
) {
  const users: User[] = await fetch(
    'https://jsonplaceholder.typicode.com/users'
  ).then((res) => res.json());

  // this could represent
  /*
    db.query(`SELECT * FROM USERS`)

    or

    axios.post('backend/graphql', { query: `{ users {name email} }`}, { "Authorization": "Bearer token" })
  */
  // but were using placeholder db for now

  res.status(200).json(users);
}
