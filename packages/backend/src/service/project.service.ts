import { Database } from "sqlite3";
import { createAppDb } from "../db/index.js";
import { ProjectsRepository, UsersRepository, dbSecurityGuard } from "../repository/index.js";
import { ProjectWithoutId } from "../types/index.js";
import { PostProjectRequest, Project } from "@pkg/shared";
import { UserUndefinedError } from "../error/index.js";

const appDb = await createAppDb("app.db");

type SearchQuery =
  | { type: "id", value: Project["id"] }
  | { type: "userId", value: Project["userId"] }
  | { type: "title", value: Project["title"] }


export class ProjectService {
  private readonly projectsRepository: ProjectsRepository;
  private readonly usersRepository: UsersRepository;

  constructor(db: Database = appDb) {
    this.projectsRepository = new ProjectsRepository(db);
    this.usersRepository = new UsersRepository(db);
  }

  saveProject = async (dto: PostProjectRequest) => {
    dbSecurityGuard(dto);

    if (await this.usersRepository.findById(dto.userId) === null) {
      console.error("Cannot create Project because User undefined");
      throw new UserUndefinedError();
    }

    const newProject: ProjectWithoutId = {
      ...dto,
      createdAt: Date.now(),
      updatedAt: Date.now()
    }
    const savedProject = await this.projectsRepository.saveProject(newProject);
    return savedProject;
  }

  searchProject = async (query: SearchQuery): Promise<Project | Project[] | null> => {
    switch (query.type) {
      case "id":
        return await this.projectsRepository.findById(query.value);

      case "userId":
        return await this.projectsRepository.findByUserId(query.value);

      case "title":
        return await this.projectsRepository.findByTitle(query.value);
    }
  }
}
