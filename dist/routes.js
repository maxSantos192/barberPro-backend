"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const CreateUserController_1 = require("./controllers/user/CreateUserController");
const AuthUserController_1 = require("./controllers/user/AuthUserController");
const DetailUserController_1 = require("./controllers/user/DetailUserController");
const UpdateUserController_1 = require("./controllers/user/UpdateUserController");
const CreateHaircutController_1 = require("./controllers/haircut/CreateHaircutController");
const ListHaircutController_1 = require("./controllers/haircut/ListHaircutController");
const UpdateHaircutControler_1 = require("./controllers/haircut/UpdateHaircutControler");
const CountHaircutController_1 = require("./controllers/haircut/CountHaircutController");
const CheckSubscriptionController_1 = require("./controllers/haircut/CheckSubscriptionController");
const DetailHaircutController_1 = require("./controllers/haircut/DetailHaircutController");
const NewScheduleController_1 = require("./controllers/schedule/NewScheduleController");
const ListScheduleController_1 = require("./controllers/schedule/ListScheduleController");
const FinishScheduleController_1 = require("./controllers/schedule/FinishScheduleController");
const isAuthenticated_1 = require("./middlewares/isAuthenticated");
const router = (0, express_1.Router)();
exports.router = router;
// --- ROUTER USER --- //
router.post('/users', new CreateUserController_1.CreateUserController().handle);
router.post('/session', new AuthUserController_1.AuthUserController().handle);
router.get('/me', isAuthenticated_1.isAuthenticated, new DetailUserController_1.DetailUserController().handle);
router.put("/users", isAuthenticated_1.isAuthenticated, new UpdateUserController_1.UpdateUserController().handle);
// --- ROUTER HAIRCUT --- //
router.post('/haircut', isAuthenticated_1.isAuthenticated, new CreateHaircutController_1.CreateHaircutController().handle);
router.get('/haircuts', isAuthenticated_1.isAuthenticated, new ListHaircutController_1.ListHaircutController().handle);
router.get('/haircut/check', isAuthenticated_1.isAuthenticated, new CheckSubscriptionController_1.CheckSubscriptionController().handle);
router.get('/haircut/count', isAuthenticated_1.isAuthenticated, new CountHaircutController_1.CountHaircutController().handle);
router.get('/haircut/detail', isAuthenticated_1.isAuthenticated, new DetailHaircutController_1.DetailHaircutController().handle);
router.put('/haircut', isAuthenticated_1.isAuthenticated, new UpdateHaircutControler_1.UpdateHaircutController().handle);
// --- ROUTER SCHEDULE --- //
router.post('/schedule', isAuthenticated_1.isAuthenticated, new NewScheduleController_1.NewScheduleController().handle);
router.get('/schedule', isAuthenticated_1.isAuthenticated, new ListScheduleController_1.ListScheduleController().handle);
router.delete('/schedule', isAuthenticated_1.isAuthenticated, new FinishScheduleController_1.FinishScheduleController().handle);
