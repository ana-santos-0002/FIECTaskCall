import React from 'react'
import PortalFiec from './pages/PortalFiec'
import TaskcallLogin from './pages/TaskcallLogin'
import PainelTaskcall from './pages/PainelTaskcall'
import CriarChamado from './pages/CriarChamado'
import InboxTaskcall from './pages/InboxTaskcall'
import { getUser } from './api'

export default function App() {
  const [path, setPath] = React.useState(window.location.pathname.replace(/\/$/, '') || '/')
  const navigate = (next) => { window.history.pushState({}, '', next); setPath(next) }
  React.useEffect(() => { const onPop=()=>setPath(window.location.pathname.replace(/\/$/, '')||'/'); window.addEventListener('popstate',onPop); return()=>window.removeEventListener('popstate',onPop) },[])
  const user = getUser()

  if (path === '/painel') return <PainelTaskcall navigate={navigate} user={user} />
  if (path === '/chamado' || path === '/criar-chamado') return <CriarChamado navigate={navigate} user={user} />
  if (path === '/inbox') return <InboxTaskcall navigate={navigate} user={user} />
  if (path === '/login') return <TaskcallLogin navigate={navigate} />
  return <PortalFiec navigate={navigate} />
}
