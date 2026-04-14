import { Routes, Route, Outlet } from 'react-router-dom'
import Home from './components/Home'
import Landing from './components/Landing'
import TopicSelect from './components/TopicSelect'
import GameEngine from './components/GameEngine'
import Results from './components/Results'

function QuizLayout() {
  return (
    <div className="app-container">
      <Outlet />
    </div>
  )
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route element={<QuizLayout />}>
        <Route path="/eating" element={<Landing />} />
        <Route path="/topics" element={<TopicSelect />} />
        <Route path="/play/:topicId" element={<GameEngine />} />
        <Route path="/results" element={<Results />} />
      </Route>
    </Routes>
  )
}
