import { createContext, useReducer } from "react";
import AuthReducer from "./AuthReducer";

const INITIAL_STATE = {
  // user: {
  //   _id: "61d3191cd30c7b373136eda1",
  //   username: "Khanh",
  //   email: "lgkhhn2000@gmail.com",
  //   profilePicture: "",
  //   coverPicture: "",
  //   followers: ["61d31924d30c7b373136eda3"],
  //   followings: [],
  //   isAdmin: false,
  //   createdAt: "2022-01-03T15:41:16.780Z",
  //   __v: 0,
  // },
  user: null,
  isFetching: false,
  error: false,
};

const AuthContext = createContext(INITIAL_STATE);

const AuthContextProvider = ({ children }) => {
  const [state, dispath] = useReducer(AuthReducer, INITIAL_STATE);
  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        dispath,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthContextProvider };
