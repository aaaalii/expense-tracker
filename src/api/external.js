import axios from "axios";

const api = axios.create({
  'baseURL': 'https://fakestoreapi.com',
  'withCredentials': false,
  'headers': {
    'Content-Type': 'application/json'
  }
})

export const getExpenses = async (id) => {
  let response;

  try {
    response = await api.get(`/carts/user/${id}`);
  } catch (error) {
    return error.message;
  }

  return response;
}