export const ACCESS_TOKEN = "access_token";
export const REFRESH_TOKEN = "refresh_token";

export type UserInfo = {
  id: string;
  email: string;
  username: string | null;
};

export type AuthTokens = {
  accessToken: string;
  refreshToken: string;
  user: UserInfo;
};

export type LoginDto = {
  email: string;
  password: string;
};

export type RegisterDto = {
  email: string;
  password: string;
  name?: string;
};

export type RegisterResponse = {
  message: string;
  userId: string;
};
