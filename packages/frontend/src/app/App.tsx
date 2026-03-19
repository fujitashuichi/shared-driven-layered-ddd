import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { ProjectsPage, UserPage } from './pages'
import { ProjectPage } from '../features/projects/components/ProjectPage'
import { ErrorBoundary } from 'react-error-boundary'
import { GlobalErrorBoundary } from '../error'
import { TestRouter } from './routes/TestRouter'


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
    <ErrorBoundary fallback={<GlobalErrorBoundary />}>
      <AppRouter />
    </ErrorBoundary>
  )
}

export default App
