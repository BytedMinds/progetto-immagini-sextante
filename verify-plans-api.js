import { $fetch } from 'ofetch'

const BASE_URL = 'http://localhost:3000/api'

async function testPlans() {
    console.log('--- Authenticating as Admin ---')
    let token
    try {
        const login = await $fetch(`${BASE_URL}/auth/login`, {
            method: 'POST',
            body: { email: 'admin@sextante.app', password: 'password123' }
        })
        token = login.token
        console.log('Admin Authenticated')
    } catch (e) {
        console.error('Login Failed', e)
        return
    }

    const headers = { Authorization: `Bearer ${token}` }

    console.log('--- Creating Plan ---')
    try {
        const newPlan = await $fetch(`${BASE_URL}/admin/plans`, {
            method: 'POST',
            headers,
            body: {
                name: 'Test Plan ' + Date.now(),
                price: 5000,
                interval: 'year',
                description: 'A test plan',
                features: ['Feature A', 'Feature B']
            }
        })
        console.log('Plan Created:', newPlan.plan.name)

        // List Plans
        const list = await $fetch(`${BASE_URL}/admin/plans`, { headers })
        const created = list.plans.find(p => p.id === newPlan.plan.id)
        if (!created) throw new Error('Plan not found in list')
        console.log('Plan Found:', created.id)

        // Edit Plan
        const updated = await $fetch(`${BASE_URL}/admin/plans/${created.id}`, {
            method: 'PUT',
            headers,
            body: {
                name: created.name + ' Updated',
                price: 6000
            }
        })
        console.log('Plan Updated:', updated.plan.name)

        // Delete Plan
        await $fetch(`${BASE_URL}/admin/plans/${created.id}`, {
            method: 'DELETE',
            headers
        })
        console.log('Plan Deleted')

    } catch (e) {
        console.error('API Test Failed', e)
    }
}

testPlans()
