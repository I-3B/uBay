import { Model } from 'mongoose';

export interface ICategory {
  name: string;
  description: string;
}
export type CategoryDoc = ICategory & Document;

export type CategoryModel = Model<ICategory, {}, any>;
