// useUser via api trans
import { useEffect } from "react";
import Router from "next/router";
import useSWR from "swr";
import fetchJson from "@/utils/fetchJson";
import { useSelector, useDispatch } from "react-redux";
import { checkUser } from "@/store/user/action";
import Cookies from "js-cookie";
import base64 from "base-64";

export default function useUser({
  redirectTo = false,
  redirectIfFound = false,
} = {}) {
  let phone = Cookies.get("dlingo-trans-pwa") || 0;

  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  if (phone && phone !== "undefined") {
    phone = base64.decode(phone);
  }

  const { data: user, mutate: mutateUser } = useSWR(
    `/api/check_user?code=${phone}`,
    fetchJson
  );
  useEffect(() => {
    if (user) {
      dispatch(checkUser(user));
    }
    // if user data not yet there (fetch in progress, logged in or not) then don't do anything yet
    if (!redirectTo || !user) return;

    if (
      (redirectTo && !redirectIfFound && !user?.isLoggedIn) ||
      (redirectIfFound && user?.isLoggedIn)
    ) {
      Router.push(redirectTo);
    }
  }, [user, redirectIfFound, redirectTo]);

  useEffect(() => {
    if (redirectTo && !state?.user?.userChecker?.isLoggedIn) {
      Router.push(redirectTo);
    }
  }, [redirectTo]);

  return { user };
}

// useUser via api local
// import { useEffect } from "react";
// import Router from "next/router";
// import useSWR from "swr";
// import fetchJson from "@/utils/fetchJson";
// import { useSelector, useDispatch } from "react-redux";
// import { checkUser } from "@/store/user/action";
// import Cookies from "js-cookie";
// import base64 from "base-64";

// export default function useUser({
//   redirectTo = false,
//   redirectIfFound = false,
// } = {}) {
//   let phone = Cookies.get("dlingo-trans-pwa") || 0;

//   const state = useSelector((state) => state);
//   const dispatch = useDispatch();
//   if (phone && phone !== "undefined") {
//     phone = base64.decode(phone);
//   }

//   const { data: user, mutate: mutateUser } = useSWR(
//     `/api/check_user?code=${phone}`,
//     fetchJson
//   );
//   useEffect(() => {
//     if (user) {
//       dispatch(checkUser(user));
//     }
//     // if user data not yet there (fetch in progress, logged in or not) then don't do anything yet
//     if (!redirectTo || !user) return;

//     if (
//       (redirectTo && !redirectIfFound && !user?.isLoggedIn) ||
//       (redirectIfFound && user?.isLoggedIn)
//     ) {
//       Router.push(redirectTo);
//     }
//   }, [user, redirectIfFound, redirectTo]);

//   useEffect(() => {
//     if (redirectTo && !state?.user?.userChecker?.isLoggedIn) {
//       Router.push(redirectTo);
//     }
//   }, [redirectTo]);

//   return { user };
// }
