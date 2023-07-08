import axios from "axios";
const URL = "http://localhost:8080/api/v1";

// POST || REGISTER USER
const config = {
  headers: {
    "Content-Type": "multipart/form-data",
  },
};
const REGISTER_USER = async (registerData) => {
  return axios
    .post(`${URL}/register-user`, registerData, config)
    .then((res) => res)
    .catch((error) => error);
};

// POST || LOGIN USER

const LOGIN_USER = async (loginData) => {
  try {
    const res = await axios.post(`${URL}/login-user`, loginData);
    return res;
  } catch (error) {
    return error;
  }
};
export { REGISTER_USER, LOGIN_USER };
