import { AuthUseCase, AuthTokenStateUseCase } from "@genz-deezer/core"
import { ZustandAuthTokenStateRepository } from "@genz-deezer/infrastructure"

import { authRepository } from "./apollo-client"

const authTokenStateRepository = new ZustandAuthTokenStateRepository()

export const authUseCase = new AuthUseCase(authRepository)

export const authTokenStateUseCase = new AuthTokenStateUseCase(authTokenStateRepository)
