import { Schema, model, Query, Types } from 'mongoose';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { settings } from './../config/settings';
import { UserModel, UserDoc, IUser } from '../types/user.types';
import AppError from '@utils/appError';
import { STATUS_CODE } from '../types/helper.types';

const userSchema = new Schema<UserDoc, UserModel, any>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    photo: { type: String, default: 'https://i.imgur.com/7rlze8l.jpg' },
    role: {
      type: String,
      enum: ['admin', 'user', 'superadmin'],
      default: 'user',
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
    active: {
      type: Boolean,
      default: true,
      select: false,
    },
    includeInActive: {
      type: Boolean,
      default: true,
      select: false,
    },
  },
  {
    toJSON: { virtuals: true, versionKey: false },
    toObject: { virtuals: true, versionKey: false },
    timestamps: true,
  }
);

userSchema.index({ name: 1, email: 1 });
//Document middleware

userSchema.pre('save', async function (next) {
  //if the password not changed end the process
  if (!this.isModified('password')) return next();
  //crypt the password
  this.password = await bcryptjs.hash(this.password, 12);
  next();
});

userSchema.pre('save', function (next) {
  //if the password not changed or newUser made end the process
  if (!this.isModified('password') || this.isNew) return next();
  this.passwordResetToken = undefined;
  this.passwordResetExpires = undefined;
  this.passwordChangedAt = new Date(Date.now() - 1000);
  next();
});

userSchema.pre<Query<IUser, IUser>>(/^find/, function (next) {
  const query: any = {};

  // Check if the query has an "includeInactive" parameter
  if (this.getQuery().includeInActive !== undefined) {
    // If "includeInactive" parameter is present, bypass the "active" filtering
    this.find({});
  } else {
    // If "includeInactive" parameter is not present, apply the "active" filter
    query.active = { $ne: false };
    this.find(query);
  }
  next();
});

//we did this operation in the model to apply the concept of fat model && fit controller
//for matching the password with the encrypted one
userSchema.methods.correctPassword = async function (
  candidatePassword: string
) {
  //candidate password means the password with the body
  return bcryptjs.compare(candidatePassword, this.password);
};

//know if the password changed
userSchema.methods.isPasswordChanged = function (JWTTimestamp: number) {
  if (this.passwordChangedAt) {
    const changeTimestamp: number = this.passwordChangedAt.getTime() / 1000;
    return changeTimestamp > JWTTimestamp;
  }
  return false;
};
//Create reset Token
userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex');
  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');
  this.passwordResetExpires = new Date(Date.now() + 10 * 60 * 1000);
  return resetToken;
};

userSchema.statics.filter = function (path: string, user: Express.User) {
  const isAdmin = user?.role === 'admin' || user?.role === 'superadmin';
  const isPathUser = path === 'user';
  const isPathAdmin = path === 'admin';
  const filter: any = { _id: { $ne: user?.id } };
  let select = '';
  if (isAdmin) {
    filter.includeInActive = { $ne: false };
    select = '+active';
  }
  if (isPathUser) {
    filter.role = 'user';
  } else if (isPathAdmin) {
    filter.role = 'admin';
  }
  return { filter, select };
};

const User = model<UserDoc>('User', userSchema);

export default User;
