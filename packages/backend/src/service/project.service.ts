import { Database } from "sqlite3";
import { createAppDb } from "../db/index.js";
import { ProjectsRepository, UsersRepository } from "../repository/index.js";
import { ProjectWithoutId } from "../types/index.js";
import { PostProjectRequest, Project } from "@pkg/shared";
import { UserUndefinedError } from "../error/index.js";

const appDb = await createAppDb("app.db");


export class ProjectService {
  private readonly projectsRepository: ProjectsRepository;
  private readonly usersRepository: UsersRepository;

  constructor(db: Database = appDb) {
    this.projectsRepository = new ProjectsRepository(db);
    this.usersRepository = new UsersRepository(db);
  }

  saveProject = async (dto: PostProjectRequest) => {
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

  finByUserId = async (userId: Project["userId"]): Promise<Project[]> => {
    return await this.projectsRepository.findByUserId(userId);
  }
  findById = async (id: Project["id"]): Promise<Project | null> => {
    return await this.projectsRepository.findById(id);
  }
  findByUserId = async (userId: Project["userId"]): Promise<Project[]> => {
    return await this.projectsRepository.findByUserId(userId);
  }
  findByTitle = async (title: Project["title"]): Promise<Project[]> => {
    return await this.projectsRepository.findByTitle(title);
  }
}
