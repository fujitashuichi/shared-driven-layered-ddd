import { PostProjectRequest } from "@pkg/shared";
import { Request } from "express"
import { mockReq } from "sinon-express-mock"

export const projectRequestMocks = {
  postProject: {
    validReq_1: () => {
      const data: PostProjectRequest = {
        title: "Title",
        description: null,
        status: "done"
      };
      return mockReq({ body: data });
    },
    validReq_2: () => {
      const data: PostProjectRequest = {
        title: "Title",
        description: "description",
        status: null
      };
      return mockReq({ body: data });
    },


    invalidReq_1: (): Request => {
      return mockReq({
        body: {
          title: new Array(500000).fill("A"),
          description: "desc"
        }
      });
    },
    invalidReq_2: (): Request => {
      const obj: any = {
        title: "Title"
      };
      obj.self = obj;
      return mockReq({ body: obj });
    },
    invalidReq_3: (): Request => {
      return mockReq({
        body: {
          title: "Title",
          description: "desc",
          id: 9999,
          userId: 1,
          createdAt: 0,
          updatedAt: 0,
          __proto__: {
            polluted: true
          }
        }
      });
    },
    invalidReq_4: (): Request => {
      return mockReq({
        body: {
          title: "\u0000\u0001\u0002<script>alert(1)</script>",
          description: "\u202E\u202E\u202E"
        }
      });
    },
  }
}