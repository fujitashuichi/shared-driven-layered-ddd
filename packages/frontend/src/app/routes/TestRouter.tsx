import { useRoutes, type RouteObject } from "react-router-dom";
import { LoginContainer, LogoutButton, RegisterForm } from "../../features/auth/components";
import { CreateProjectForm } from "../../features/projects/components/CreateProjectForm";
import { ProjectList } from "../../features/projects/components/ProjectList";

const TestRoutCfg: RouteObject = {
  path: '/',
  element: (<>
    <RegisterForm />
    <LoginContainer />
    <LogoutButton />
    <CreateProjectForm />
    <ProjectList />
  </>)
};

export const TestRouter = () => {
  return useRoutes([TestRoutCfg]);
}
