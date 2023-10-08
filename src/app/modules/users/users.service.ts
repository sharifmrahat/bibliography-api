import httpStatus from "http-status";
import prismaClient from "../../../shared/prisma-client";
import { User } from "@prisma/client";
import ApiError from "../../error/api-error";

const insertUser = async (payload: User): Promise<User> => {
  const createdUser = await prismaClient.user.create({
    data: payload,
  });

  return createdUser;
};

const updateUser = async (
  id: string,
  payload: User
): Promise<Omit<User, "password"> | null> => {
  const userExist = await prismaClient.user.findUnique({
    where: {
      id,
    },
  });

  if (!userExist) throw new ApiError(httpStatus.NOT_FOUND, "User not exists");

  const user: Partial<User> = await prismaClient.user.update({
    where: {
      id,
    },
    data: payload,
  });
  delete user.password;
  return user as Omit<User, "password">;
};

const deleteUser = async (id: string): Promise<User | null> => {
  const userExist = await prismaClient.user.findUnique({
    where: {
      id,
    },
  });

  if (!userExist) throw new ApiError(httpStatus.NOT_FOUND, "User not exists");

  const user = await prismaClient.user.delete({
    where: {
      id,
    },
  });

  return userExist;
};

const findOneUser = async (
  id: string
): Promise<Omit<User, "password"> | null> => {
  const userExist: Partial<User> | null = await prismaClient.user.findUnique({
    where: {
      id,
    },
  });

  if (!userExist) throw new ApiError(httpStatus.NOT_FOUND, "User not exists");

  delete userExist.password;
  return userExist as Omit<User, "password">;
};

const findUsers = async (): Promise<Partial<User>[]> => {
  const users = await prismaClient.user.findMany({});
  return users?.map((i) => {
    const { password, ...user } = i;
    return user;
  });
};

export const UserService = {
  insertUser,
  updateUser,
  deleteUser,
  findOneUser,
  findUsers,
};
