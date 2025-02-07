import { AuthUseCase, UserUseCase } from "@genz-deezer/core"

import { authRepository, userRepository } from "./apollo-client"

export const authUseCase = new AuthUseCase(authRepository)

export const userUseCase = new UserUseCase(userRepository)
