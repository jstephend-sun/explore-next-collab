import { CTXType, NextType, PagePropsType } from '.';
import { fetchAllPosts } from '../apiCalls';

export async function getPostsProps(
  ctx: CTXType,
  pageProps: PagePropsType,
  next: NextType
) {
  pageProps.props.posts = await fetchAllPosts();
  return next();
}
