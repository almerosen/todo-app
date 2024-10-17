import './App.css'
import { Route, Routes } from 'react-router-dom'
import { LandingPage } from './components/LandingPage/LandingPage'
import { TodosPage } from './components/TodosPage/TodosPage'


function App() {

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path='/todos' element={<TodosPage />} />

    </Routes>
  )
}

export default App
