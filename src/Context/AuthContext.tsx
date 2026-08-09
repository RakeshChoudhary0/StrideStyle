"use client";
import API, { setToken, clearToken } from "@/Libs/Apis/axios";
import { AxiosError } from "axios";
import {
  useState,
  createContext,
  useContext,
  useEffect,
  Children,
  ReactNode,
} from "react";
import { toast } from "sonner";

export interface user {
  id: string;
  email: string;
  name: string;
  isVerified?: boolean;
  [key: string]: unknown;
}

interface AuthResponse {
  message?: string;
  success?: boolean;
  data: user;
  accessToken: string;
}

interface AuthContextType {
  user: user | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  signup: (data: Record<string, unknown>) => Promise<AuthResponse | null>;
  getMe: () => Promise<void>;
  login: (email: string, password: string) => Promise<AuthResponse | null>;
  logout: () => Promise<void>;
  sendOtp: (userId: string, channel?: "email" | "sms") => Promise<boolean>;
  verifyOtp: (userId: string, otp: string) => Promise<boolean>;
}

interface ApiErrorResponse {
  error?: string;
  message?: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<user | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const getErrorMessage = (error: unknown, fallback: string): string => {
    if (error instanceof AxiosError && error.response?.data) {
      const data = error.response.data as ApiErrorResponse;
      return data.error || data.message || fallback;
    }
    return fallback;
  };

  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        setIsLoading(false);
        return;
      }

      try {
        const res = await API.get("/auth");
        setUser(res.data.user);
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Session restoration failed:", error);
        clearToken();
        setUser(null);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();
  }, []);

  const getMe = async (): Promise<void> => {
    try {
      setIsLoading(true);
      const res = await API.get("/auth");
      setUser(res.data.user);
      setIsAuthenticated(true);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (
    email: string,
    password: string,
  ): Promise<AuthResponse | null> => {
    try {
      setIsLoading(true);
      const res = await API.post<AuthResponse>("/auth/login", {
        email,
        password,
      });

      setToken(res.data.accessToken);
      setUser(res.data.data);
      setIsAuthenticated(true);

      toast.success("Welcome back!", {
        description: "Logged in successfully.",
      });
      return res.data;
    } catch (error) {
      console.error(error);
      const msg = getErrorMessage(error, "Login Failed");
      toast.error("Authentication Error", { description: msg });
      setIsAuthenticated(false);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async (): Promise<void> => {
    try {
      await API.post("/auth/logout");
    } catch (error) {
      console.error("Logout API failed", error);
    } finally {
      clearToken();
      setUser(null);
      setIsAuthenticated(false);
      toast.info("Logged out", {
        description: "You have been logged out of your session.",
      });
      window.location.href = "/login";
    }
  };

  const signup = async (
    data: Record<string, unknown>,
  ): Promise<AuthResponse | null> => {
    try {
      setIsLoading(true);
      const res = await API.post("/auth/signup", data);

      setToken(res.data.accessToken);
      setUser(res.data.data);
      setIsAuthenticated(true);

      toast.success("Account created!", {
        description:
          res.data?.message || "Your account was successfully set up.",
      });
      return res.data;
    } catch (error) {
      console.error(error);
      const msg = getErrorMessage(error, "Signup failed");
      toast.error("Registration Error", { description: msg });
      return null;
    } finally {
      setIsLoading(false);
    }
  };
};
