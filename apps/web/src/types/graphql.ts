export interface User {
  id: string;
  email: string;
  createdAt: string;
}

export interface AuthPayload {
  token: string;
  user: User;
}

export interface LoginMutationResponse {
  login: AuthPayload;
}

export interface RegisterMutationResponse {
  register: AuthPayload;
}

export interface MeQueryResponse {
  me: User;
}
