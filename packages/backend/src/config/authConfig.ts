import Credentials from "@auth/express/providers/credentials";
import { UserService } from "../service/user.service.js";
import { ExpressAuthConfig } from "@auth/express";
import { LoginRequestSchema } from "@pkg/shared";
import { ENV } from "./env.js";
import { styleText } from "node:util";


const service = new UserService();
const secret: ExpressAuthConfig["secret"] = ENV.AUTH_SECRET;

const prosesLog = (color: "green" | "blue" | "red",text: string) => {
  return process.stdout.write(styleText(
    [color, "bold"],
    `\n\n` +
    `- -`.repeat(6) + ` authConfig ` + `- -`.repeat(6) +
    `\n\n${text}\n\n` +
    `- -`.repeat(14) +
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

        prosesLog("blue", "authorize running...");

        if (!credentials.email || !credentials.password) {
          prosesLog("red", "credentials doesn't have enough data");
          return null;
        }

        const parsed = LoginRequestSchema.parse({
          email: credentials.email,
          password: credentials.password
        });

        const user = await service.findByEmail(parsed.email);
        if (!user) {
          prosesLog("red", "user undefined");
          return null;
        }

        let isValid = false;
        try {
          isValid = await service.verifyUserPassword({ email: parsed.email, password: parsed.password });
        } catch {
          prosesLog("red", "verification failed");
          return null;
        }

        if (!isValid) {
          prosesLog("red", "credentials not valid");
          return null;
        }

        prosesLog("green", "authorize succeed");
        return {
          id: user.id,
          email: user.email,
          createdAt: user.createdAt.toISOString()
        };
      }
    })
  ],


  // 認証成功時のデータ制御
  callbacks: {
    jwt: ({ token, user }) => {
      // getSession / signIn

      prosesLog("blue", "jwt running...");

      if (!user) {
        return token;
      }
      if (!user.id || !user.email || !user.createdAt) {
        prosesLog("red", "Invalid user data");
        return token;
      }

      token.sub = user.id;
      token.email = user.email;
      token.createdAt = user.createdAt;

      prosesLog("green", "jwt succeed");
      return token;
    },
    session: ({ session, token }) => {
      // getSession / auth()

      prosesLog("blue", "jwt running...");

      if (!session.user) {
        prosesLog("red", "session.user undefined");
        return session;
      }

      if (!token.sub || !token.email || !token.createdAt) {
        prosesLog("red", "Token is missing or empty");
        return session;
      }

      session.user.id = token.sub;
      session.user.email = token.email;
      session.user.createdAt = token.createdAt;

      prosesLog("green", "jwt succeed");
      return session;
    }
  }
}
