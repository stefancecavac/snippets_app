import React, { useContext, useLayoutEffect, useState } from "react";
import { createUserData, userData } from "../types";
import { axiosInstance } from "../config/apiClient";
import { AxiosError, InternalAxiosRequestConfig } from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getCurrentUserApi, loginUserApi, logoutUserApi, registerUserApi } from "../api/authApi";

interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

type authContextType = {
  user?: userData;
  userLoading: boolean;
  accessToken: string | null;
  loginUser: (data: createUserData) => void;
  loginError: Error | null;
  loginPending: boolean;
  registerUser: (data: createUserData) => void;
  registerError: Error | null;
  registerPending: boolean;
  logout: () => void;
};

export const AuthContext = React.createContext<authContextType | null>(null);

export const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const queryClient = useQueryClient();

  const [accessToken, setAccessToken] = useState(null);
  console.log(accessToken);

  const { data: user, isLoading: userLoading } = useQuery({
    queryKey: ["auth"],
    queryFn: getCurrentUserApi,
    retry: false,
    staleTime: Infinity,
  });

  const {
    mutate: loginUser,
    error: loginError,
    isPending: loginPending,
  } = useMutation({
    mutationKey: ["auth"],
    mutationFn: loginUserApi,
    onSuccess: (data) => {
      setAccessToken(data.accessToken);
      queryClient.invalidateQueries({ queryKey: ["auth"] });
    },
  });

  const {
    mutate: registerUser,
    isPending: registerPending,
    error: registerError,
  } = useMutation({
    mutationKey: ["auth"],
    mutationFn: registerUserApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["auth"] });
    },
  });

  const { mutate: logout } = useMutation({
    mutationKey: ["auth"],
    mutationFn: logoutUserApi,
    onSuccess: () => {
      setAccessToken(null);
      queryClient.setQueryData(["auth"], null);
    },
  });

  useLayoutEffect(() => {
    const authInterceptor = axiosInstance.interceptors.request.use((config: CustomAxiosRequestConfig) => {
      config.headers.Authorization = accessToken && !config._retry ? `Bearer ${accessToken}` : config.headers.Authorization;
      return config;
    });

    return () => {
      axiosInstance.interceptors.request.eject(authInterceptor);
    };
  }, [accessToken]);

  useLayoutEffect(() => {
    const refreshInterceptor = axiosInstance.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config as CustomAxiosRequestConfig;

        if (error.response.status === 401) {
          originalRequest._retry = true;

          try {
            const response = await axiosInstance.post("auth/refresh-token");
            const newAccessToken = response.data.accessToken;
            setAccessToken(newAccessToken);

            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
            return axiosInstance(originalRequest);
          } catch (err) {
            const axiosError = err as AxiosError;

            if (axiosError.response?.status === 403) {
              setAccessToken(null);
              logout();
            }
          }
        }

        return Promise.reject(error);
      }
    );

    return () => {
      axiosInstance.interceptors.response.eject(refreshInterceptor);
    };
  }, [accessToken, logout]);

  return (
    <AuthContext.Provider
      value={{ user, loginUser, loginError, loginPending, registerUser, registerError, registerPending, userLoading, logout, accessToken }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const UseAuthContext = () => {
  const context = useContext(AuthContext);
  return context as authContextType;
};
