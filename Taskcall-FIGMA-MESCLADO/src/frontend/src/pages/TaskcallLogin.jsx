import { useState } from 'react'
import { loginTaskcall } from '../api/taskcall'

export default function TaskcallLogin() {
  const [usuario, setUsuario] = useState('')
  const [senha, setSenha] = useState('')
  const [erro, setErro] = useState('')
  const [carregando, setCarregando] = useState(false)

  async function entrar(event) {
    event.preventDefault()
    setErro('')

    if (!usuario.trim() || !senha.trim()) {
      setErro('Preencha usuário e senha para continuar.')
      return
    }

    try {
      setCarregando(true)
      const payload = await loginTaskcall(usuario.trim(), senha)
      localStorage.setItem('taskcall_user', JSON.stringify(payload.usuario))
      window.location.href = '/painel'
    } catch (error) {
      setErro(error.message)
    } finally {
      setCarregando(false)
    }
  }

  return (
    <main className="taskcall-login">
      <section className="login-card" aria-label="Login do FIEC Taskcall">
        <div className="brand" aria-label="FIEC Taskcall">
          <span className="brand-check">✓</span>
          <span className="brand-fiec">FIEC</span>
          <span className="brand-task">Taskcall</span>
        </div>

        <h1>Entrar</h1>
        <p className="login-subtitle">Acesse o sistema de chamados</p>

        <form onSubmit={entrar}>
          <label htmlFor="usuario">Usuário</label>
          <input
            id="usuario"
            type="text"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            placeholder="Digite seu usuário ou e-mail"
            autoComplete="username"
            disabled={carregando}
          />

          <label htmlFor="senha">Senha</label>
          <input
            id="senha"
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            placeholder="Digite sua senha"
            autoComplete="current-password"
            disabled={carregando}
          />

          {erro && <p className="login-error" role="alert">{erro}</p>}

          <button className="login-button" type="submit" disabled={carregando}>
            {carregando ? 'Validando...' : 'Entrar'}
          </button>
        </form>

        <button className="forgot-button" type="button" onClick={() => setErro('Solicitação de recuperação disponível com o administrador do sistema.')}>Esqueci minha senha</button>
        <button className="back-portal-button" type="button" onClick={() => { window.location.href = '/' }}>← Voltar ao portal FIEC</button>
      </section>
    </main>
  )
}
