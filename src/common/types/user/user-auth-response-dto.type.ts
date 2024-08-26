import { type User } from "./user.type";

type Tokens = {
  accessToken: string;
  refreshToken: string;
};

type UserAuthResponseDto = {
  tokens: Tokens;
  user: User;
};

export { type UserAuthResponseDto };