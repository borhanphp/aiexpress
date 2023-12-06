import { Model } from 'mongoose';

type TFullName = {
  firstName: string;
  lastName: string;
};
type TAddress = {
  street: string;
  city: string;
  country: string;
};
type TOrder = {
  productName: string;
  quantity: number;
  price: number;
};

type TUser = {
  userId: number;
  username: string;
  password: string;
  fullName: TFullName;
  age: number;
  email: string;
  isActive: boolean;
  hobbies: string[];
  address: TAddress;
  orders?: TOrder[];
};
export type TUpdateUser = {
  userId?: number;
  username?: string;
  password?: string;
  fullName?: TFullName;
  age?: number;
  email?: string;
  isActive?: boolean;
  hobbies?: string[];
  address?: TAddress;
};

export interface UserModel extends Model<TUser> {
  isUserExits(id: number): Promise<TUser | null>;
}

export default TUser;
