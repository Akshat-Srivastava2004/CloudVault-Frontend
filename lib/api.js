// lib/api.js
// Central place for all API calls. Change NEXT_PUBLIC_API_URL in .env.local to point to your backend.

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"

// ─── Helpers ──────────────────────────────────────────────────────────────

function getToken() {
  if (typeof window === "undefined") return null
  return localStorage.getItem("cloudvault_token")
}

function setToken(token) {
  localStorage.setItem("cloudvault_token", token)
}

function removeToken() {
  localStorage.removeItem("cloudvault_token")
  localStorage.removeItem("cloudvault_user")
}

function setUser(user) {
  localStorage.setItem("cloudvault_user", JSON.stringify(user))
}

function getUser() {
  if (typeof window === "undefined") return null
  try {
    return JSON.parse(localStorage.getItem("cloudvault_user"))
  } catch {
    return null
  }
}

async function request(endpoint, options = {}) {
  const token = getToken()

  const res = await fetch(`${API_BASE}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
    ...options,
  })

  const data = await res.json()

  if (!res.ok) {
    // Throw with the server's message so UI can display it directly
    throw new Error(data.message || "Something went wrong.")
  }

  return data
}

// ─── Auth API ─────────────────────────────────────────────────────────────

export const authApi = {
  async register({ name, email, password, confirmPassword }) {
    const data = await request("/auth/register", {
      method: "POST",
      body: JSON.stringify({ name, email, password, confirmPassword }),
    })
    setToken(data.token)
    setUser(data.user)
    return data
  },

  async login({ email, password }) {
    const data = await request("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    })
    setToken(data.token)
    setUser(data.user)
    return data
  },

  async getMe() {
    return request("/auth/me")
  },

  logout() {
    removeToken()
  },

  getToken,
  getUser,
  isLoggedIn() {
    return !!getToken()
  },
}
