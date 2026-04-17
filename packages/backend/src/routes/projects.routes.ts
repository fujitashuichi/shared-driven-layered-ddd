import { Router } from "express";
import { requestValidator } from "../middleware/index.js";
import { createProject, deleteProject, getProjects, updateProject } from "../controller/index.js";
import { isUsersProject } from "../middleware/isUsersProject.js";
import { authorize } from "../middleware/index.js";


export const createProjectRouter = () => {
  const router = Router();

  router.post("/",
    requestValidator("postProject"),
    authorize(),
    createProject()
  );

  router.get("/",
    authorize(),
    getProjects()
  );

  router.patch("/:id",
    requestValidator("patchProject"),
    authorize(),
    isUsersProject(),
    updateProject()
  );

  router.delete("/:id",
    authorize(),
    isUsersProject(),
    deleteProject()
  );

  return router;
}
