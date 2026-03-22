import { Project } from "@pkg/shared";
import { SaveProjectPayload, UpdateProjectPayload } from "../types/index.js";
import { prisma } from "../lib/prisma.js";
import { safeQuery } from "./safeQuery.js";


export class ProjectsRepository {
  saveProject = async (data: SaveProjectPayload): Promise<Project | null> => {
    console.log("trying save:", data);
    return await safeQuery(() =>
      prisma.project.create({ data })
    );
  }

  updateProject = async (data: UpdateProjectPayload, id: Project["id"]): Promise<Project | null> => {
    return await safeQuery(() =>
      prisma.project.update({ data, where: { id } })
    );
  }

  deleteProject = async (id: Project["id"]): Promise<Project | null> => {
    return await safeQuery(() =>
      prisma.project.delete({ where: { id } })
    );
  }

  findById = async (id: Project["id"]): Promise<Project | null> => {
    return await safeQuery(() =>
      prisma.project.findUnique({ where: { id } })
    );
  }

  findByUserId = async (userId: Project["userId"]): Promise<Project[] | null> => {
    return await safeQuery(() =>
      prisma.project.findMany({ where: { userId } })
    );
  }

  findByTitle = async (title: Project["title"]): Promise<Project[] | null> => {
    return await safeQuery(() =>
      prisma.project.findMany({ where: { title } })
    );
  }
}
