import { apiClient } from "@/lib/api-client";
import type { LoginCredentials, RegisterCredentials, AuthResponse } from "@/shared/types/auth";

// Logic xử lý API của fe
export const authService = {
  // login api
  login: (credentials: LoginCredentials) =>
    apiClient.post<AuthResponse>("/api/auth/login", credentials),

  // register api
  register: (credentials: RegisterCredentials) =>
    apiClient.post<AuthResponse>("/api/auth/register", credentials),
};
