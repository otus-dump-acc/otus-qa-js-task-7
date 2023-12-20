require('dotenv').config()

const BASE_URL = process.env.BASE_URL
const ACCOUNT_API_URL = process.env.ACCOUNT_API_URL

const defaultHeader = new Headers({
    'Content-Type': 'application/json'
})

async function auth(userName, password) {
    const headers = defaultHeader
    headers.set('Accept', 'application/json')
    return await fetch(`${BASE_URL}${ACCOUNT_API_URL}GenerateToken`, {
        headers,
        method: 'POST',
        body: JSON.stringify({ userName, password }),
    })
}

async function createUser(userName, password) {
    const headers = defaultHeader
    headers.set('Accept', 'application/json')
    return await fetch(BASE_URL + ACCOUNT_API_URL + 'User', {
        headers,
        method: 'POST',
        body: JSON.stringify({ userName, password }),
    })
}

async function getUserData(userId, { authorization }) {
    const headers = defaultHeader
    headers.set('Accept', 'application/json')
    headers.set('Authorization', `Bearer ${authorization}`)
    return await fetch(`${BASE_URL}${ACCOUNT_API_URL}User/${userId}`, {
        headers
    })
}

async function removeUser(userId, { authorization }) {
    const headers = defaultHeader
    headers.set('Accept', 'application/json')
    headers.set('Authorization', `Bearer ${authorization}`)
    return await fetch(`${BASE_URL}${ACCOUNT_API_URL}User/${userId}`, {
        headers,
        method: 'DELETE',
    })
}

module.exports = {
    auth,
    createUser,
    getUserData,
    removeUser,
}