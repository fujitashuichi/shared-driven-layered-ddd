import { Database } from "sqlite3";
import { createAppDb } from "../db/index.js";
import { ProjectsRepository, UsersRepository } from "../repository/index.js";
import { ProjectWithoutId, UpdateProjectPayload } from "../types/index.js";
import { PatchProjectRequest, PostProjectRequest, Project, User } from "@pkg/shared";
import { ProjectUndefinedError, UserUndefinedError } from "../error/index.js";

const appDb = await createAppDb("app.db");


export class ProjectService {
  private readonly projectsRepository: ProjectsRepository;
  private readonly usersRepository: UsersRepository;

  constructor(db: Database = appDb) {
    this.projectsRepository = new ProjectsRepository(db);
    this.usersRepository = new UsersRepository(db);
  }

  saveProject = async (dto: PostProjectRequest, userId: User["id"]) => {
    if (await this.usersRepository.findById(userId) === null) {
      console.error("Cannot create Project because User undefined");
      throw new UserUndefinedError();
    }

    const newProject: ProjectWithoutId = {
      ...dto,
      userId: userId,
      createdAt: Date.now(),
      updatedAt: Date.now()
    }
    const savedProject = await this.projectsRepository.saveProject(newProject);
    return savedProject;
  }

  updateProject = async (dto: PatchProjectRequest, id: Project["id"]): Promise<Project> => {
    const currentProject = await this.projectsRepository.findById(id)
    if (currentProject === null) {
      console.error("Cannot update Project because Project undefined");
      throw new ProjectUndefinedError();
    }

    const newProject: UpdateProjectPayload = {
      ...dto,
      updatedAt: Date.now()
    }

    const updatedProject: Project = await this.projectsRepository.updateProject(newProject, id);
    return updatedProject;
  }

  deleteProject = async (id: Project["id"]): Promise<true> => {
    return await this.projectsRepository.deleteProject(id);
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
