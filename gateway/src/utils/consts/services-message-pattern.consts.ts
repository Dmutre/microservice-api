export const UserMessagePattern = {
  REGISTER_NEW_USER: { cmd: 'register_new_user' },
  REQUEST_EMAIL_VERIFICATION: { cmd: 'request_email_verification' },
  VERIFY_USER_EMAIL: { cmd: 'verify_user_email' },
  LOGIN_USER: { cmd: 'user_login' },
  GET_CURRENT_USER: { cmd: 'get_current_user' },
  REFRESH_TOKEN: { cmd: 'refresh_token' },
  CHECK_DOES_USER_HAVE_PERMISSION: { cmd: 'check_user_permission' },
};

export const ProductMessagePattern = {
  CREATE_PRODUCT: { cmd: 'create_product' },
  UPDATE_PRODUCT: { cmd: 'update_product' },
  GET_PRODUCTS: { cmd: 'get_products' },
  DELETE_PRODUCT: { cmd: 'delete_products' },
};
