import axios, { AxiosError } from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { useAppDispatch } from "@store/hooks";
import { IErrorResponse } from "@store/types/auth";
import { apiUrls, baseUrl, tokenAccess } from "@config/config";
import { alertConfirm, alertError } from "@utils/alerts";
import { NavigateFunction } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { UserProps } from "@utils/interfaces";

export const axiosInstance = axios.create({
  baseURL: baseUrl,
  timeout: 5000,
});

let interceptor = 0;

const getToken = () => {
  return localStorage.getItem(tokenAccess.tokenName) || "";
};

const getRefreshToken = () => {
  return localStorage.getItem(tokenAccess.refreshTokenName);
};

const validateToken = async () => {
  if (!getToken() || !getRefreshToken()) {
    return false;
  }
  if (isRefreshTokenAboutToExpire()) {
    return false;
  }
  if (isTokenAboutToExpire()) {
    const updated = await updatedToken();
    if (!updated) {
      return false;
    }
  }
  return true;
};

const updatedToken = async () => {
  const refreshToken = getRefreshToken();
  if (!refreshToken) {
    return false;
  }
  try {
    const response = await axios.post(apiUrls.refreshToken(), {
      refresh_token: refreshToken,
    });
    if (response.data.ok) {
      localStorage.setItem(tokenAccess.tokenName, response.data.token);
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};

const isTokenAboutToExpire = (extraTimeInSeconds = 30) => {
  const token = getToken();
  if (!token) {
    return true;
  }
  const decodedToken = jwtDecode(token);
  const currentTime = Date.now() / 1000;
  const expirationTime = decodedToken.exp;
  if (expirationTime !== undefined) {
    return expirationTime - currentTime <= extraTimeInSeconds;
  } else {
    return true;
  }
};

const deleteAccess = async () => {
  try {
    if (await validateToken()) {
      await axios.post(
        apiUrls.logOut(),
        {},
        {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${getToken()}`,
          },
        }
      );
    }
  } finally {
    localStorage.removeItem(tokenAccess.tokenName);
    localStorage.removeItem(tokenAccess.refreshTokenName);
    localStorage.removeItem("completedForm");
  }
};

const isRefreshTokenAboutToExpire = (extraTimeInSeconds = 30) => {
  const refreshtoken = getRefreshToken();
  if (!refreshtoken) {
    return true;
  }
  const decodedToken = jwtDecode(refreshtoken);
  const currentTime = Date.now() / 1000;
  const expirationTime = decodedToken.exp;
  if (expirationTime !== undefined) {
    return expirationTime - currentTime <= extraTimeInSeconds;
  } else {
    return true;
  }
};

export const logOutAsync = createAsyncThunk(
  "auth/logOutAsync",
  async (_, { rejectWithValue }) => {
    try {
      await deleteAccess();
      return {};
    } catch (error) {
      rejectWithValue("error");
    } finally {
      if (interceptor) {
        axiosInstance.interceptors.response.eject(interceptor);
      }
    }
  }
);

const setupAxiosInterceptors = (
  dispatch: ReturnType<typeof useAppDispatch>
) => {
  interceptor = axiosInstance.interceptors.request.use(
    async config => {
      try {
        const token = getToken();
        const refreshToken = getRefreshToken();
        if (!token || !refreshToken) {
          dispatch(logOutAsync());
        } else if (isRefreshTokenAboutToExpire()) {
          dispatch(logOutAsync());
        } else if (isTokenAboutToExpire()) {
          const response = await axios.post(apiUrls.refreshToken(), {
            refresh_token: refreshToken,
          });
          if (response.data.ok) {
            config.headers["Authorization"] = `Bearer ${response.data.token}`;
            localStorage.setItem(tokenAccess.tokenName, response.data.token);
          } else {
            dispatch(logOutAsync());
          }
        } else {
          config.headers["Authorization"] = `Bearer ${token}`;
        }
      } catch (error) {
        return Promise.reject(error);
      }
      return config;
    },
    error => {
      return Promise.reject(error);
    }
  );
};

export const logInWithGoogleAsync = createAsyncThunk(
  "auth/logInWithGoogleAsync",
  async (
    data: {
      token: string;
      dispatch: ReturnType<typeof useAppDispatch>;
      setError: (error: string) => void;
    },
    { rejectWithValue }
  ) => {
    const { token, dispatch, setError } = data;
    try {
      const response = await axios.post(apiUrls.logInWithGoogle(), { token });
      if (response.data.ok) {
        localStorage.setItem(tokenAccess.tokenName, response.data.token);
        localStorage.setItem(
          tokenAccess.refreshTokenName,
          response.data.refreshToken
        );
        setupAxiosInterceptors(dispatch);
        alertConfirm("Sesión iniciada correctamente");
        dispatch(getUserAsync());
        return {};
      } else {
        setError(response.data.message);
        return rejectWithValue("error");
      }
    } catch (error) {
      const message =
        (error as IErrorResponse).response.data.message ||
        "Error al iniciar sesión";
      setError(message);
      return rejectWithValue("error");
    }
  }
);

export const verifyCode = createAsyncThunk(
  "auth/verifyCode",
  async (
    {
      dto,
      setActive,
      setError,
    }: {
      dto: {
        code: string;
      };
      setActive: (boolean: boolean) => void;
      setError: (error: string) => void;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.post(apiUrls.verifyEmail(), dto);
      if (response.data.ok) {
        return {};
      } else {
        setActive(false);
        setError(response.data.message);
        return rejectWithValue("error");
      }
    } catch (error) {
      setActive(false);
      const message =
        (error as IErrorResponse).response.data.message ||
        "El codigo es incorrecto";
      setError(message);
      return rejectWithValue("error");
    }
  }
);

export const resendCode = async (
  dispatch: ReturnType<typeof useAppDispatch>
) => {
  try {
    const response = await axiosInstance.post(apiUrls.resendCode(), {});
    if (response.data.ok) {
      alertConfirm("Codigo reenviado");
      dispatch(getUserAsync());
    } else {
      alertError("Error al reenviar codigo");
    }
  } catch (error) {
    alertError("Error al reenviar codigo");
  }
};
export const myEventsAsync = createAsyncThunk(
  "auth/myEventsAsync",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(apiUrls.myEvents());
      if (response.data.ok) {
        return response.data.events;
      } else {
        return rejectWithValue("error");
      }
    } catch (error) {
      deleteAccess();
      return rejectWithValue("error");
    }
  }
);
export const getUserAsync = createAsyncThunk(
  "auth/getUserAsync",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(apiUrls.getUser());
      if (response.data.ok) {
        return response.data;
      } else {
        return rejectWithValue("error");
      }
    } catch (error) {
      deleteAccess();
      return rejectWithValue("error");
    }
  }
);

export const signUpAsync = createAsyncThunk(
  "auth/signUpAsync",
  async (
    {
      data,
      setActive,
      setError,
      dispatch,
    }: {
      data: {
        email: string;
        password: string;
      };
      setActive: (boolean: boolean) => void;
      setError: (error: string) => void;
      dispatch: ReturnType<typeof useAppDispatch>;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(apiUrls.signUp(), data);
      if (response.data.ok) {
        localStorage.setItem(tokenAccess.tokenName, response.data.token);
        localStorage.setItem(
          tokenAccess.refreshTokenName,
          response.data.refreshToken
        );
        setupAxiosInterceptors(dispatch);
        dispatch(getUserAsync());
        return {};
      } else {
        setError(response.data.message);
        return rejectWithValue("error");
      }
    } catch (error) {
      const message =
        (error as IErrorResponse).response.data.message ||
        "Error al iniciar sesión";
      setError(message);
      return rejectWithValue("error");
    } finally {
      setActive(false);
    }
  }
);

export const forgetPasswordNewPassword = async ({
  data,
  setActive,
  setError,
  navigate,
}: {
  data: {
    newPassword: string;
    repeatNewPassword: string;
  };
  setActive: (boolean: boolean) => void;
  setError: (error: string) => void;
  navigate: NavigateFunction;
}) => {
  const formattedData = {
    code: localStorage.getItem("code"),
    token: localStorage.getItem("forgetPasswordToken"),
    password: data.newPassword,
    confirmPassword: data.repeatNewPassword,
  };
  try {
    const response = await axios.post(
      apiUrls.forgetPasswordNewPassword(),
      formattedData
    );
    if (response.data.ok) {
      alertConfirm("Contraseña actualizada.");
      navigate("/auth/log-in");
    } else {
      setActive(false);
      setError(response.data.message);
    }
  } catch (error) {
    setActive(false);
    const message =
      (error as IErrorResponse).response.data.message ||
      "No existe el email ingresado";
    setError(message);
  }
};

export const logInAsync = createAsyncThunk(
  "auth/logInAsync",
  async (
    {
      data,
      setActive,
      setError,
      dispatch,
    }: {
      data: {
        email: string;
        password: string;
      };
      setActive: (boolean: boolean) => void;
      setError: (error: string) => void;
      dispatch: ReturnType<typeof useAppDispatch>;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(apiUrls.logIn(), data);
      if (response.data.ok) {
        localStorage.setItem(tokenAccess.tokenName, response.data.token);
        localStorage.setItem(
          tokenAccess.refreshTokenName,
          response.data.refreshToken
        );
        setupAxiosInterceptors(dispatch);
        setActive(false);
        alertConfirm("Sesión iniciada correctamente");
        dispatch(getUserAsync());
        dispatch(myEventsAsync());
        return {};
      } else {
        setError(response.data.message);
        return rejectWithValue("error");
      }
    } catch (error) {
      setActive(false);
      const message =
        (error as IErrorResponse).response.data.message ||
        "Error al iniciar sesión";
      setError(message);
      return rejectWithValue("error");
    }
  }
);

export const completeProfile = async ({
  data,
  setActive,
  setError,
  dispatch,
}: {
  data: {
    first_name: string;
    last_name: string;
    news_letter: boolean;
    keep_me_updated: boolean;
    phone: string;
    day: string;
    month: string;
    year: string;
  };
  setActive: (boolean: boolean) => void;
  setError: (error: string) => void;
  dispatch: ReturnType<typeof useAppDispatch>;
}) => {
  try {
    const response = await axiosInstance.put(apiUrls.completeProfile(), data);
    if (response.data.ok) {
      alertConfirm("Perfil completado");
      dispatch(getUserAsync());
    } else {
      setError(response.data.message);
    }
  } catch (error) {
    const message =
      (error as IErrorResponse).response.data.message ||
      "Error al completar perfil";
    setError(message);
  } finally {
    setActive(false);
  }
};

export const uploadAvatarAsync = createAsyncThunk(
  "auth/uploadAvatarAsync",
  async (file: FormData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(apiUrls.uploadAvatar(), file, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (response.data.ok) {
        alertConfirm("Avatar actualizado");
        return response.data.user.avatar;
      } else {
        alertError("Error al actualizar avatar");
        return rejectWithValue("error");
      }
    } catch (error) {
      alertError("Error al actualizar avatar");
      return rejectWithValue("error");
    }
  }
);

export const forgetPasswordCode = async ({
  codeToString,
  setActive,
  setError,
  navigate,
}: {
  codeToString: string;
  setActive: (boolean: boolean) => void;
  setError: (error: string) => void;
  navigate: NavigateFunction;
}) => {
  try {
    const data = {
      code: codeToString,
      token: localStorage.getItem("forgetPasswordToken"),
    };
    localStorage.setItem("code", codeToString);
    const response = await axios.post(apiUrls.forgetPasswordCode(), data);
    if (response.data.ok) {
      navigate("/auth/forgot-password/new-password");
    } else {
      setActive(false);
      setError(response.data.message);
    }
  } catch (error) {
    setActive(false);
    const message =
      (error as IErrorResponse).response.data.message ||
      "No existe el email ingresado";
    setError(message);
  }
};

export const forgetPassword = async ({
  email,
  setActive,
  setError,
  navigate,
}: {
  email: string;
  setActive?: (boolean: boolean) => void;
  setError?: (error: string) => void;
  navigate: NavigateFunction;
}) => {
  try {
    const response = await axios.post(apiUrls.forgetPassword(), { email });
    if (response.data.ok) {
      localStorage.setItem("forgetPasswordToken", response.data.token);
      navigate("/auth/forgot-password/verify-code");
    } else {
      if (setActive && setError) {
        setActive(false);
        setError(response.data.message);
      }
    }
  } catch (error) {
    if (setActive && setError) {
      setActive(false);
      const message =
        (error as IErrorResponse).response.data.message ||
        "No existe el email ingresado";
      setError(message);
    }
  }
};

export const verifySessionAsync = createAsyncThunk(
  "auth/verifySessionAsync",
  async (
    {
      dispatch,
    }: {
      dispatch: ReturnType<typeof useAppDispatch>;
    },
    { rejectWithValue }
  ) => {
    if (!(await validateToken())) {
      await deleteAccess();
      return rejectWithValue("error");
    }
    try {
      setupAxiosInterceptors(dispatch);
      await dispatch(getUserAsync());
      await dispatch(myEventsAsync());
      return {};
    } catch (error) {
      await deleteAccess();
      return rejectWithValue("error");
    }
  }
);

export const getSessionId = () => {
  const token = getToken();
  if (!token) {
    return null;
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const decodedToken = jwtDecode<any>(token);
  return decodedToken.sessionId;
};

export const deleteSessionById = async (id: number) => {
  try {
    const response = await axiosInstance.delete(apiUrls.deleteSession(id));
    if (response.data.ok) {
      alertConfirm("Sesión eliminada");
      return true;
    } else {
      alertError("Error al eliminar sesión");
      return false;
    }
  } catch (error) {
    alertError("Error al obtener sesiones");
    return false;
  }
};

export const getMySessions = async (
  dispatch: ReturnType<typeof useAppDispatch>
) => {
  try {
    const response = await axiosInstance.get(apiUrls.getSessions());
    if (response.data.ok) {
      return response.data.sessions;
    } else {
      alertError("Error al obtener sesiones");
      dispatch(logOutAsync());
      return [];
    }
  } catch (error) {
    alertError("Error al obtener sesiones");
    dispatch(logOutAsync());
    return [];
  }
};

export const putUserAsync = createAsyncThunk(
  "auth/putUserAsync",
  async (
    {
      data,
      setActive,
      setError,
    }: {
      data: Partial<UserProps>;
      setActive: (boolean: boolean) => void;
      setError: (error: string) => void;
    },
    { dispatch, rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.put(apiUrls.putUser(), data);
      if (response.data.ok) {
        alertConfirm("Usuario actualizado");
        dispatch(getUserAsync());
        setError("");
        return data;
      } else {
        alertError("Error al actualizar usuario");
        setError(response.data.message);
        return rejectWithValue("error");
      }
    } catch (error) {
      const message =
        (error as IErrorResponse).response.data.message ||
        "Error al actualizar usuario";
      setError(message);
      console.error(error);
      return rejectWithValue("error");
    } finally {
      setActive(false);
    }
  }
);

export const setRedirect = createAsyncThunk(
  "redirect/set",
  async (redirect: string) => {
    return { redirect };
  }
);

export const resetRedirect = createAsyncThunk("redirect/reset", async () => {
  return {};
});

export const setNewPasswordSubmit = async ({
  newPassword,
  setActive,
  setError,
}: {
  newPassword: string;
  setActive: (boolean: boolean) => void;
  setError: (error: string) => void;
}) => {
  setActive(true);
  setError("");
  try {
    const response = await axiosInstance.post(apiUrls.setNewPassword(), {
      newPassword,
    });
    if (response.data.ok) {
      setActive(false);
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      setError(`${error.response?.data.message[0]}`);
    }
    setActive(false);
    console.error(error);
  }
};
