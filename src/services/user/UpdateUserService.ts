import prismaClient from "../../prisma"

interface UserRequest {
    user_id: string
    name: string
    endereco: string
    phone: string
}

class UpdateUserService {
    async execute({ user_id, name, endereco, phone }: UserRequest) {
        try {
            const userAlreadyExist = await prismaClient.user.findFirst({
                where: {
                    id: user_id
                }
            })

            if (!userAlreadyExist) {
                throw new Error("USUARIO NÃO EXISTE")
            }
            const userUpdate = await prismaClient.user.update({
                where: {
                    id: user_id,
                },
                data: {
                    name,
                    endereco,
                    phone,
                },
                select: {
                    name: true,
                    email: true,
                    endereco: true,
                    phone: true,
                },
            })
            return userUpdate
        } catch (err) {
            console.log(err)
            throw new Error("ERRO AO ATUALIZAR DADOS")
        }
    }
}

export { UpdateUserService }