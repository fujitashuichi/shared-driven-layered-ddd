// import { isSessionActive } from '../features/auth/api'
import { LoginContainer, RegisterForm } from '../features/auth/components'
import { LogoutButton } from '../features/auth/components/LogoutButton'
import { CreateProjectForm } from '../features/projects/components/CreateProjectForm'
import { ProjectList } from '../features/projects/components/ProjectList'
import './App.css'

function App() {
  // setInterval(async () => console.log(await isSessionActive()), 3000);
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
