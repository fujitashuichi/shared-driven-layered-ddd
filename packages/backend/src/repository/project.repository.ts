import { Project } from "@pkg/shared";
import { SaveProjectPayload, UpdateProjectPayload } from "../types/index.js";
import { prisma } from "../lib/prisma.js";


export class ProjectsRepository {
  saveProject = async (data: SaveProjectPayload): Promise<Project> => {
    return await prisma.project.create({ data });
  }

  updateProject = async (data: UpdateProjectPayload, id: Project["id"]): Promise<Project> => {
    return await prisma.project.update({ data, where: { id } });
  }

  deleteProject = async (id: Project["id"]): Promise<Project> => {
    return await prisma.project.delete({ where: { id } });
  }

  findById = async (id: Project["id"]): Promise<Project | null> => {
    return await prisma.project.findUnique({ where: { id } });
  }

  findByUserId = async (userId: Project["userId"]): Promise<Project[]> => {
    return await prisma.project.findMany({ where: { userId } });
  }

  findByTitle = async (title: Project["title"]): Promise<Project[]> => {
    return await prisma.project.findMany({ where: { title } });
  }
}
