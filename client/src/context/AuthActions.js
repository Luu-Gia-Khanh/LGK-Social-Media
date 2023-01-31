const LoginStart = (userCredentials) => {
  return {
    type: "LOGIN_START",
  };
};
const LoginSuccess = (user) => {
  return {
    type: "LOGIN_SUCCESS",
    payload: user,
  };
};
const LoginFailure = (error) => {
  return {
    type: "LOGIN_FAILURE",
    payload: error,
  };
};
const Follow = (userId) => {
  return {
    type: "FOLLOW",
    payload: userId,
  };
};
const Unfollow = (userId) => {
  return {
    type: "UNFOLLOW",
    payload: userId,
  };
};

export { LoginStart, LoginSuccess, LoginFailure, Follow, Unfollow };
