import {
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  GetStaticPropsContext,
  GetStaticPropsResult,
  Redirect,
} from 'next';
import { ParsedUrlQuery } from 'querystring';
import { GlobalProps } from '.';

// export type CTXType = GetServerSidePropsContext | GetStaticPropsContext;
export type CTXType<Q extends ParsedUrlQuery = ParsedUrlQuery> =
  | GetServerSidePropsContext<Q>
  | GetStaticPropsContext<Q>;
export type PagePropsType<Q = {}> = {
  // props: GlobalProps;
  props: Q;
  revalidate?: number | boolean;
  notFound?: boolean;
  redirect?: Redirect;
};
// export type PagePropsType<Q = {}> = GetStaticPropsResult<Q> &
//   GetServerSidePropsResult<Q>;
export type NextType = Function;

export function compose(...middlewares: Function[]) {
  // Return getServerSideProps handler
  return async function composer(ctx: CTXType) {
    let prevIndex: number = -1;
    const pageProps: PagePropsType = { props: {} };

    // Create middlewares runner
    const runner = async (index: number) => {
      // Check if `next` was called accidently muliple times
      if (index === prevIndex) {
        throw new Error('next() was called multiple times');
      }

      const middleware = middlewares[index];

      prevIndex = index;

      if (typeof middleware === 'function') {
        // Run middlewares one by one
        await middleware(ctx, pageProps, () => {
          return runner(index + 1);
        });
      }
    };

    await runner(0);

    // Return results to next.js
    return pageProps;
  };
}
