import Product from '@models/product.model';
import {
  getAll,
  getOne,
  updateOne,
  deleteOne,
  createOne,
} from '@controllers/handlerFactory';
import { NextFunction, Request, Response } from 'express';
import { checkIsOwner } from '@middlewares/auth.middleware';
import catchAsync from '@utils/catchAsync';
import AppError from '@utils/appError';
import { STATUS_CODE } from '../types/helper.types';

export const like = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    await Product.findByIdAndUpdate(req.params.id, {
      $addToSet: { likedBy: req.user?._id },
    });
    res.sendStatus(STATUS_CODE.SUCCESS);
  }
);

export const dislike = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { $pull: { likedBy: req.user?._id } },
      { new: true, runValidators: true }
    );
    if (!product) {
      return next(
        new AppError(STATUS_CODE.NOT_FOUND, [], `No Product found with that ID`)
      );
    }

    res.sendStatus(STATUS_CODE.SUCCESS);
  }
);
export const myProduct = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const products = await Product.find({
      $or: [{ user: req.user }, { customer: req.user }]
    });
    if (!products) {
      return next(
        new AppError(STATUS_CODE.NOT_FOUND, [], `you don't have any products`)
      );
    }

    res.status(STATUS_CODE.SUCCESS).json(products);
  }
);
export const checkIsOwnerProduct = checkIsOwner(Product);
export const getAllProducts = getAll(Product);
export const getProduct = getOne(Product);
export const createProduct = createOne(Product);
export const updateProduct = updateOne(Product);
export const deleteProduct = deleteOne(Product);
