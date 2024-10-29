import axios from "axios";

export const getUsersApi = () => {
  return axios.get(`https://mocki.io/v1/0d9221bc-dfed-40ce-b9cb-46a2d41e5111`);
};
