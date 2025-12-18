import jwt from 'jsonwebtoken'

const config = useRuntimeConfig()
const JWT_SECRET = config.jwtSecret || process.env.NUXT_JWT_SECRET || 'fallback-secret-for-dev-only'

export const generateToken = (payload: object, expiresIn: string | number = '7d'): string => {
    return jwt.sign(payload, JWT_SECRET, { expiresIn } as jwt.SignOptions)
}

export const verifyToken = (token: string): any => {
    try {
        return jwt.verify(token, JWT_SECRET)
    } catch (error) {
        return null
    }
}
