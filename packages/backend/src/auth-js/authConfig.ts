import Credentials from "@auth/express/providers/credentials";
import { UserService } from "../service/user.service.js";
import { verifyToken } from "../lib/jwt.js";
import { AuthError, UnAuthorizedError } from "../error/AuthError.js";
import { ExpressAuthConfig } from "@auth/express";
import { UserUndefinedError } from "../error/UserError.js";
import { JWTPayload } from "../types/types.payload.js";
import { LoginRequestSchema } from "@pkg/shared";


const service = new UserService();

export const authConfig: ExpressAuthConfig = {
  basePath: "/api/auth/v2",
  trustHost: true,
  cookies: {
    sessionToken: {
      name: `token`, // ここを既存の名称に合わせる
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
      },
    },
  },


  // どうやってユーザーを特定するか
  providers: [
    Credentials({
      authorize: async (credentials) => {
        // signIn (POSTリクエストのみ)

        if (!credentials.email || !credentials.password) {
          return null;
        }

        const verified = LoginRequestSchema.parse({
          email: credentials.email,
          password: credentials.password
        });

        const user = await service.findByEmail(verified.email);
        if (!user) return null;

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
        if (!user.id) throw new AuthError("user.id undefined", "AuthError");
        if (!user.email) throw new AuthError("user.email undefined", "AuthError");

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
