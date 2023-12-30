"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUserService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
const bcryptjs_1 = require("bcryptjs");
class CreateUserService {
    execute({ name, email, password, phone }) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!email || email == "") {
                throw new Error("EMAIL INCORRETO");
            }
            const userAlredyExist = yield prisma_1.default.user.findFirst({
                where: {
                    email: email
                }
            });
            if (userAlredyExist) {
                throw new Error("USER/EMAIL JA EXISTE");
            }
            const passwordHash = yield (0, bcryptjs_1.hash)(password, 8);
            const user = yield prisma_1.default.user.create({
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
            });
            return user;
        });
    }
}
exports.CreateUserService = CreateUserService;
