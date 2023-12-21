import prismaClient from "../../prisma"
import { hash } from "bcryptjs"

interface UserRequest {
    name: string
    email: string
    password: string
    phone: string
}

class CreateUserService {
    async execute({ name, email, password, phone }: UserRequest) {
        if (!email || email == "") {
            throw new Error("EMAIL INCORRETO")
        }

        const userAlredyExist = await prismaClient.user.findFirst({
            where: {
                email: email
            }
        })

        if (userAlredyExist) {
            throw new Error("USER/EMAIL JA EXISTE")
        }

        const passwordHash = await hash(password, 8)

        const user = await prismaClient.user.create({
            data: {
                name: name,
                email: email,
                password: passwordHash,
                phone: phone,
            },
            select: {
                id: true,
                name: true,
                email: true,
                phone: true,
            }
        })

        return user
    }
}

export { CreateUserService }