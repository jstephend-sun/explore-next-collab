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
    if (userId) pageProps.props.posts = await fetchPostsOfUser(userId);
  } else pageProps.props.posts = await fetchAllPosts();

  return next();
}
