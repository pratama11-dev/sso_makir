/**
 * `handleSessions` is a middleware function that handles the sessions.
 *
 *  context is get from server
 *  needlogin, if the page is require authentication set it to true
 *
 *  fromlogin, if the page is from authpage such as /login or /register etc
 *  that u want to redirect to dashboard after login set it to true
 */

import { getSessionFromHeader } from "@utils/helpers/HelperServer";

export default async function handleSessions(
  ctx: any,
  needLogin = true,
  fromLogin = false
) {
  const sessionUser = await getSessionFromHeader(ctx.req);

  if (sessionUser.code === 0) {
    // const role = sessionUser?.data?.data?.sso_user_roles_platform_pivot?.find(
    //   (d: any) => d.sso_platforms?.client_id === process.env.NEXT_PUBLIC_CLIENT_ID
    // )?.sso_roles?.roles_name ?? "norole";
    // if (needLogin) {
    //   if (role === "norole") {
    //     return {
    //       redirect: {
    //         destination: `${process.env.NEXT_PUBLIC_SSOFE_URL}?code=no-roles`,
    //         permanent: false,
    //       },
    //     };
    //   }
    // }
    if (fromLogin) {
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    }

    return { props: { ...sessionUser } };
  }
  if (needLogin) {
    return {
      redirect: {
        destination: "/login?code=2",
        permanent: false,
      },
    };
  }
  return { props: { code: -1 } };
}
