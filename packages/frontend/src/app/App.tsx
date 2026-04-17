"use client";

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { HomePage, ProjectsPage, UserPage } from './pages'
import { ProjectPage } from '../features/projects/components/ProjectPage'
import { TestRouter } from './routes/TestRouter'
import { ProjectProvider } from '../Context'
import { LoginAndSignUp } from './pages/LoginAndSignUp'
import { VercelNotice } from '../components/VercelNotice'
import { SessionProvider } from "next-auth/react";
import { LoginErrorPage } from '../features/auth/components/errors/LoginErrorPage';


function AppRouter() {
  return (<>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/login' element={<LoginAndSignUp />} />
        <Route path='/auth/error' element={<LoginErrorPage />} />

        <Route path='/projects' element={<ProjectsPage />} />
        <Route path='/projects/:id' element={<ProjectPage />} />
        <Route path='/user' element={<UserPage />} />

        <Route path='/test/*' element={<TestRouter />} />
      </Routes>
    </BrowserRouter>
  </>)
}


function App() {
  return (
    <SessionProvider basePath="/api/auth">
      <ProjectProvider>
        <VercelNotice />
        <AppRouter />
      </ProjectProvider>
    </SessionProvider>
  )
}

export default App
