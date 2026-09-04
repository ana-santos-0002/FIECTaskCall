async function request(path, options = {}) {
  const response = await fetch(`/api${path}`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
    ...options,
  })

  const payload = await response.json().catch(() => ({}))

  if (!response.ok) {
    const validationMessage = payload.errors
      ? Object.values(payload.errors).flat().join(' ')
      : ''
    throw new Error(validationMessage || payload.message || 'Não foi possível concluir a operação.')
  }

  return payload
}

export function loginTaskcall(usuario, senha) {
  return request('/login', {
    method: 'POST',
    body: JSON.stringify({ usuario, senha }),
  })
}

export function getPainel(idUsuario) {
  const query = idUsuario ? `?id_usuario=${encodeURIComponent(idUsuario)}` : ''
  return request(`/painel${query}`)
}

export function getEquipamentos() {
  return request('/equipamentos')
}

export function createChamado(data) {
  return request('/chamados', {
    method: 'POST',
    body: JSON.stringify(data),
  })
}

export function updateChamadoStatus(id, status) {
  return request(`/chamados/${id}/status`, {
    method: 'PATCH',
    body: JSON.stringify({ status }),
  })
}

export function deleteChamado(id) {
  return request(`/chamados/${id}`, { method: 'DELETE' })
}
