import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { HomePage, ProjectsPage, UserPage } from './pages'
import { ProjectPage } from '../features/projects/components/ProjectPage'
import { TestRouter } from './routes/TestRouter'
import { ProjectProvider } from '../Context'
import { LoginAndSignUp } from './pages/LoginAndSignUp'


function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/login' element={<LoginAndSignUp />} />

        <Route path='/projects' element={<ProjectsPage />} />
        <Route path='/projects/:id' element={<ProjectPage />} />
        <Route path='/user' element={<UserPage />} />

        <Route path='/test/*' element={<TestRouter />} />
      </Routes>
    </BrowserRouter>
  )
}


function App() {
  return (
    <ProjectProvider>
      <AppRouter />
    </ProjectProvider>
  )
}

export default App
