//// ここは型安全を保障する層ではないため、使用前に必ずバリデーションを済ませる

import { Project, ProjectSchema } from "@pkg/shared";
import { Database } from "sqlite3";
import { ProjectWithoutId, UpdateProjectPayload } from "../types/index.js";
import { camelToDbObject, dbObjectToCamel } from "./dataTypeMapper.js";
import { DatabaseGetError } from "../error/DbError.js";
import { object } from "zod";

export class ProjectsRepository {
  private readonly tableName = "projects";

  constructor (
    private readonly db: Database
  ) {}

  saveProject = (data: ProjectWithoutId): Promise<Project> => {
    return new Promise((resolve, reject) => {
      this.db.run(
        `INSERT INTO ${this.tableName} (user_id, title, created_at, updated_at, description, status)
          VALUES (?, ?, ?, ?, ?, ?)`,
        [data.userId, data.title, data.createdAt, data.updatedAt, data.description, data.status],
        function (err) {
          if (err) return reject(err);
          const project: Project = { id: this.lastID, ...data };
          return resolve(project);
        }
      );
    });
  }

  getProjects = (): Promise<Project[] | []> => {
    return new Promise((resolve, reject) => {
      this.db.all(
        `SELECT * FROM ${this.tableName}`,
        (err, rows) => {
          if (!rows) return resolve([]);
          if (err) return reject(err);

          const data = dbObjectToCamel({
            data: rows,
            nullToUndefined: true,
            schema: ProjectSchema.array()
          });

          resolve(data);
        }
      )
    });
  }

  updateProject = async (data: UpdateProjectPayload, id: Project["id"]): Promise<Project> => {
    const dbData = camelToDbObject({ data: data, removeUndefined: true });

    const entries = Object.entries(dbData);

    const setClause = entries.map(([key]) => `${key} = ?`).join(", ");
    const params = entries.map(([, value]) => value);
    params.push(id);

    return new Promise((resolve, reject) => {
      this.db.run(
        `UPDATE ${this.tableName} SET ${setClause} WHERE id = ?;`,
        params,
        (err) => {
          if (err) return reject(err);

          this.db.get(
            `SELECT * FROM ${this.tableName} WHERE id = ?`,
            [id],
            (err, row) => {
              if (err) return reject(err);
              if (!row) return reject(new Error("Update failed: Row not found"));

              resolve(dbObjectToCamel({
                data: row,
                nullToUndefined: true,
                schema: ProjectSchema
              }));
            }
          );
        }
      );
    });
  }

  findById = (id: number): Promise<Project | null> => {
    return new Promise((resolve, reject) => {
      this.db.get(
        `SELECT * FROM ${this.tableName} WHERE id = ?`,
        [id],
        (err, row) => {
          if (!row) return resolve(null);
          if (err) return reject(err);

          const data = dbObjectToCamel({
            data: row,
            nullToUndefined: true,
            schema: ProjectSchema
          })

          return resolve(data);
        }
      );
    });
  }

  findByUserId = (userId: number): Promise<Project[]> => {
    return new Promise((resolve, reject) => {
      this.db.all(
        `SELECT * FROM ${this.tableName} WHERE user_id = ?`,
        [userId],
        (err, rows) => {
          if (!rows) return resolve([]);
          if (err) return reject(err);

          const data = dbObjectToCamel({
            data: rows,
            nullToUndefined: true,
            schema: ProjectSchema.array()
          })

          return resolve(data);
        }
      );
    });
  }

  findByTitle = (title: string): Promise<Project[]> => {
    return new Promise((resolve, reject) => {
      this.db.all(
        `SELECT * FROM ${this.tableName} WHERE title = ?`,
        [title],
        (err, rows) => {
          if (!rows) return resolve([]);
          if (err) return reject(err);

          const data = dbObjectToCamel({
            data: rows,
            nullToUndefined: true,
            schema: ProjectSchema.array()
          })

          return resolve(data);
        }
      );
    });
  }
}
