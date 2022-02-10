import { UsersPageProps } from 'pages/users';
import { UsersIdPostsPageProps } from 'pages/users/[userId]/posts';
import { ParsedUrlQuery } from 'querystring';
import { CTXType, NextType, PagePropsType } from '.';
import { fetchAllUsers, fetchUser } from '../apiCalls';

interface UsersPropsCTX extends ParsedUrlQuery {
  userId: string;
}

export async function getUsersProps(
  ctx: CTXType<UsersPropsCTX>,
  pageProps: PagePropsType<UsersPageProps & UsersIdPostsPageProps>,
  next: NextType
) {
  // before  -> without error handling
  // pageProps.props.users = await fetchAllUsers()

  // easily add error handling
  try {
    if (ctx.params) {
      let { userId } = ctx.params;
      if (userId) pageProps.props.user = await fetchUser(userId);
    } else pageProps.props.users = await fetchAllUsers();
  } catch {
    pageProps.notFound = true;
    return; // stop the middleware calling
  }

  // please dont think of middleware as just made for http requests

  // they can be applied really anywhere as long as the point of them is handling things in between
  // such as changing some attributes
  // checking for authentication for example
  // adding attributes, setting headers for example

  // @steph y didnt u just use next-connect
  // idk how :>
  // ahh, based didto, dw ka alternative to express
  // i dont really know how to work it with props
  // goal for this segment is props not the requests

  return next();
}
