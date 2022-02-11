import { PostsPageProps } from 'pages/posts';
import { ParsedUrlQuery } from 'querystring';
import { CTXType, NextType, PagePropsType } from '.';
import { fetchAllPosts, fetchPostsOfUser } from '../apiCalls';

interface PostsPropsCTX extends ParsedUrlQuery {
  userId: string;
}

export async function getPostsProps(
  ctx: CTXType<PostsPropsCTX>,
  pageProps: PagePropsType<PostsPageProps>,
  next: NextType
) {
  if (ctx.params) {
    let { userId } = ctx.params;
    let postsOfUser = await fetchPostsOfUser(userId);
    if (postsOfUser.length === 0) {
      pageProps.notFound = true;
      return;
    }

    if (userId) pageProps.props.posts = postsOfUser;
  } else pageProps.props.posts = await fetchAllPosts();

  return next();
}
