import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import { config } from '../../config';
import TUser, { UserModel } from './user.interface';
const { Schema } = mongoose;

const userSchema = new Schema<TUser, UserModel>({
  userId: {
    type: Number,
    unique: true,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    min: 6,
  },
  fullName: {
    firstName: { type: String, required: true, max: 10 },
    lastName: { type: String, required: true, max: 10 },
  },
  age: { type: Number, required: true },
  address: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  hobbies: {
    type: [String],
    required: true,
  },
  orders: {
    type: [
      {
        product: { type: String, required: true },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
      },
    ],
    default: undefined,
  },
});

//instance methods
userSchema.static('isUserExits', async function (userId: number) {
  const user = await User.findOne({ userId });
  return user;
});

//middlewares
userSchema.pre('save', async function (next) {
  try {
    const salt = await bcrypt.genSalt(Number(config.salt));
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    next();
  } catch (error: any) {
    next(error);
  }
});

const User = mongoose.model<TUser, UserModel>('User', userSchema);
export default User;
