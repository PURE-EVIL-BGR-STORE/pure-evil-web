export interface LoginCredentials {
  identifier: string;
  password: string;
}

export interface RegisterCredentials {
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

// Interface định nghĩa response sau khi đăng nhập/đăng ký
export interface AuthResponse {
  success: boolean;
  data?: unknown;
}
