import { User } from "@pkg/shared";
import { SaveProjectPayload } from "../types/type.db.js";

export const projectPayloadMock = {
  SaveProjectPayload: (user: User): SaveProjectPayload => {
    return {
      userId: user.id,
      title: "title",
      description: "description",
      status: null
    }
  }
}
