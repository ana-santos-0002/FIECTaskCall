import { useEffect, useMemo, useState } from 'react'
import { createChamado, deleteChamado, getEquipamentos, getPainel, updateChamadoStatus } from '../api/taskcall'

const menuItems = [
  { id: 'dashboard', icon: '⌂', label: 'Tela principal' },
  { id: 'inbox', icon: '▤', label: 'Inbox' },
  { id: 'create', icon: '＋', label: 'Criação chamado' },
  { id: 'settings', icon: '⚙', label: 'Configurações' },
]

const statusClass = (status) => `ticket-status status-${status.toLowerCase().replaceAll(' ', '-')}`

function getStoredUser() {
  try {
    const stored = localStorage.getItem('taskcall_user')
    return stored ? JSON.parse(stored) : null
  } catch {
    return null
  }
}

function Logo() {
  return (
    <div className="taskcall-logo" aria-label="FIEC Taskcall">
      <span className="logo-check">✓</span>
      <span className="logo-fiec">FIEC</span>
      <span className="logo-task">Taskcall</span>
    </div>
  )
}

function Sidebar({ activeView, onNavigate, user }) {
  const userName = user?.nome || user?.email || 'Usuário 53532'
  const userFunction = user?.funcao || 'Professor'

  return (
    <aside className="panel-sidebar redesigned-sidebar">
      <Logo />
      <div className="user-profile">
        <div className="profile-avatar">{userName.charAt(0).toUpperCase()}</div>
        <div className="profile-copy"><strong>{userName}</strong><span>{userFunction}</span></div>
        <span className="profile-chevron">⌄</span>
      </div>
      <p className="nav-caption">MENU PRINCIPAL</p>
      <nav className="side-nav" aria-label="Navegação principal">
        {menuItems.map((item) => (
          <button className={`side-link redesigned-side-link ${activeView === item.id ? 'active' : ''}`} key={item.id} type="button" onClick={() => onNavigate(item.id)}>
            <span className="side-link-icon">{item.icon}</span>
            <span>{item.label}</span>
            {item.id === 'inbox' && <span className="nav-badge">12</span>}
          </button>
        ))}
      </nav>
      <div className="sidebar-bottom">
        <button className="side-link redesigned-side-link" type="button" onClick={() => onNavigate('settings')}><span className="side-link-icon">?</span><span>Central de ajuda</span></button>
        <button className="logout redesigned-logout" type="button" onClick={() => { localStorage.removeItem('taskcall_user'); window.location.href = '/' }}><span>↪</span>Sair da conta</button>
      </div>
    </aside>
  )
}

