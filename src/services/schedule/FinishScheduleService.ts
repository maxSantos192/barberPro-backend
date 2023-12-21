import prismaClient from "../../prisma"

interface FinishRequest {
    user_id: string
    schedule_id: string
}

class FinishScheduleService {
    async execute({ user_id, schedule_id}: FinishRequest) {
        if (!schedule_id || !user_id) {
            throw new Error("SCHEDULE ITEMS NOT FOUND")
        }
        try {
            const belongsToUser = await prismaClient.service.findFirst({
                where: {
                    id: schedule_id,
                    user_id: user_id,
                }
            })
            if (!belongsToUser) {
                throw new Error("FINISH NOT AUTHORIZED FOR THIS USER")
            }
            await prismaClient.service.delete({
                where: {
                    id: schedule_id
                }
            })
            return { message: "FINISH SUCCESSFUL" }
        } catch (err) {
            console.log(err)
            throw new Error("FINISH SCHEDULE ERROR CODE: " + err)
        }
    }
}

export { FinishScheduleService }