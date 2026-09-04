import { useState } from 'react'
import { api, setUser } from '../api'

export default function TaskcallLogin({ navigate }) {
  const [usuario,setUsuario]=useState('')
  const [senha,setSenha]=useState('')
  const [erro,setErro]=useState('')
  const [loading,setLoading]=useState(false)
  async function entrar(e){
    e.preventDefault(); setErro('')
    if(!usuario.trim()||!senha.trim()){setErro('Preencha usuário e senha para continuar.');return}
    setLoading(true)
    try { const r=await api('/login',{method:'POST',body:JSON.stringify({usuario,senha})}); setUser(r.usuario); navigate('/painel') }
    catch(err){setErro(err.message)} finally{setLoading(false)}
  }
  return <main className="login-screen">
    <button className="portal-back" onClick={()=>navigate('/')} aria-label="Voltar">← Voltar ao portal FIEC</button>
    <section className="login-box">
      <div className="taskcall-logo"><b>✓ FIEC</b><span>Taskcall</span></div>
      <h1>Entrar</h1><p className="login-subtitle">Acesse o sistema de chamados</p>
      <form onSubmit={entrar}>
        <label>Usuário</label><input value={usuario} onChange={e=>setUsuario(e.target.value)} placeholder="Digite seu usuário ou e-mail" autoFocus/>
        <label>Senha</label><input type="password" value={senha} onChange={e=>setSenha(e.target.value)} placeholder="Digite sua senha"/>
        {erro&&<div className="login-error">{erro}</div>}
        <button disabled={loading} className="red-btn login-submit">{loading?'Entrando...':'Entrar'}</button>
      </form>
      <button className="forgot" onClick={()=>setErro('Procure o administrador do sistema para recuperar sua senha.')}>Esqueci minha senha</button>
    </section>
  </main>
}
