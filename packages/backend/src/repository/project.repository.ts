//// ここは型安全を保障する層ではないため、使用前に必ずバリデーションを済ませる

import { Project, ProjectSchema } from "@pkg/shared";
import { Database } from "sqlite3";
import { DatabaseGetError } from "../error/DbError.js";
import { ProjectWithoutId } from "../types/index.js";

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

  getProducts = (): Promise<Project[] | []> => {
    return new Promise((resolve, reject) => {
      this.db.all(
        `SELECT * FROM ${this.tableName}`,
        (err, rows) => {
          if (!rows) return resolve([]);
          if (err) return reject(err);

          const parsedRow = ProjectSchema.array().safeParse(rows);
          if (!parsedRow.success) {
            console.error(parsedRow.error);
            return reject(new DatabaseGetError("AppDb", this.tableName));
          }

          resolve(parsedRow.data);
        }
      )
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

          const parsedRow = ProjectSchema.safeParse(row);
          if (!parsedRow.success) {
            console.error(parsedRow.error);
            return reject(new DatabaseGetError("AppDb", this.tableName));
          }

          return resolve(parsedRow.data);
        }
      );
    });
  }

  findByUserId = (userId: number): Promise<Project | null> => {
    return new Promise((resolve, reject) => {
      this.db.get(
        `SELECT * FROM ${this.tableName} WHERE user_id = ?`,
        [userId],
        (err, row) => {
          if (!row) return resolve(null);
          if (err) return reject(err);

          const parsedRow = ProjectSchema.safeParse(row);
          if (!parsedRow.success) {
            console.error(parsedRow.error);
            return reject(new DatabaseGetError("AppDb", this.tableName));
          }

          return resolve(parsedRow.data);
        }
      );
    });
  }

  findByTitle = (title: string): Promise<Project | null> => {
    return new Promise((resolve, reject) => {
      this.db.get(
        `SELECT * FROM ${this.tableName} WHERE title = ?`,
        [title],
        (err, row) => {
          if (!row) return resolve(null);
          if (err) return reject(err);

          const parsedRow = ProjectSchema.safeParse(row);
          if (!parsedRow.success) {
            console.error(parsedRow.error);
            return reject(new DatabaseGetError("AppDb", this.tableName));
          }

          return resolve(parsedRow.data);
        }
      );
    });
  }
}
