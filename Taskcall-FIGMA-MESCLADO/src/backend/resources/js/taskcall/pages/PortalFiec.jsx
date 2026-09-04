export default function PortalFiec({navigate}){
  return <main className="fiec-portal">
    <div className="portal-image" aria-hidden="true"></div>
    <button className="portal-taskcall" onClick={()=>navigate('/login')} aria-label="Abrir FIEC Taskcall">
      <span className="portal-task-icon">✓</span>
      <span><b>FIEC Taskcall</b><small>Acesse o sistema de chamados</small></span>
      <strong>›</strong>
    </button>
  </main>
}
