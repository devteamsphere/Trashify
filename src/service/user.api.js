import axios from 'axios';
export const url = 'http://localhost:8000';

export const signIn = async (data) => {
  try {
    console.log(data);
    return await axios.post(`${url}/api/auth/signin`, data);
  } catch (error) {
    console.log(error)
  }
}
export const signup = async (data) => {
  try {
    console.log(data);
    return await axios.post(`${url}/api/auth/signup`, data);
  } catch (error) {
    console.log(error)
  }
}
export const addDustbin = async (data) => {
  try {
    console.log(data);
    return await axios.post(`${url}/api/dustbins/publicdustbin`, data);
  } catch (error) {
    console.log(error)
  }
}
export const getDustbin = async () => {
  try {
    console.log("getDustbin");

    const data = await axios.get(`${url}/api/dustbins/getDustbin`);
    console.log("data", data);
    return data;
  } catch (error) {
    console.log("api error", error)
  }
}

export const updateUser = async (data, id) => {
  console.log(id);
  let user = null;
  let error = null;
  const userData = await axios.put(`${url}/api/users/${id}`, data).then((res) => {
    user = res.data;
  }).catch((err) => {
    console.log(err);
    error = err;
  }
  );
  return [error, user];
}
export const registerDriver = async (data, id) => {
  console.log(id);
  let user = null;
  let error = null;
  const userData = await axios.post(`${url}/api/users/createDriver`, data).then((res) => {
    user = res.data;
  }).catch((err) => {
    console.log(err);
    error = err;
  }
  );
  return [error, user];
}
export const getAllDriver = async (data, id) => {
  console.log(id);
  let user = null;
  let error = null;
  const userData = await axios.get(`${url}/api/newacceptedRequest/getAllDrivers`).then((res) => {
    user = res.data;
  }).catch((err) => {
    console.log(err);
    error = err;
  }
  );
  return [error, user];
}
