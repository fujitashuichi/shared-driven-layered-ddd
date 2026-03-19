import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { LoginContainer, LogoutButton, RegisterForm } from '../features/auth/components'
import { CreateProjectForm } from '../features/projects/components/CreateProjectForm'
import { ProjectList } from '../features/projects/components/ProjectList'
import './App.css'
import { ProjectsPage, UserPage } from './pages'
import { ProjectPage } from '../features/projects/components/ProjectPage'
import { ErrorBoundary } from 'react-error-boundary'
import { GlobalErrorBoundary } from '../error'


function TestRouter() {
  return(
    <Route path='/test' element={<>
      <RegisterForm />
      <LoginContainer />
      <LogoutButton />
      <CreateProjectForm />
      <ProjectList />
    </>} />
  )
};


function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/projects' element={<ProjectsPage />} />
        <Route path='/projects/:id' element={<ProjectPage />} />
        <Route path='/user' element={<UserPage />} />

        <TestRouter />
      </Routes>
    </BrowserRouter>
  )
}


function App() {
  return (
    <ErrorBoundary fallback={<GlobalErrorBoundary />}>
      <AppRouter />
    </ErrorBoundary>
  )
}

export default App
