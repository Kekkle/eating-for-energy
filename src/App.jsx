import { Routes, Route } from 'react-router-dom'
import Landing from './components/Landing'
import TopicSelect from './components/TopicSelect'
import GameEngine from './components/GameEngine'
import Results from './components/Results'

export default function App() {
  return (
    <div className="app-container">
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/topics" element={<TopicSelect />} />
        <Route path="/play/:topicId" element={<GameEngine />} />
        <Route path="/results" element={<Results />} />
      </Routes>
    </div>
  )
}
