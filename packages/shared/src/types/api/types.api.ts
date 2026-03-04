export type AuthFetchPath =
  | "/api/auth/register"
  | "/api/auth/is-logged-in"
  | "/api/auth/login"
  | "/api/auth/logout"
  | "/api/me"

export type ProjectFetchPath =
  | "/api/projects"
  | `/api/projects/${number}`
