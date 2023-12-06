import { Request, Response } from 'express';
import { userServices } from './user.service';
import UserSchemaValidation, {
  UpdateUserSchemaValidation,
} from './user.validate';

const createUser = async (req: Request, res: Response) => {
  try {
    const zodParsedUserData = UserSchemaValidation.parse(req.body);
    const result = await userServices.createUser(zodParsedUserData);
    res.status(200).json({
      success: true,
      message: 'User created successfully!',
      data: result,
    });
  } catch (err: any) {
    if (err.statusCode === 404) {
      res.status(404).json({
        success: false,
        message: err.message || 'User already exists!',
        error: {
          code: err.statusCode,
          description: err.description,
        },
      });
    } else {
      res.status(500).json({
        success: false,
        message: err.message || 'Something went wrong',
        error: {
          code: err.code || 500,
          description: err.description || 'Something went wrong',
        },
      });
    }
  }
};
const getAllUsers = async (req: Request, res: Response) => {
  try {
    const allUsers = await userServices.getAllUsersFromDb();
    res.status(200).json({
      success: true,
      message: 'Users fetched successfully!',
      data: allUsers,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
      error: {
        code: error.statusCode,
        description: error,
      },
    });
  }
};

const getUserById = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const user = await userServices.getUserByIdFromDb(Number(userId));
    res.status(200).json({
      success: true,
      message: 'User fetched successfully!',
      data: user,
    });
  } catch (error: any) {
    if (error.statusCode === 404) {
      res.status(404).json({
        success: false,
        message: 'User not found',
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'Something went wrong',
      });
    }
  }
};

const updateUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const zodParsedUserData = UpdateUserSchemaValidation.parse(req.body);
    const result = await userServices.updateUserInDb(
      Number(userId),
      zodParsedUserData,
    );
    res.status(200).json({
      success: true,
      message: 'User updated successfully!',
      data: result,
    });
  } catch (error: any) {
    if (error.statusCode === 404) {
      res.status(404).json({
        success: false,
        message: error.message,
        error: {
          code: 404,
          description: error,
        },
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'Something went wrong',
      });
    }
  }
};
export const deleteUser = async (req: Request, res: Response) => {
  const { userId } = req.params;
  try {
    const result = await userServices.deleteUserfromDb(Number(userId));
    if (result.deletedCount === 1) {
      res.status(200).json({
        success: true,
        message: 'User deleted successfully!',
        data: null,
      });
    }
  } catch (error: any) {
    if (error.statusCode === 404) {
      res.status(404).json({
        success: false,
        message: error.message,
        error: {
          code: 404,
          description: error,
        },
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'Something went wrong',
      });
    }
  }
};

export const UserController = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};
