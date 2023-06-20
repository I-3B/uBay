import { mergeQueryKeys } from "@lukemorales/query-key-factory";
import { categoryKeys } from "features/category";
import { userKeys } from "features/user";
export const queryStore = mergeQueryKeys(categoryKeys, userKeys);
