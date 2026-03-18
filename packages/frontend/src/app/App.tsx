import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { LoginContainer, LogoutButton, RegisterForm } from '../features/auth/components'
import { CreateProjectForm } from '../features/projects/components/CreateProjectForm'
import { ProjectList } from '../features/projects/components/ProjectList'
import './App.css'
import { ProjectsPage, UserPage } from './pages'
import { ProjectPage } from '../features/projects/components/ProjectPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/projects' element={<ProjectsPage />} />
        <Route path='/projects/:id' element={<ProjectPage />} />
        <Route path='/user' element={<UserPage />} />

        <Route path='/test' element={<>
          <RegisterForm />
          <LoginContainer />
          <LogoutButton />
          <CreateProjectForm />
          <ProjectList />
        </>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
