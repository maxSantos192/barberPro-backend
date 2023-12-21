import prismaClient from "../../prisma"

interface HaircutRequest {
    user_id: string
    name: string
    price: number
}

// Verificar quantos modelos de corte o usuário já tem cadastrado
// limitar a quantidade de cadastro de cortes caso ele não seja premium

class CreateHaircutService{
    async execute({ user_id, name, price }: HaircutRequest) {
        if (!name || !price) {
            throw new Error("INVALID NAME OR PRICE")
        }

        // verifica quantidade de cortes cadastrados
        const myHaircuts = await prismaClient.haircut.count({
            where: {
                user_id: user_id,
            },
        })

        const user = await prismaClient.user.findFirst({
            where: {
                id: user_id,
            },
            include: {
                subscriptions: true,
            },
        })

        // validação para criar número limite de cadastro de "haircut"
        if (myHaircuts >= 3 && user?.subscriptions?.status !== 'active') {
            throw new Error("NOT AUTHORIZED SUBSCRIPTION")
        }

        const haircut = await prismaClient.haircut.create({
            data: {
                name: name,
                price: price,
                user_id: user_id,
            },
        })

        return haircut
    }
}

export { CreateHaircutService }