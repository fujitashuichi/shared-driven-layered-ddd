import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { ProjectsPage, UserPage } from './pages'
import { ProjectPage } from '../features/projects/components/ProjectPage'
import { TestRouter } from './routes/TestRouter'
import { ProjectProvider } from '../Context'


function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
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
