import { AppHeader } from "../../components/AppHeader";
import { useAuth } from "../../Context";
import { ProjectList } from "../../features/projects/components/ProjectList";

export function ProjectsPage() {
  const { useUser } = useAuth();
  const { user } = useUser;

  return (
    <div>
      <AppHeader user={user} />
      <ProjectList />
    </div>
  )
}
