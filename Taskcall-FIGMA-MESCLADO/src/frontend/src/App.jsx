import HomePage from './pages/HomePage'
import TaskcallLogin from './pages/TaskcallLogin'
import PainelTaskcall from './pages/PainelTaskcall'

function App() {
  const path = window.location.pathname.replace(/\/$/, '') || '/'

  if (path === '/login') {
    return <TaskcallLogin />
  }

  if (path === '/painel') {
    return <PainelTaskcall />
  }

  return <HomePage />
}

export default App
