import { withIronSession } from "next-iron-session"

export default function withSession(handler) {
  return withIronSession(handler, {
    password: process.env.NEXT_PUBLIC_SECRET_COOKIE_PASSWORD,
    cookieName: "trans/dlingo/session",
    // the next line allows to use the session in non-https environments like
    // secure: process.env.NODE_ENV === "production" ? true : false,
    secure: false,
  });
}