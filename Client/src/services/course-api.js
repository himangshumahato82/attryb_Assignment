import axios from "axios";
const URL = "http://localhost:8080/api/v1";
const FIND_COURSE = async () => {
  return axios
    .get(`${URL}/all-course`)
    .then((res) => res)
    .catch((er) => er);
};
export default FIND_COURSE;

