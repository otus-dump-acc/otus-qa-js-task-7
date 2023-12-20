const api = require('../src/api')
const testConfig = require('../framework/config')

let user = null
let token = null

beforeAll(async () => {
    try {
        const response = await api.createUser(testConfig.username, testConfig.password)
        if (response.status === 201) {
            user = await response.json()
        }
    } catch (e) {
    }
})

describe('User', () => {
    test('authorization', async () => {
        const response = await api.auth(testConfig.username, testConfig.password)
        expect(response.status).toEqual(200)
        const body = await response.json()
        expect(body.token).not.toBeNull()
        expect(body.status).toEqual('Success')
        token = body.token
    })

    test('get user data', async () => {
        const response = await api.getUserData(user.userID, { authorization: token })
        expect(response.status).toEqual(200)
        const body = await response.json()
        expect(body.userId).toEqual(user.userID) // вот тут жесть у них с именованием переменных конечно)
        expect(body.username).toEqual(user.username)
    })

    // Он просто 204 возвращает по неизвестной причине. Запрос аналогичен getUserData только метод DELETE. Почему токен не подходит я не знаю
    test('remove user', async () => {
        const response = await api.removeUser(user.userID, { authorization: token })
        expect(response.status).toEqual(200)
        const body = await response.json()
        expect(body.code).toEqual(0)
    })

})