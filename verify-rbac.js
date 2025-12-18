
async function testAuth() {
    const login = async (email, password) => {
        const res = await fetch('http://localhost:3000/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        })
        return res.json()
    }

    const getMe = async (token) => {
        const res = await fetch('http://localhost:3000/api/auth/me', {
            headers: { 'Authorization': `Bearer ${token}` }
        })
        const json = await res.json()
        console.log('GetMe Response:', JSON.stringify(json, null, 2))
        return json
    }

    console.log('--- Testing Admin ---')
    const adminAuth = await login('admin@sextante.app', 'password123')
    if (adminAuth.token) {
        const adminProfile = await getMe(adminAuth.token)
        console.log('Admin Role:', adminProfile.user.role)
        if (adminProfile.user.role !== 'ADMIN') console.error('FAIL: Role mismatch')
        else console.log('PASS: Admin identified')
    } else {
        console.error('FAIL: Admin login failed', adminAuth)
    }

    console.log('\n--- Testing User ---')
    const userAuth = await login('user@sextante.app', 'password123')
    if (userAuth.token) {
        const userProfile = await getMe(userAuth.token)
        console.log('User Role:', userProfile.user.role)
        if (userProfile.user.role !== 'USER') console.error('FAIL: Role mismatch')
        else console.log('PASS: User identified')
    } else {
        console.error('FAIL: User login failed', userAuth)
    }
}

testAuth()
