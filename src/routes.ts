import { Router, Request, Response } from "express"

import { CreateUserController } from "./controllers/user/CreateUserController"
import { AuthUserController } from "./controllers/user/AuthUserController"
import { DetailUserController } from "./controllers/user/DetailUserController"
import { UpdateUserController } from "./controllers/user/UpdateUserController"
import { CreateHaircutController } from "./controllers/haircut/CreateHaircutController"
import { ListHaircutController } from "./controllers/haircut/ListHaircutController"
import { UpdateHaircutController } from "./controllers/haircut/UpdateHaircutControler"
import { CountHaircutController } from "./controllers/haircut/CountHaircutController"
import { CheckSubscriptionController } from "./controllers/haircut/CheckSubscriptionController"
import { DetailHaircutController } from "./controllers/haircut/DetailHaircutController"
import { NewScheduleController } from "./controllers/schedule/NewScheduleController"
import { ListScheduleController } from "./controllers/schedule/ListScheduleController"
import { FinishScheduleController } from "./controllers/schedule/FinishScheduleController"

import { isAuthenticated } from "./middlewares/isAuthenticated"

const router = Router()

// --- ROUTER USER --- //
router.post('/users', new CreateUserController().handle)
router.post('/session', new AuthUserController().handle)

router.get('/me', isAuthenticated, new DetailUserController().handle)

router.put("/users", isAuthenticated, new UpdateUserController().handle)

// --- ROUTER HAIRCUT --- //
router.post('/haircut', isAuthenticated, new CreateHaircutController().handle)

router.get('/haircuts', isAuthenticated, new ListHaircutController().handle)
router.get('/haircut/check', isAuthenticated, new CheckSubscriptionController().handle)
router.get('/haircut/count', isAuthenticated, new CountHaircutController().handle)
router.get('/haircut/detail', isAuthenticated, new DetailHaircutController().handle)

router.put('/haircut', isAuthenticated, new UpdateHaircutController().handle)

// --- ROUTER SCHEDULE --- //
router.post('/schedule', isAuthenticated, new NewScheduleController().handle)

router.get('/schedule', isAuthenticated, new ListScheduleController().handle)

router.delete('/schedule', isAuthenticated, new FinishScheduleController().handle)

export { router }