import { compare } from "bcryptjs"
import { sign } from "jsonwebtoken"

import prismaClient from "../../prisma"

interface AuthUserRequest {
    email: string
    password: string
}

class AuthUserService {
    async execute({ email, password }: AuthUserRequest) {

        const user = await prismaClient.user.findFirst({
            where: {
                email: email,
            },
            include: {
                subscriptions: true
            }
        })

        if (!user) {
            throw new Error("EMAIL/PASSWORD INCORRETA")
        }

        const passwordMatch = await compare(password, user?.password)

        if (!passwordMatch) {
            throw new Error("EMAIL/PASSWORD INCORRETO")
        }

        const token = sign(
            {
                name: user.name,
                email: user.email
            },
            process.env.JWT_SECRET,
            {
                subject: user.id,
                expiresIn: '30d',
            }
        )

        return {
            id: user?.id,
            name: user?.name,
            email: user?.email,
            endereco: user?.endereco,
            phone: user?.phone,
            token: token,
            subscriptions: user.subscriptions ? {
                id: user?.subscriptions?.id,
                status: user?.subscriptions?.status,
            } : null
        }
    }
}

export { AuthUserService }