import bcrypt from 'bcrypt';
import { config } from '../../config';
import ErrorHandler from '../middleware/error';
import TUser, { TUpdateUser } from './user.interface';
import User from './user.model';

const createUser = async (user: TUser) => {
  const newUser = new User(user);
  const isUserExits = await User.isUserExits(user.userId);
  if (isUserExits) {
    throw new ErrorHandler('User already exists', 404);
  }
  const result = await newUser.save();
  const { password, orders, ...rest } = result.toObject();
  return rest;
};
const getAllUsersFromDb = async () => {
  try {
    const allUsers = await User.find({}, { password: 0, orders: 0 });
    return allUsers;
  } catch (error) {
    return error;
  }
};

const getUserByIdFromDb = async (id: number) => {
  const user = await User.findOne({ userId: id }, { password: 0, orders: 0 });
  if (!user) {
    throw new ErrorHandler(`No user found`, 404);
  }
  return user;
};

const updateUserInDb = async (id: number, updatedInfo: TUpdateUser) => {
  const isUserExits = await User.isUserExits(Number(id));
  if (!isUserExits) {
    throw new ErrorHandler('User not found', 404);
  } else {
    if (updatedInfo.password) {
      updatedInfo.password = await bcrypt.hash(
        updatedInfo.password,
        Number(config.salt),
      );
    }
    const updatedDoc = await User.findOneAndUpdate(
      { userId: id },
      updatedInfo,
      {
        new: true,
        runValidators: true,
        select: '-password',
      },
    );
    return updatedDoc;
  }
};

const deleteUserfromDb = async (id: number) => {
  const isUserExits = await User.isUserExits(Number(id));
  if (!isUserExits) {
    throw new ErrorHandler('User not found', 404);
  }
  const result = User.deleteOne({ userId: id });
  return result;
};

export const userServices = {
  createUser,
  getAllUsersFromDb,
  getUserByIdFromDb,
  updateUserInDb,
  deleteUserfromDb,
};
