
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import axios, { AxiosError } from "axios";
import { User } from "firebase/auth";

const api = axios.create({
  baseURL: import.meta.env.VITE_URL_API,
});

export const createUser = async (data: User, token: Promise<string>) => {
  try {
    const response = await api.post('/user', {
      username: data.displayName,
      ...data
    }, {
      headers: {
        Authorization: `Bearer ${await token}`
      }
    })

    return response.data;
  } catch (error: unknown | AxiosError) {
    if (axios.isAxiosError(error)) {
      console.error(error.response?.data);
    }
  }
}