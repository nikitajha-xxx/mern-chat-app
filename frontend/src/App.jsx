import './App.css'
import {Routes, Route} from 'react-router-dom'
import ChatPage from './pages/ChatPage.jsx'
import Home from './pages/Home.jsx'

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/chats' element={<ChatPage />}> </Route>
      </Routes>
    </div>
    
  )
}

export default App
