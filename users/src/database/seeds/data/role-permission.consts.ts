import { permissionsList } from './permissions.consts';
import { rolesList } from './roles.consts';

export const rolePermissions = {
  [rolesList.ADMIN]: [
    permissionsList.product.GET_PRODUCTS,
    permissionsList.product.CREATE_PRODUCTS,
    permissionsList.product.UPDATE_PRODUCTS,
    permissionsList.product.DELETE_PRODUCTS,
    permissionsList.product.VIEW_ORDERS,
    permissionsList.product.EDIT_ORDERS,
    permissionsList.product.DELETE_ORDERS,
  ],
  [rolesList.USER]: [
    permissionsList.product.GET_PRODUCTS,
    permissionsList.product.VIEW_ORDERS,
  ],
};
