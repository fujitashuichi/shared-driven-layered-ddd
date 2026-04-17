import Credentials from "@auth/express/providers/credentials";
import { UserService } from "../service/user.service.js";
import { ExpressAuthConfig } from "@auth/express";
import { LoginRequestSchema } from "@pkg/shared";
import { ENV } from "./env.js";


const service = new UserService();
const secret: ExpressAuthConfig["secret"] = ENV.AUTH_SECRET;

export const authConfig: ExpressAuthConfig = {
  basePath: "/api/auth",
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
    }
  },


  providers: [
    Credentials({
      authorize: async (credentials) => {
        // signIn (POSTリクエストのみ)

        if (!credentials.email || !credentials.password) {
          return null;
        }

        const parsed = LoginRequestSchema.parse({
          email: credentials.email,
          password: credentials.password
        });

        const user = await service.findByEmail(parsed.email);
        if (!user) return null;

        let isValid = false;
        try {
          isValid = await service.verifyUserPassword({ email: parsed.email, password: parsed.password });
        } catch {
          return null;
        }

        if (!isValid) return null;

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

      if (user) {
        if (!user.id) return null;
        if (!user.email) return null;

        token.sub = user.id;
        token.email = user.email;
      }
      return token;
    },
    session: ({ session, token }) => {
      // getSession / auth()

      if (session.user) {
        if (token.sub && token.email) {
          session.user.id = token.sub;
          session.user.email = token.email
        }
      }

      return session;
    }
  }
}
