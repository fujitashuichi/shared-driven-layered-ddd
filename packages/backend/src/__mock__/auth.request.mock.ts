import { LoginRequest, RegisterRequest } from "@pkg/shared";
import { Request } from "express"
import { createRequest } from "node-mocks-http";

const dosRequests = {
  invalidReq_1: (): Request => {
      return createRequest({
        email: ["aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa!@aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.aaa"],
        password: "password".repeat(9),
        role: "admin",
        isAdmin: true,
        __proto__: { "polluted": true }
      })
    },
    invalidReq_2: (): Request => {
      return createRequest({
        email: "><script>document.location='http://attacker.com</script>@example.com",
        password: null
      })
    },
    invalidReq_3: (): Request => {
      return createRequest({
        email: {
          value: {
            value: {
              value: "attacker@example.com"
            }
          }
        },
        password: "password",
        __proto__: {
          polluted: true
        },
        constructor: {
          prototype: {
            hacked: true
          }
        }
      });
    },
    invalidReq_4: (): Request => {
      const huge = "A".repeat(2_000_000);

      return createRequest({
        email: huge + "@example.com",
        password: huge,
        extra1: huge,
        extra2: huge,
        extra3: huge,
        extra4: huge,
        extra5: huge
      });
    },
}

export const authRequestMocks = {
  register: {
    validReq: (): Request => {
      const data: RegisterRequest = {
        email: "example@email.com",
        password: "password"
      }

      return createRequest({ body: data });
    },

    ...dosRequests
  },

  login: {
    validReq: (): Request => {
      const data: LoginRequest = {
        email: "example@email.com",
        password: "password"
      }

      return createRequest({ body: data });
    },

    ...dosRequests,

    wrongPasswordReq: (): Request => {
      return createRequest({
        email: "example@email.com",
        password: "ThIsISWroNGpaSswOrd"
      });
    }
  },
}
