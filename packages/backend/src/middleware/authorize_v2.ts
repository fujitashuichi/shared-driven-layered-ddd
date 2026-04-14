import Credentials from "@auth/express/providers/credentials";
import { UserService } from "../service/user.service.js";
import { verifyToken } from "../lib/jwt.js";
import { UnAuthorizedError } from "../error/AuthError.js";
import { ExpressAuthConfig } from "@auth/express";
import { UserUndefinedError } from "../error/UserError.js";
import { JWTPayload } from "../types/types.payload.js";


const service = new UserService();

export const authConfig: ExpressAuthConfig = {
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
        token.email = user.email;
      }
      return token;
    },
    session: ({ session, token }) => {
      if (session.user) {
        if (!token.email) throw new Error("token.sub undefined");

        session.user.email = token.email;
      }

      return session;
    }
  }
}
