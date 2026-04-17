import Credentials from "@auth/express/providers/credentials";
import { UserService } from "../service/user.service.js";
import { ExpressAuthConfig } from "@auth/express";
import { LoginRequestSchema } from "@pkg/shared";
import { ENV } from "./env.js";
import { styleText } from "node:util";


const service = new UserService();
const secret: ExpressAuthConfig["secret"] = ENV.AUTH_SECRET;

const prosesLog = (text: string) => {
  return process.stdout.write(styleText(
    ["red", "bold"],
    `\n\n` +
    `- -`.repeat(3) + ` authConfig ` + `- -`.repeat(3) +
    `\n\n${text}\n\n` +
    `- -`.repeat(13) +
    `\n\n`
  ));
}

export const authConfig: ExpressAuthConfig = {
  basePath: "/api/auth",
  debug: true,
  trustHost: true,
  secret: secret,
  session: { strategy: "jwt" },
  cookies: {
    sessionToken: {
      name: "authjs.session-token",
      options: {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        path: "/"
      }
    },
    csrfToken: {
      name: "authjs.csrf-token",
      options: {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        path: "/",
      },
    },
  },
  pages: {
    signIn: '/login',
    signOut: "/",
    error: '/auth/error',
  },


  providers: [
    Credentials({
      authorize: async (credentials) => {
        // signIn (POSTリクエストのみ)

        if (!credentials.email || !credentials.password) {
          prosesLog("credentials doesn't have enough data");
          return null;
        }

        const parsed = LoginRequestSchema.parse({
          email: credentials.email,
          password: credentials.password
        });

        const user = await service.findByEmail(parsed.email);
        if (!user) {
          prosesLog("user undefined");
          return null;
        }

        let isValid = false;
        try {
          isValid = await service.verifyUserPassword({ email: parsed.email, password: parsed.password });
        } catch {
          prosesLog("verification failed");
          return null;
        }

        if (!isValid) {
          prosesLog("credentials not valid");
          return null;
        }

        return {
          id: user.id,
          email: user.email
        };
      }
    })
  ],


  // 認証成功時のデータ制御
  callbacks: {
    jwt: ({ token, user }) => {
      // getSession / signIn

      if (!user) {
        return token;
      }


      if (!user.id || !user.email) {
        prosesLog("Invalid user data");
        return null;
      }

      token.sub = user.id;
      token.email = user.email;

      return token;
    },
    session: ({ session, token }) => {
      // getSession / auth()

      if (!session.user) {
        prosesLog("session.user undefined");
      }

      if (!token.sub || !token.email) {
        prosesLog("Empty token");
        return session;
      }

      session.user.id = token.sub;
      session.user.email = token.email

      return session;
    }
  }
}
