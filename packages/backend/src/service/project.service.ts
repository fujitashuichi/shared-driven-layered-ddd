import { ProjectsRepository, UsersRepository } from "../repository/index.js";
import { PatchProjectRequest, PostProjectRequest, Project, User } from "@pkg/shared";
import { ProjectUndefinedError } from "../error/index.js";
import { SaveProjectPayload } from "../types/type.db.js";
import { styleText } from "node:util";


export class ProjectService {
  private readonly projectsRepository = new ProjectsRepository();
  private readonly usersRepository = new UsersRepository();


  saveProject = async (dto: PostProjectRequest, userId: User["id"]) => {
    try {
      if (await this.usersRepository.findById(userId) === null) {
        console.error("Cannot create Project because User undefined");
      }

      const newProject: SaveProjectPayload = {
        ...dto,
        userId: userId,
        createdAt: new Date(),
        updatedAt: new Date()
      }
      const savedProject = await this.projectsRepository.saveProject(newProject);
      return savedProject;
    } catch (e) {
      if (e instanceof Error) {
        console.error(styleText(
          ["red", "bgYellowBright"],
          `"${e.name}" caught\nin ${import.meta.filename}`
        ));

        throw e;
      }
    }
  }

  updateProject = async (dto: PatchProjectRequest, id: Project["id"]): Promise<Project> => {
    const currentProject = await this.projectsRepository.findById(id)
    if (currentProject === null) {
      console.error("Cannot update Project because Project undefined");
      throw new ProjectUndefinedError();
    }

    const newProject: PatchProjectRequest = dto;

    const updatedProject: Project = await this.projectsRepository.updateProject(newProject, id);
    return updatedProject;
  }

  deleteProject = async (id: Project["id"]): Promise<Project> => {
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
