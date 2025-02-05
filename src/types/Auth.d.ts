import { Session, User } from "next-auth";
import { JWT } from "next-auth/jwt";

interface IRegister {
  fullName: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface ILogin {
  identifier: string;
  password: string;
}

interface IActivation {
  code: string;
}

interface IProfile {
  _id?: string;
  email?: string;
  fullName?: string;
  isActive?: boolean;
  profilePicture?: string | FileList;
  role?: string;
  username?: string;
}

interface IUpdatePassword {
  oldPassword: string;
  password: string;
  confirmPassword: string;
}

interface UserExtended extends User {
  accessToken?: string;
  role?: string;
}

interface SessionExtended extends Session {
  accessToken?: string;
}

interface JWTExtended extends JWT {
  user?: UserExtended;
}

export type {
  IRegister,
  ILogin,
  IActivation,
  IProfile,
  IUpdatePassword,
  UserExtended,
  SessionExtended,
  JWTExtended,
};
