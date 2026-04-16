import { PatchProjectRequest, PostProjectRequest } from "@pkg/shared";
import { Request } from "express"
import { createRequest } from "node-mocks-http";

export const projectRequestMocks = {
  postProject: {
    validReq_1: () => {
      const body: PostProjectRequest = {
        title: "Title",
        description: null,
        status: "done"
      };
      return createRequest({ body });
    },
    validReq_2: () => {
      const body: PostProjectRequest = {
        title: "Title",
        description: "description",
        status: null
      };
      return createRequest({ body });
    },


    invalidReq_1: (): Request => {
      return createRequest({
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
      return createRequest({ body: obj });
    },
    invalidReq_3: (): Request => {
      return createRequest({
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
      return createRequest({
        body: {
          title: "\u0000\u0001\u0002<script>alert(1)</script>",
          description: "\u202E\u202E\u202E"
        }
      });
    },
  },


  updateProject: {
    validReq_1: () => {
      const body: PatchProjectRequest = {
        title: undefined,
        description: { set: "new description" },
        status: { set: null }
      }
      return createRequest({ body });
    }
  },
}