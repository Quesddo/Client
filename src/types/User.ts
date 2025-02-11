export interface UserServiceResponse {
  /** @format double */
  id: number;
  email: string;
  name: string;
  /** @format date-time */
  createdAt: string;
  /** @format date-time */
  updatedAt: string;
}

export interface ErrorResponse {
  message: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface UserCreateRequst {
  email: string;
  name: string;
  password: string;
  confirmPassword?: string;
}
