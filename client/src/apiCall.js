import axios from "axios";
import { LoginStart, LoginSuccess } from "./context/AuthActions";

const loginCall = async (userCredentials, dispath) => {
  dispath(LoginStart(userCredentials));
  try {
    const res = await axios.post("/auth/login", userCredentials);
    dispath(LoginSuccess(res.data));
  } catch (error) {
    dispath({ type: "LOGIN_FAILURE", payload: error });
  }
};

export { loginCall };
