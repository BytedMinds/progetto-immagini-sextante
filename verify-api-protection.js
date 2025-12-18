
async function testApiProtection() {
    const login = async (email, password) => {
        const res = await fetch('http://localhost:3000/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        })
        return res.json()
    }

    const checkEndpoint = async (url, method, token) => {
        const headers = { 'Content-Type': 'application/json' }
        if (token) headers['Authorization'] = `Bearer ${token}`

        // For specific endpoints, dummy bodies might be needed to pass validation *after* auth check
        // But we just want to see if we get past the Auth check (so we expect 400 Bad Request, NOT 401/403)
        // Or if we get 401/403.
        const res = await fetch(url, { method, headers })
        return res.status
    }

    console.log('--- Getting Tokens ---')
    const adminAuth = await login('admin@sextante.app', 'password123')
    const userAuth = await login('user@sextante.app', 'password123')
    const userToken = userAuth.token
    const adminToken = adminAuth.token

    console.log('--- Testing /api/admin/stats ---')
    console.log('No Token:', await checkEndpoint('http://localhost:3000/api/admin/stats', 'GET', null)) // Expect 401
    console.log('User Token:', await checkEndpoint('http://localhost:3000/api/admin/stats', 'GET', userToken)) // Expect 403
    console.log('Admin Token:', await checkEndpoint('http://localhost:3000/api/admin/stats', 'GET', adminToken)) // Expect 200

    console.log('\n--- Testing /api/process ---')
    console.log('No Token:', await checkEndpoint('http://localhost:3000/api/process', 'POST', null)) // Expect 401
    console.log('User Token:', await checkEndpoint('http://localhost:3000/api/process', 'POST', userToken)) // Expect 400 (Body validation failure) or 200
    // Note: 400 means Auth passed and script hit body validation. 401 means Auth failed.

}

testApiProtection()
