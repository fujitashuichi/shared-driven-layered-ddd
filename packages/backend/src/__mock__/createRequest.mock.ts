import { Request } from "express";
import { mockReq } from "sinon-express-mock";


export const createRequestMock = {
  withoutData: () => {
    return mockReq();
  },

  withBody: (body: Request["body"]) => {
    return mockReq({ body });
  },

  withCookies: (cookies: Request["cookies"]) => {
    /* **cookiesの取得**
      const [name, value] = vi.mocked(res.cookie).mock.calls[0];
      const cookies = { [name]: value };
    */
    const cookieString = Object.entries(cookies)
      .map(([k, v]) => `${k}=${v}`)
      .join('; ');

    const req = mockReq({
      cookies,
      headers: {
        "cookie": cookieString,
        "host": "localhost" // Auth.jsのRequest生成に必須
      }
    });


    return req;
  },

  withParams: (params: Request["params"]) => {
    return mockReq({ params });
  }
}
