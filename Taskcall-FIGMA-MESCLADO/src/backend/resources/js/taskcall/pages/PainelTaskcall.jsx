import { useEffect, useState } from 'react'
import { api, clearUser } from '../api'

function Side({navigate}){return <aside className="sidebar">
  <div className="side-brand"><span>✓</span><b>FIEC</b><em>Taskcall</em></div>
  <div className="side-user"><span className="avatar">U</span><div><b>Usuário</b><small>Solicitante</small></div></div>
  <nav>
    <button className="side active" onClick={()=>navigate('/painel')}><span className="ico">⌂</span><span>Início</span></button>
    <button className="side" onClick={()=>navigate('/inbox')}><span className="ico">▤</span><span>Inbox</span></button>
    <button className="side" onClick={()=>navigate('/chamado')}><span className="ico">＋</span><span>Fazer chamado</span></button>
    <button className="side" onClick={()=>navigate('/inbox')}><span className="ico">◉</span><span>Meus chamados</span></button>
  </nav>
  <div className="sidebar-bottom"><button className="side"><span className="ico">⚙</span><span>Configurações</span></button><button className="side" onClick={()=>{clearUser();navigate('/')}}><span className="ico">↪</span><span>Sair</span></button></div>
</aside>}
function Quick({icon,text,value,tone}){return <div className="quick-card"><span className={'quick-icon '+tone}>{icon}</span><div><b>{text}</b><small>{String(value||0).padStart(2,'0')} chamados</small></div><span className="arrow">›</span></div>}
function Metric({title,value,suffix}){return <div className="metric"><div><small>{title}</small><strong>{value}<sup>{suffix}</sup></strong></div><span className="metric-up">↗</span></div>}
function statusClass(s){return s==='Resolvido'?'green':s==='Em progresso'?'blue':s==='Aguardando'?'orange':'red'}
export default function PainelTaskcall({navigate,user}){
 const [state,setState]=useState({chamados:[],metricas:{}}); const [loading,setLoading]=useState(true); const [erro,setErro]=useState('')
 useEffect(()=>{api(`/painel${user?.id_usuario ? `?id_usuario=${user.id_usuario}` : ''}`).then(setState).catch(e=>setErro(e.message)).finally(()=>setLoading(false))},[user?.id_usuario])
 const m=state.metricas||{}; const tickets=(state.chamados||[]).slice(0,7)
 return <main className="app-shell"><Side navigate={navigate}/><section className="main-area">
  <header className="topbar"><div><small>FIEC Taskcall</small><h1>Painel Principal</h1></div><div className="top-user"><span className="avatar">{(user?.email||'U')[0].toUpperCase()}</span><div><b>{user?.nome||user?.email||'Usuário'}</b><small>{user?.funcao||'Solicitante'}</small></div><span>⌄</span></div></header>
  <div className="content-wrap">{erro&&<div className="api-error">{erro}</div>}
   <div className="quick-row"><Quick icon="◉" text="Chamados não visualizados" value={m.abertos} tone="orange"/><Quick icon="✓" text="Chamados em andamento" value={m.andamento} tone="blue"/><Quick icon="!" text="Chamados aguardando" value={m.pendentes} tone="red"/><Quick icon="□" text="Chamados concluídos" value={m.concluidos} tone="gray"/></div>
   <div className="dashboard-grid">
    <section className="panel-card ticket-panel"><div className="card-head"><div><b>Meus chamados</b><small>Últimas solicitações registradas</small></div><button className="link-btn" onClick={()=>navigate('/inbox')}>Ver tudo</button></div>
      <div className="table"><div className="tr th"><span>Solicitante</span><span>Categoria</span><span>Sala</span><span>Data</span><span>Status</span></div>
      {loading?<div className="empty-row">Carregando chamados...</div>:tickets.length?tickets.map(t=><button className="tr tr-button" key={t.cod_chamado} onClick={()=>navigate('/inbox')}><span><b>{t.solicitante||'Usuário'}</b></span><span>{t.categoria}</span><span>{t.setor||`Sala ${t.num_equipamento??'—'}`}</span><span>{t.data}</span><i className={'dot '+statusClass(t.status)} title={t.status}></i></button>):<div className="empty-row">Nenhum chamado encontrado.</div>}</div>
    </section>
    <section className="right-column"><Metric title="Chamados resolvidos" value={m.concluidos||0}/><Metric title="Tempo médio de resposta" value="12" suffix="m"/><div className="panel-card terms"><div className="card-head"><div><b>Turnos Ativos</b><small>Atendimentos por período</small></div></div><div className="term"><span>☀ Manhã · 7h às 12h</span><b>38</b></div><div className="term"><span>◐ Tarde · 12h às 18h</span><b>54</b></div><div className="term"><span>☾ Noite · 18h às 22h</span><b>19</b></div></div><button className="add-widget" onClick={()=>navigate('/chamado')}><strong>＋</strong><span>Adicionar Widget</span></button></section>
   </div>
  </div>
 </section></main>
}
