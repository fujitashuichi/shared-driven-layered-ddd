import { Request } from "express";
import { mockReq } from "sinon-express-mock";

export const createRequestMock = {
  withoutData: () => {
    return mockReq();
  },

  withBody: (body: Request["body"]) => {
    return mockReq({ body: body });
  },

  withCookies: (cookies: Request["cookies"]) => {
    /* **cookiesの取得**
      const [name, value] = vi.mocked(res.cookie).mock.calls[0];
      const cookies = { [name]: value };
    */
    return mockReq({ cookies: cookies });
  },

  withParams: (params: Request["params"]) => {
    return mockReq({ params: params });
  }
}
