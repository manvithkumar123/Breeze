"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findAllUsers = exports.findUser_nopass = exports.findUserByEmail = exports.createUser = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const createUser = async (user) => {
    return await prisma.user.create({
        data: {
            username: user.username,
            email: user.email,
            password: user.password,
        },
    });
};
exports.createUser = createUser;
const findUserByEmail = async (email) => {
    return await prisma.user.findUnique({
        where: { email },
    });
};
exports.findUserByEmail = findUserByEmail;
const findUser_nopass = async (email) => {
    return await prisma.user.findUnique({
        where: { email },
        select: {
            email: true,
            username: true,
            id: true,
        }
    });
};
exports.findUser_nopass = findUser_nopass;
const findAllUsers = async () => {
    return await prisma.user.findMany();
};
exports.findAllUsers = findAllUsers;
