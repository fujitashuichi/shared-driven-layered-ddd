import Credentials from "@auth/express/providers/credentials";
import { UserService } from "../service/user.service.js";
import { verifyToken } from "../lib/jwt.js";
import { AuthError, UnAuthorizedError } from "../error/AuthError.js";
import { ExpressAuthConfig } from "@auth/express";
import { UserUndefinedError } from "../error/UserError.js";
import { JWTPayload } from "../types/types.payload.js";
import { SessionResponse } from "@pkg/shared";


const service = new UserService();

export const authConfig: ExpressAuthConfig = {
  basePath: "/api/auth/v2",
  // どうやってユーザーを特定するか
  providers: [
    Credentials({
      authorize: async (_credentials, req) => {
        const cookies: string[] | undefined = req.headers.get("cookie")?.split("; ");
        const token: string | undefined = cookies?.find(
          str => str.startsWith("token=")
        )?.split("=").slice(1).join("=");
        if (!token) throw new UnAuthorizedError();

        const verified: JWTPayload = verifyToken(token);

        const user = await service.findByEmail(verified.email);
        if (user === null) throw new UserUndefinedError();

        return user;
      }
    })
  ],
  // 認証成功時のデータ制御
  callbacks: {
    jwt: ({ token, user }) => {
      if (user?.email) {
        if (!user.id) throw new AuthError("user.id undefined", "AuthError");

        token.email = user.email;
        token.sub = user.id;
      }
      return token;
    },
    session: ({ session, token }) => {
      if (session.user) {
        if (!token.sub) throw new AuthError("token.sub undefined", "AuthError");
        if (!token.email) throw new AuthError("token.email undefined", "AuthError");

        session.user.id = token.sub;
        session.user.email = token.email
      }

      return session;
    }
  }
}