function Dashboard({ chamados, onCreate, onOpenTicket, user }) {
  const counts = useMemo(() => ({
    abertos: chamados.filter((ticket) => ticket.status === 'Aberto').length,
    progresso: chamados.filter((ticket) => ticket.status === 'Em progresso').length,
    aguardando: chamados.filter((ticket) => ticket.status === 'Aguardando').length,
    resolvidos: chamados.filter((ticket) => ticket.status === 'Resolvido').length,
  }), [chamados])
  const userName = user?.nome || user?.email || 'Usuário 53532'

  return (
    <section className="screen-view dashboard-view">
      <header className="screen-header">
        <div><p className="screen-kicker">Tela Principal</p><h1>Olá, {userName}</h1><p className="screen-description">Acompanhe seus chamados e resolva suas solicitações.</p></div>
        <button className="primary-button" type="button" onClick={onCreate}><span>＋</span> Fazer chamado</button>
      </header>
      <div className="metric-grid">
        <article className="metric-card metric-open"><div className="metric-icon">▣</div><div><span>Chamados abertos</span><strong>{counts.abertos}</strong><small>Dados do MySQL</small></div></article>
        <article className="metric-card metric-progress"><div className="metric-icon">◷</div><div><span>Em andamento</span><strong>{counts.progresso}</strong><small>Dados do MySQL</small></div></article>
        <article className="metric-card metric-waiting"><div className="metric-icon">◌</div><div><span>Aguardando retorno</span><strong>{counts.aguardando}</strong><small>Dados do MySQL</small></div></article>
        <article className="metric-card metric-resolved"><div className="metric-icon">✓</div><div><span>Chamados resolvidos</span><strong>{counts.resolvidos}</strong><small>Dados do MySQL</small></div></article>
      </div>
      <div className="dashboard-grid">
        <section className="content-card recent-card">
          <div className="content-card-header"><div><h2>Chamados recentes</h2><p>Veja os últimos chamados salvos no banco.</p></div><button className="text-button" type="button" onClick={() => onOpenTicket(chamados[0])} disabled={!chamados.length}>Ver todos <span>→</span></button></div>
          <div className="recent-list">
            {!chamados.length && <div className="empty-state">Nenhum chamado encontrado para este usuário.</div>}
            {chamados.slice(0, 4).map((ticket) => (
              <button className="recent-row" type="button" key={ticket.id} onClick={() => onOpenTicket(ticket)}>
                <span className="recent-ticket-icon">{ticket.categoria === 'Hardware' ? '▣' : '✦'}</span>
                <span className="recent-ticket-copy"><strong>{ticket.titulo}</strong><small>{ticket.id} · {ticket.setor}</small></span>
                <span className={statusClass(ticket.status)}>{ticket.status}</span><span className="row-arrow">›</span>
              </button>
            ))}
          </div>
        </section>
        <aside className="dashboard-widgets">
          <article className="widget-card response-widget"><div className="widget-heading"><span>Chamados resolvidos</span><span className="widget-menu">•••</span></div><div className="widget-number">{counts.resolvidos}<small> no total</small></div><p>registros retornados pelo MySQL</p><div className="mini-chart"><i /><i /><i /><i /><i /><i /><i /><i /><i /></div><div className="chart-labels"><span>Início</span><span>Agora</span></div></article>
          <article className="widget-card average-widget"><div className="widget-heading"><span>Tempo médio de resposta</span><span className="widget-menu">•••</span></div><div className="widget-number">12<small>min</small></div><p>indicador de acompanhamento</p><div className="progress-track"><span /></div><small className="progress-caption">Meta mensal <b>15 min</b></small></article>
          <button className="add-widget" type="button"><span>＋</span><strong>Adicionar widget</strong><small>Personalize seu painel</small></button>
        </aside>
      </div>
    </section>
  )
}

function Inbox({ chamados, onCreate, onOpenTicket }) {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('todos')
  const filtered = useMemo(() => chamados.filter((ticket) => {
    const haystack = `${ticket.id} ${ticket.titulo} ${ticket.solicitante} ${ticket.categoria}`.toLowerCase()
    const matchesSearch = haystack.includes(search.toLowerCase().trim())
    const matchesFilter = filter === 'todos' || (filter === 'abertos' && ticket.status !== 'Resolvido') || (filter === 'resolvidos' && ticket.status === 'Resolvido')
    return matchesSearch && matchesFilter
  }), [chamados, search, filter])

  return (
    <section className="screen-view inbox-view">
      <header className="screen-header inbox-header"><div><p className="screen-kicker">Caixa de entrada</p><h1>Inbox</h1><p className="screen-description">Gerencie e acompanhe os chamados salvos no banco.</p></div><button className="primary-button" type="button" onClick={onCreate}><span>＋</span> Escrever</button></header>
      <div className="inbox-toolbar">
        <div className="inbox-tabs">
          <button className={`inbox-tab ${filter === 'todos' ? 'active' : ''}`} type="button" onClick={() => setFilter('todos')}>Todos <b>{chamados.length}</b></button>
          <button className={`inbox-tab ${filter === 'abertos' ? 'active' : ''}`} type="button" onClick={() => setFilter('abertos')}>Em andamento <b>{chamados.filter((t) => t.status !== 'Resolvido').length}</b></button>
          <button className={`inbox-tab ${filter === 'resolvidos' ? 'active' : ''}`} type="button" onClick={() => setFilter('resolvidos')}>Resolvidos <b>{chamados.filter((t) => t.status === 'Resolvido').length}</b></button>
        </div>
        <label className="search-field"><span>⌕</span><input type="search" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Buscar chamado..." /></label>
      </div>
      <section className="content-card inbox-card">
        <div className="inbox-table-head inbox-grid"><span className="checkbox-cell">□</span><span>Chamado</span><span>Solicitante</span><span>Categoria</span><span>Data</span><span>Status</span><span /></div>
        <div className="inbox-table-body">
          {!filtered.length && <div className="empty-state">Nenhum chamado encontrado.</div>}
          {filtered.map((ticket) => (
            <button className="inbox-row inbox-grid" type="button" key={ticket.id} onClick={() => onOpenTicket(ticket)}>
              <span className="checkbox-cell">□</span>
              <span className="inbox-title-cell"><span className={`priority-dot priority-${ticket.prioridade.toLowerCase()}`} /><span><strong>{ticket.titulo}</strong><small>{ticket.id}</small></span></span>
              <span className="person-cell"><span className="person-avatar">{ticket.solicitante.charAt(0)}</span>{ticket.solicitante}</span>
              <span>{ticket.categoria}</span><span className="muted-cell">{ticket.data}</span><span className={statusClass(ticket.status)}>{ticket.status}</span><span className="row-arrow">›</span>
            </button>
          ))}
        </div>
        <footer className="inbox-footer"><span>Mostrando <b>{filtered.length ? `1–${filtered.length}` : '0'}</b> de <b>{filtered.length}</b> chamados</span><div><button type="button" disabled>←</button><button className="page-current" type="button">1</button><button type="button" disabled>→</button></div></footer>
      </section>
    </section>
  )
}

