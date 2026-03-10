// Auto-injected API client SDK for dev agent projects
// Placeholders %%API_BASE%% and %%PROJECT_ID%% are replaced by the execution engine

export const DEV_API_CLIENT = `let _token = localStorage.getItem('plury_project_token')
let _user = null
const _authListeners = []

const API_BASE = '%%API_BASE%%'
const PROJECT_ID = '%%PROJECT_ID%%'

async function _fetch(path, options = {}) {
  const headers = { 'Content-Type': 'application/json', ...options.headers }
  if (_token) headers['Authorization'] = 'Bearer ' + _token
  if (options.body instanceof FormData) delete headers['Content-Type']
  try {
    const res = await fetch(API_BASE + '/api/project/' + PROJECT_ID + path, { ...options, headers })
    const data = await res.json()
    if (!res.ok) return { data: null, error: data.error || 'Error desconocido' }
    return { data, error: null }
  } catch (err) {
    return { data: null, error: 'Error de conexion' }
  }
}

const api = {
  // ─── AUTH ───
  async register(email, password, displayName) {
    const result = await _fetch('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ email, password, displayName }),
    })
    if (result.data && result.data.token) {
      _token = result.data.token
      _user = result.data.user
      localStorage.setItem('plury_project_token', _token)
      _authListeners.forEach(function(cb) { cb(_user) })
    }
    return result
  },

  async login(email, password) {
    const result = await _fetch('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    })
    if (result.data && result.data.token) {
      _token = result.data.token
      _user = result.data.user
      localStorage.setItem('plury_project_token', _token)
      _authListeners.forEach(function(cb) { cb(_user) })
    }
    return result
  },

  logout() {
    _token = null
    _user = null
    localStorage.removeItem('plury_project_token')
    _authListeners.forEach(function(cb) { cb(null) })
  },

  async getUser() {
    if (!_token) return { data: null, error: 'No autenticado' }
    const result = await _fetch('/auth/me')
    if (result.data) _user = result.data
    return result
  },

  onAuthChange(callback) {
    _authListeners.push(callback)
    return function() {
      const i = _authListeners.indexOf(callback)
      if (i >= 0) _authListeners.splice(i, 1)
    }
  },

  // ─── ADMIN ───
  async listUsers() {
    return _fetch('/auth/users')
  },

  async setUserRole(userId, role) {
    return _fetch('/auth/users/' + userId + '/role', {
      method: 'PUT',
      body: JSON.stringify({ role }),
    })
  },

  // ─── CRUD ───
  from(table) {
    return {
      async select(filters, options) {
        var opts = options || {}
        var params = new URLSearchParams()
        if (filters) Object.entries(filters).forEach(function(e) { params.set(e[0], String(e[1])) })
        if (opts.mine) params.set('_mine', 'true')
        if (opts.sort) params.set('_sort', opts.sort)
        if (opts.order) params.set('_order', opts.order)
        if (opts.limit) params.set('_limit', String(opts.limit))
        if (opts.offset) params.set('_offset', String(opts.offset))
        if (opts.expand) params.set('_expand', opts.expand)
        var qs = params.toString() ? '?' + params.toString() : ''
        return _fetch('/data/' + table + qs)
      },
      async selectById(id) {
        return _fetch('/data/' + table + '/' + id)
      },
      async insert(data) {
        return _fetch('/data/' + table, {
          method: 'POST',
          body: JSON.stringify(data),
        })
      },
      async update(id, data) {
        return _fetch('/data/' + table + '/' + id, {
          method: 'PUT',
          body: JSON.stringify(data),
        })
      },
      async delete(id) {
        return _fetch('/data/' + table + '/' + id, {
          method: 'DELETE',
        })
      },
      async count(filters) {
        var params = new URLSearchParams()
        if (filters) Object.entries(filters).forEach(function(e) { params.set(e[0], String(e[1])) })
        var qs = params.toString() ? '?' + params.toString() : ''
        return _fetch('/data/' + table + '/count' + qs)
      },
      async aggregate(field, op, filters) {
        var params = new URLSearchParams({ _field: field, _op: op })
        if (filters) Object.entries(filters).forEach(function(e) { params.set(e[0], String(e[1])) })
        return _fetch('/data/' + table + '/aggregate?' + params.toString())
      },
    }
  },

  // ─── FILE UPLOAD ───
  async uploadFile(file) {
    var formData = new FormData()
    formData.append('file', file)
    var headers = {}
    if (_token) headers['Authorization'] = 'Bearer ' + _token
    try {
      var res = await fetch(API_BASE + '/api/project/' + PROJECT_ID + '/upload', {
        method: 'POST',
        headers: headers,
        body: formData,
      })
      var data = await res.json()
      if (!res.ok) return { data: null, error: data.error || 'Error al subir archivo' }
      return { data, error: null }
    } catch (err) {
      return { data: null, error: 'Error de conexion' }
    }
  },
}

export default api
`
