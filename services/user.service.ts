import { ErrorType } from "../helper/enum";
import AppError from "../helper/error.helper";
import UserRepository from "../repository/UserRepository";
import { UserAttributes } from "../models/user.model";
import { v4 as UUID } from 'uuid'

const userRepository = new UserRepository(UserAttributes)

export async function userListService() {
  return await userRepository.findAll()
}

export async function userDetailsService(data: { user_id: string }) {
  return await userRepository.findByPk(data.user_id);
}

export async function userDetailsUpdateService(data: any) {
    const userExists = await userRepository.findByPk(data.user_id);
    if (!userExists) {
      throw new AppError("User not found", ErrorType.not_found);
    }
    await userRepository.update({
      first_name: data.first_name,
      last_name: data.last_name
    }, {
      where: {
        user_id: data.user_id
      }
    })

    return await userRepository.findByPk(data.user_id);
}

export async function userDeleteService(data: { user_id: string }) {
  const userExists = await userRepository.findByPk(data.user_id);
  if (!userExists) {
    throw new AppError("User not found", ErrorType.not_found);
  }
  await userExists.destroy();
  return userExists;
}

export async function userCreateService(data: any) {
  return await userRepository.create({
    user_id: UUID(),
    first_name: data.first_name,
    last_name: data.last_name
  });
}