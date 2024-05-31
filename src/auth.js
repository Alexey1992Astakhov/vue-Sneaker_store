import axios from 'axios'

const auth = {
  async loginUser(email, password) {
    const user = { email, password }
    const res = await axios.post('https://c609c87379a55cb8.mokky.dev/auth', user, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
    const data = res.data
    localStorage.setItem('token', data.token)
  },

  async registerUser(name, email, password) {
    const user = { name, email, password }
    const res = await axios.post('https://c609c87379a55cb8.mokky.dev/register', user, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
    const data = res.data
    localStorage.setItem('token', data.token)
  },

  logoutUser() {
    localStorage.removeItem('token')
  },

  getToken() {
    return localStorage.getItem('token')
  },

  isAuthenticated() {
    return !!this.getToken()
  }
}

export default auth