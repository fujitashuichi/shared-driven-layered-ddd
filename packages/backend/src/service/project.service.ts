import { ProjectsRepository, UsersRepository } from "../repository/index.js";
import { PatchProjectRequest, PostProjectRequest, Project, User } from "@pkg/shared";
import { ProjectUndefinedError, UserUndefinedError } from "../error/index.js";
import { SaveProjectPayload } from "../types/type.db.js";


export class ProjectService {
  private readonly projectsRepository = new ProjectsRepository();
  private readonly usersRepository = new UsersRepository();


  saveProject = async (dto: PostProjectRequest, userId: User["id"]): Promise<Project | null> => {
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
  }

  updateProject = async (dto: PatchProjectRequest, id: Project["id"]): Promise<Project> => {
    const currentProject = await this.projectsRepository.findById(id)
    if (currentProject === null) {
      console.error("Cannot update Project because Project undefined");
      throw new ProjectUndefinedError();
    }

    const newProject: PatchProjectRequest = dto;

    const updatedProject: Project | null = await this.projectsRepository.updateProject(newProject, id);
    if (!updatedProject) throw new Error("Cannot get saved Project");
    return updatedProject;
  }

  deleteProject = async (id: Project["id"]): Promise<Project> => {
    const result = await this.projectsRepository.deleteProject(id);
    if (!result) throw new Error("Cannot get deleted Project");
    return result;
  }
  findByUserId = async (userId: Project["userId"]): Promise<Project[]> => {
    const result = await this.projectsRepository.findByUserId(userId);
    if (!result) throw new ProjectUndefinedError();
    return result;
  }
  findById = async (id: Project["id"]): Promise<Project | null> => {
    return await this.projectsRepository.findById(id);
  }
  findByTitle = async (title: Project["title"]): Promise<Project[]> => {
    const result = await this.projectsRepository.findByTitle(title);
    if (!result) throw new ProjectUndefinedError();
    return result;
  }
}
