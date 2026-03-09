import { LoginRequest, PostProjectRequest, RegisterRequest } from "@pkg/shared";
import { Request } from "express"
import { mockReq } from "sinon-express-mock"

const dosRequests = {
  invalidReq_1: (): Request => {
      return mockReq({
        email: ["aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa!@aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.aaa"],
        password: "password".repeat(9),
        role: "admin",
        isAdmin: true,
        __proto__: { "polluted": true }
      })
    },
    invalidReq_2: (): Request => {
      return mockReq({
        email: "><script>document.location='http://attacker.com</script>@example.com",
        password: null
      })
    },
    invalidReq_3: (): Request => {
      return mockReq({
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

      return mockReq({
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

      return mockReq({ body: data });
    },

    ...dosRequests
  },

  login: {
    validReq: (): Request => {
      const data: LoginRequest = {
        email: "example@email.com",
        password: "password"
      }

      return mockReq({ body: data });
    },

    ...dosRequests,

    wrongPasswordReq: (): Request => {
      return mockReq({
        email: "example@email.com",
        password: "ThIsISWroNGpaSswOrd"
      });
    }
  },
}
