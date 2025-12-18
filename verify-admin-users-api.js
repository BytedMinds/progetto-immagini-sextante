import { $fetch } from 'ofetch'

const BASE_URL = 'http://localhost:3000/api'
// Admin Token needs to be obtaining or we must simulate the context if running via script. 
// BUT we can use the library logic if we run this as a generic test against localhost, 
// using the LOGIN endpoint first to get an ADMIN token.

async function testAdminUsers() {
    console.log('--- Authenticating as Admin ---')
    let token
    try {
        const login = await $fetch(`${BASE_URL}/auth/login`, {
            method: 'POST',
            body: { email: 'admin@sextante.app', password: 'password123' }
        })
        console.log('Login Response:', JSON.stringify(login, null, 2))
        token = login.token
        console.log('Admin Authenticated')
    } catch (e) {
        console.error('Login Failed', e)
        return
    }

    const headers = { Authorization: `Bearer ${token}` }
    const testEmail = `testuser_${Date.now()}@test.com`

    console.log('--- Creating User ---')
    try {
        const newUser = await $fetch(`${BASE_URL}/admin/users`, {
            method: 'POST',
            headers,
            body: {
                email: testEmail,
                password: 'password123',
                fullName: 'Test User 1',
                credits: 50,
                role: 'USER'
            }
        })
        console.log('User Created:', newUser.user.email)

        // Verify in List
        const list = await $fetch(`${BASE_URL}/admin/users`, { headers })
        const created = list.users.find(u => u.email === testEmail)
        if (!created) {
            throw new Error('Created user not found in list')
        }
        console.log('User found in list:', created.id)

        // Edit User
        console.log('--- Updating User ---')
        const updated = await $fetch(`${BASE_URL}/admin/users/${created.id}`, {
            method: 'PUT',
            headers,
            body: {
                fullName: 'Test User Updated',
                credits: 100
            }
        })
        if (updated.user.fullName !== 'Test User Updated' || updated.user.credits !== 100) {
            throw new Error('Update returned incorrect data')
        }
        console.log('User Update Success:', updated.user.fullName)

    } catch (e) {
        console.error('API Test Failed', e)
    }
}

testAdminUsers()
