const API_BASE = '/api'

export async function api(path, options = {}) {
  const response = await fetch(`${API_BASE}${path}`, {
    headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
    ...options,
  })
  const payload = await response.json().catch(() => ({}))
  if (!response.ok) {
    const first = payload?.errors ? Object.values(payload.errors).flat()[0] : null
    throw new Error(first || payload.message || 'Não foi possível concluir a operação.')
  }
  return payload
}

export function getUser() {
  try { return JSON.parse(localStorage.getItem('taskcall_usuario') || 'null') } catch { return null }
}
export function setUser(user) { localStorage.setItem('taskcall_usuario', JSON.stringify(user)) }
export function clearUser() { localStorage.removeItem('taskcall_usuario') }
