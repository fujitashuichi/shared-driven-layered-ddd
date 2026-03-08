import { PostProjectRequest } from "@pkg/shared";
import { Request } from "express"
import { mockReq } from "sinon-express-mock"
import { GetProjectsRequest } from "../../../shared/dist/types/project/types.dto.js";

export const projectRequestMocks = {
  createRequest: (body: Request["body"]): Request => {
    return mockReq({ body: body });
  },

  postProject: {
    validReq_1: () => {
      const data: PostProjectRequest = {
        userId: 1,
        title: "Title"
      };
      return mockReq({ body: data });
    },
    validReq_2: () => {
      const data: PostProjectRequest = {
        userId: 1,
        title: "Title",
        description: "description"
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
  },

  getProjects: {
    validReq: () => {
      const data: GetProjectsRequest = {
        userId: 1
      };
      return mockReq({ body: data });
    },

    invalidReq_1: (): Request => {
      return mockReq({
        body: {
          userId: new Array(500000).fill("A"),
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
          userId: 1,
          __proto__: {
            polluted: true
          }
        }
      });
    },
    invalidReq_4: (): Request => {
      return mockReq({
        body: {
          title: "\u0000\u0001\u0002<script>alert(1)</script>"
        }
      });
    },
  }
}