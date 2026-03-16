import { LoginContainer, LogoutButton, RegisterForm } from '../features/auth/components'
import { CreateProjectForm } from '../features/projects/components/CreateProjectForm'
import { ProjectList } from '../features/projects/components/ProjectList'
import './App.css'

function App() {
  return (
    <>
      <RegisterForm />
      <LoginContainer />
      <LogoutButton />
      <CreateProjectForm />
      <ProjectList />
    </>
  )
}

export default App
