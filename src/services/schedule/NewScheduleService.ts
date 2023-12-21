import prismaClient from "../../prisma"

interface NewScheduleRequest {
    user_id: string
    haircut_id: string
    customer: string
}

class NewScheduleService {
    async execute({ user_id, haircut_id, customer }: NewScheduleRequest) {
        if (!customer || !haircut_id) {
            throw new Error("ERROR SCHEDULE NEW SERVICE")
        }
        const schedule = await prismaClient.service.create({
            data: {
                haircut_id: haircut_id,
                user_id: user_id,
                customer: customer,
            }
        })
        return schedule
    }
}

export { NewScheduleService }