import { prisma } from '../../../utils/prisma'
import { requireAdmin } from '../../../utils/protect'
// import { hashPassword } from '../../../utils/password' // Optional: if we allow password reset via edit

export default defineEventHandler(async (event) => {
    requireAdmin(event)
    const id = getRouterParam(event, 'id')
    const body = await readBody(event)

    // Extract only allowed fields to update
    const { fullName, role, credits, email, password } = body

    const updateData: any = {}
    if (fullName !== undefined) updateData.fullName = fullName
    if (role !== undefined) updateData.role = role
    if (credits !== undefined) updateData.credits = parseInt(credits)
    if (email !== undefined) updateData.email = email

    // Optional: Allow password reset if admin provides it
    // if (password) {
    //   updateData.passwordHash = await hashPassword(password)
    // }

    try {
        const user = await prisma.user.update({
            where: { id },
            data: updateData
        })

        return { success: true, user }
    } catch (error) {
        throw createError({
            statusCode: 500,
            statusMessage: 'Failed to update user'
        })
    }
})
