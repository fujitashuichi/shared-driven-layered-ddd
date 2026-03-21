import { SaveProjectPayload } from "../types/type.db.js";

export const projectPayloadMock = {
  SaveProjectPayload: (): SaveProjectPayload => {
    return {
      userId: "uuid",
      title: "title",
      description: "description",
      status: null,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  }
}
