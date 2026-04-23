import type React from 'react'
import { useCreateProject, useDeleteProject, useGetProjects, useProjectsData, useUpdateProjects } from '../features/projects/hooks'
import { useEffect, useMemo } from 'react'
import { ProjectCtx, type ProjectCtxType } from './ProjectContext';

export function ProjectProvider({ children }: { children: React.ReactNode }) {
  const projectsHook = useProjectsData();
  const getProjectsHook = useGetProjects(projectsHook.setProjects);

  const { get } = getProjectsHook;

  const createProjectsHook = useCreateProject(get);
  const updateProjectHook = useUpdateProjects(get);
  const deleteProjects = useDeleteProject(get);

  useEffect(() => {
    get();
  }, []);

  const ctxData: ProjectCtxType = useMemo(() => ({
    projectsData: projectsHook,
    getProjects: getProjectsHook,
    create: createProjectsHook,
    update: updateProjectHook,
    delete: deleteProjects
  }), [projectsHook, getProjectsHook, createProjectsHook, updateProjectHook, deleteProjects]);


  return (
    <ProjectCtx.Provider value={ctxData}>
      {children}
    </ProjectCtx.Provider>
  )
}
