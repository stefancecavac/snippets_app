import { AxiosError } from "axios";
import { axiosInstance } from "../config/apiClient";
import { createUserData, userData } from "../types";

export const registerUserApi = async (data: createUserData) => {
  try {
    const response = await axiosInstance.post(`auth/register`, data);
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<{ message?: string }>;
    throw new Error(axiosError.response?.data?.message || "Registration failed");
  }
};

export const loginUserApi = async (data: createUserData) => {
  try {
    const response = await axiosInstance.post(`auth/login`, data);
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<{ message?: string }>;

    throw new Error(axiosError.response?.data?.message || "Login failed");
  }
};

export const logoutUserApi = async () => {
  try {
    const response = await axiosInstance.post(`auth/logout`);
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<{ message?: string }>;

    throw new Error(axiosError.response?.data?.message || "Logout failed");
  }
};

export const refreshTokenApi = async () => {
  try {
    const response = await axiosInstance.post(`auth/refresh-token`);
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<{ message?: string }>;

    throw new Error(axiosError.response?.data?.message || "Token refresh failed");
  }
};

export const getCurrentUserApi = async () => {
  try {
    const response = await axiosInstance.get(`auth/user`);
    return response.data as userData;
  } catch (error) {
    const axiosError = error as AxiosError<{ message?: string }>;

    throw new Error(axiosError.response?.data?.message || "Error fetching user");
  }
};
