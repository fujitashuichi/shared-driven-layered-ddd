import { LoginContainer, RegisterForm } from '../features/auth/components'
import { LogoutButton } from '../features/auth/components/LogoutButton'
import './App.css'

function App() {
  return (
    <>
      <RegisterForm />
      <LoginContainer />
      <LogoutButton />
    </>
  )
}

export default App
