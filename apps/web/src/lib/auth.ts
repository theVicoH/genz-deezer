import { AuthUseCase } from "@genz-deezer/core"

import { authRepository } from "./apollo-client"

export const authUseCase = new AuthUseCase(authRepository)
