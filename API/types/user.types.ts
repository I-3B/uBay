import mongoose, { Model, Document, ObjectId, PopulatedDoc } from 'mongoose';
export interface IUser {
  name: string;
  photo: string;
  email: string;
  role: string;
  password: string;
}
export interface UserDoc extends IUser, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
  passwordChangedAt: Date | undefined;
  passwordResetToken: string | undefined;
  passwordResetExpires: Date | undefined;
  active: boolean;
  includeInActive: boolean;
  correctPassword(password: string): boolean;
  isPasswordChanged(JWTTimestamp: number | undefined): boolean;
  createPasswordResetToken(): string;
  signToken(id: any): string;
}

export interface UserModel extends Model<UserDoc, object, any> {
  filter(path: string, user: Express.User): any;
}
