import axios from "axios";
const URL = "https://attrybbackend-production.up.railway.app/api/v1";
const FIND_COURSE = async () => {
  return axios
    .get(`${URL}/all-course`)
    .then((res) => res)
    .catch((er) => er);
};
export default FIND_COURSE;

