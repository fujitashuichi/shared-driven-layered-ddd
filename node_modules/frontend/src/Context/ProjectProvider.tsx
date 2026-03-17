import type React from 'react'
import { ProjectCtx } from './ProjectsContext'

export function ProjectProvider({ children }: { children: React.ReactNode }) {


  return (
    <ProjectCtx.Provider value={}>
      {children}
    </ProjectCtx.Provider>
  )
}
