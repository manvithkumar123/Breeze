

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export interface User {
  id?: number;
  username: string;
  email: string;
  password: string;
}

export const createUser = async (user: User) => {
  return await prisma.user.create({
    data: {
      username: user.username,
      email: user.email,
      password: user.password,
    },
  });
};

export const findUserByEmail = async (email: string) => {
  return await prisma.user.findUnique({
    where: { email },
  });
};
export const findUser_nopass = async (email: string) => {
  return await prisma.user.findUnique({
    where: { email },
    select:{
        email :true,
        username:true,
        id:true,
    }
  });
};

export const findAllUsers = async () => {
  return await prisma.user.findMany();
};