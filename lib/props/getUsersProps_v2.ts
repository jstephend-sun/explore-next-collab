import { CTXType, NextType, PagePropsType } from '.';
import { fetchAllUsers } from '../apiCalls';
import { User } from '../../lib/types';
import { shuffle } from '../../lib/helper';
import { UsersV2PageProps } from 'pages/users_v2';

export async function getUsersProps_v2(
  ctx: CTXType,
  pageProps: PagePropsType<UsersV2PageProps>,
  next: NextType
) {
  const allUsers: User[] = await fetchAllUsers();
  const shuffledUsers = shuffle(allUsers); //shuffle
  pageProps.props.users = shuffledUsers.splice(0, 5); //get 5
  pageProps.revalidate = 5;
  return next();
}
