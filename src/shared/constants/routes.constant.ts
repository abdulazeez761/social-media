export const ROUTES = {
  AUTH: {
    CONTROLLER: 'auth',
    REGISTER_USER: 'register-user',
    LOG_USER_IN: 'login-user',
    LOG_OUT: 'logout',
  },

  USERS: {
    CONTROLLER: 'users',
    FIND_ALL: '',
    FIND_ONE: ':userID',
    UPDATE_ONE: 'update',
    DELETE_ONE: 'delete',
  },
  COMMENTS: {
    CONTROLLER: 'comments',
    FIND_ALL: '',
    CREATE_COMMENT: 'create',
    FIND_ONE: ':commentID',
    UPDATE_ONE: 'update/:commentID',
    DELETE_ONE: 'delete/:commentID',
  },
};