function CreateTicket({ onCancel, onSubmit, equipamentos }) {
  const firstEquipment = equipamentos[0]?.num_equipamentos || ''
  const [step, setStep] = useState(1)
  const [form, setForm] = useState({ titulo: '', categoria: 'Suporte', prioridade: 'Média', setor: 'Laboratório 03', descricao: '', num_equipamento: firstEquipment })

  useEffect(() => {
    if (!form.num_equipamento && firstEquipment) setForm((current) => ({ ...current, num_equipamento: firstEquipment }))
  }, [firstEquipment, form.num_equipamento])

  function updateField(event) {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }))
  }

  function goNext(event) {
    event.preventDefault()
    if (!form.titulo.trim() || !form.descricao.trim() || !form.num_equipamento) return
    setStep(2)
  }

  function submitForm() {
    onSubmit({ ...form, num_equipamento: Number(form.num_equipamento) })
  }

  return (
    <section className="screen-view create-view">
      <header className="screen-header create-header"><div><p className="screen-kicker">Criação Chamado</p><h1>Fazer chamado</h1><p className="screen-description">Descreva sua solicitação e nossa equipe cuidará do restante.</p></div><span className="create-step">Etapa {step} de 2 <i className={step === 2 ? 'complete' : ''} /></span></header>
      {step === 1 ? (
        <form className="create-form" onSubmit={goNext}>
          <section className="content-card form-card">
            <div className="form-card-title"><span className="form-title-icon">✦</span><div><h2>Detalhes do chamado</h2><p>Preencha as informações abaixo para abrir uma nova solicitação.</p></div></div>
            <div className="form-grid">
              <label className="field field-wide">Título do chamado <span className="required">*</span><input name="titulo" value={form.titulo} onChange={updateField} placeholder="Ex.: Monitor queimado" required /></label>
              <label className="field">Categoria <span className="required">*</span><select name="categoria" value={form.categoria} onChange={updateField}><option>Suporte</option><option>Hardware</option><option>Equipamentos</option><option>Sistema</option><option>Audiovisual</option></select></label>
              <label className="field">Prioridade <span className="required">*</span><select name="prioridade" value={form.prioridade} onChange={updateField}><option>Baixa</option><option>Média</option><option>Alta</option><option>Urgente</option></select></label>
              <label className="field">Setor ou local <span className="required">*</span><select name="setor" value={form.setor} onChange={updateField}><option>Laboratório 03</option><option>Laboratório 01</option><option>Sala Magna</option><option>Secretaria</option><option>Outro local</option></select></label>
              <label className="field">Equipamento <span className="required">*</span><select name="num_equipamento" value={form.num_equipamento} onChange={updateField} required><option value="">Selecione o equipamento</option>{equipamentos.map((equipamento) => <option value={equipamento.num_equipamentos} key={equipamento.num_equipamentos}>#{equipamento.num_equipamentos} · {equipamento.equipamentos_col || `Sala ${equipamento.num_sala}`}</option>)}</select></label>
            </div>
            <label className="field description-field">Descrição do chamado <span className="required">*</span><span className="editor-toolbar"><b>B</b><i>I</i><u>U</u><s>S</s><span />≡≡≡<span />↗</span><textarea name="descricao" value={form.descricao} onChange={updateField} placeholder="Descreva o problema com o máximo de detalhes possível..." required /></label>
            <div className="attach-area"><button type="button" className="attach-button">⌕ <span>Anexar arquivos</span></button><small>Você pode anexar imagens, documentos ou outros arquivos. Máximo de 10MB.</small></div>
          </section>
          <footer className="form-actions"><button className="secondary-button" type="button" onClick={onCancel}>Cancelar</button><button className="primary-button" type="submit">Próximo <span>→</span></button></footer>
        </form>
      ) : (
        <section className="create-form review-step">
          <section className="content-card form-card review-card">
            <div className="form-card-title"><span className="form-title-icon">✓</span><div><h2>Revise seu chamado</h2><p>Confira os dados antes de enviar a solicitação.</p></div></div>
            <div className="review-grid">
              <div><span>Título</span><strong>{form.titulo}</strong></div><div><span>Categoria</span><strong>{form.categoria}</strong></div>
              <div><span>Prioridade</span><strong>{form.prioridade}</strong></div><div><span>Setor ou local</span><strong>{form.setor}</strong></div>
              <div className="review-wide"><span>Equipamento</span><strong>#{form.num_equipamento}</strong></div>
              <div className="review-wide"><span>Descrição</span><p>{form.descricao}</p></div>
            </div>
          </section>
          <footer className="form-actions"><button className="secondary-button" type="button" onClick={() => setStep(1)}>← Voltar</button><button className="primary-button" type="button" onClick={submitForm}>Abrir chamado <span>✓</span></button></footer>
        </section>
      )}
    </section>
  )
}

function TicketModal({ ticket, onClose, onUpdate, onDelete }) {
  const [busy, setBusy] = useState(false)
  if (!ticket) return null

  async function changeStatus(status) {
    try {
      setBusy(true)
      await onUpdate(status)
    } catch {
      // O erro já é exibido pelo painel através de apiError.
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={onClose}>
      <section className="ticket-modal" role="dialog" aria-modal="true" aria-labelledby="ticket-modal-title" onMouseDown={(event) => event.stopPropagation()}>
        <header className="modal-header"><div><span className="modal-ticket-id">#{ticket.id} · {ticket.categoria}</span><h2 id="ticket-modal-title">{ticket.titulo}</h2></div><button className="modal-close" type="button" onClick={onClose} aria-label="Fechar">×</button></header>
        <div className="modal-meta"><span className={statusClass(ticket.status)}>{ticket.status}</span><span className={`priority-pill priority-pill-${ticket.prioridade.toLowerCase()}`}>Prioridade {ticket.prioridade}</span><span>Aberto em {ticket.data}</span></div>
        <div className="modal-person"><span className="person-avatar large-avatar">{ticket.solicitante.charAt(0)}</span><div><strong>{ticket.solicitante}</strong><small>{ticket.setor}</small></div></div>
        <div className="modal-description"><span>Descrição</span><p>{ticket.descricao}</p></div>
        <footer className="modal-actions">
          {ticket.status !== 'Resolvido' && <button className="modal-action success-action" type="button" disabled={busy} onClick={() => changeStatus('Resolvido')}>✓ Finalizar chamado</button>}
          {ticket.status === 'Resolvido' && <button className="modal-action success-action" type="button" disabled>✓ Chamado finalizado</button>}
          <button className="modal-action danger-action" type="button" disabled={busy} onClick={onDelete}>⊗ Excluir chamado</button>
          {ticket.status !== 'Em progresso' && ticket.status !== 'Resolvido' && <button className="modal-action blue-action" type="button" disabled={busy} onClick={() => changeStatus('Em progresso')}>Marcar como Em progresso</button>}
        </footer>
      </section>
    </div>
  )
}

export default function PainelTaskcall() {
  const [activeView, setActiveView] = useState('dashboard')
  const [chamados, setChamados] = useState([])
  const [equipamentos, setEquipamentos] = useState([])
  const [selectedTicket, setSelectedTicket] = useState(null)
  const [user] = useState(getStoredUser)
  const [loading, setLoading] = useState(true)
  const [apiError, setApiError] = useState('')

  useEffect(() => {
    if (!user?.id_usuario) {
      setLoading(false)
      return
    }
    let mounted = true
    Promise.all([getPainel(user.id_usuario), getEquipamentos()])
      .then(([painel, equipmentList]) => {
        if (!mounted) return
        setChamados(painel.chamados || [])
        setEquipamentos(equipmentList || [])
      })
      .catch((error) => { if (mounted) setApiError(error.message) })
      .finally(() => { if (mounted) setLoading(false) })
    return () => { mounted = false }
  }, [user])

  function navigate(view) { setActiveView(view === 'settings' ? 'dashboard' : view) }

  async function createTicket(form) {
    try {
      setApiError('')
      const payload = await createChamado({ titulo: form.titulo, descricao: form.descricao, categoria: form.categoria, prioridade: form.prioridade, setor: form.setor, id_usuario: user?.id_usuario, num_equipamento: form.num_equipamento })
      setChamados((current) => [payload.chamado, ...current])
      setActiveView('inbox')
      setSelectedTicket(payload.chamado)
    } catch (error) { setApiError(error.message) }
  }

  async function updateSelectedTicket(status) {
    if (!selectedTicket) return
    try {
      setApiError('')
      const payload = await updateChamadoStatus(selectedTicket.cod_chamado || selectedTicket.id, status)
      setChamados((current) => current.map((ticket) => ticket.id === selectedTicket.id ? payload.chamado : ticket))
      setSelectedTicket(payload.chamado)
    } catch (error) { setApiError(error.message); throw error } 
  }

  async function deleteSelectedTicket() {
    if (!selectedTicket) return
    try {
      setApiError('')
      await deleteChamado(selectedTicket.cod_chamado || selectedTicket.id)
      setChamados((current) => current.filter((ticket) => ticket.id !== selectedTicket.id))
      setSelectedTicket(null)
    } catch (error) { setApiError(error.message) }
  }

  return (
    <main className="taskcall-panel redesigned-panel">
      <Sidebar activeView={activeView} onNavigate={navigate} user={user} />
      <section className="panel-content redesigned-content">
        <div className="topbar-mobile"><Logo /><button type="button" onClick={() => setActiveView(activeView === 'dashboard' ? 'inbox' : 'dashboard')}>☰</button></div>
        {apiError && <div className="api-error" role="alert">{apiError}</div>}
        {!user?.id_usuario && <div className="loading-state"><strong>Sessão não encontrada.</strong><span>Volte ao portal FIEC e entre novamente no Taskcall.</span></div>}
        {loading && user?.id_usuario && <div className="loading-state">Carregando dados do MySQL...</div>}
        {!loading && user?.id_usuario && activeView === 'dashboard' && <Dashboard chamados={chamados} user={user} onCreate={() => setActiveView('create')} onOpenTicket={setSelectedTicket} />}
        {!loading && user?.id_usuario && activeView === 'inbox' && <Inbox chamados={chamados} onCreate={() => setActiveView('create')} onOpenTicket={setSelectedTicket} />}
        {!loading && user?.id_usuario && activeView === 'create' && <CreateTicket equipamentos={equipamentos} onCancel={() => setActiveView('dashboard')} onSubmit={createTicket} />}
      </section>
      <TicketModal ticket={selectedTicket} onClose={() => setSelectedTicket(null)} onUpdate={updateSelectedTicket} onDelete={deleteSelectedTicket} />
    </main>
  )
}
