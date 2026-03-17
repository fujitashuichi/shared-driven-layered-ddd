import type React from 'react'
import { ProjectCtx, type ProjectCtxType } from './ProjectsContext'
import { useCreateProject, useDeleteProject, useGetProjects, useUpdateProjects } from '../features/projects/hooks'
import { useEffect } from 'react'

export function ProjectProvider({ children }: { children: React.ReactNode }) {
  const getProjectsHook = useGetProjects();

  useEffect(() => {
    getProjectsHook.get();
  }, [])

  const ctxData: ProjectCtxType = {
    getProjects: getProjectsHook,
    create: useCreateProject(),
    update: useUpdateProjects(),
    delete: useDeleteProject()
  }

  return (
    <ProjectCtx.Provider value={ctxData}>
      {children}
    </ProjectCtx.Provider>
  )
}
