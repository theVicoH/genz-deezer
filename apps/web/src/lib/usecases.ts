import { AuthUseCase, UserUseCase, AuthTokenStateUseCase, TracksUseCase } from "@genz-deezer/core"

import { authRepository, userRepository, tracksRepository } from "./apollo-client"

import { ZustandAuthTokenStateRepository } from "@genz-deezer/infrastructure"

const authTokenStateRepository = new ZustandAuthTokenStateRepository()

export const authUseCase = new AuthUseCase(authRepository)

export const userUseCase = new UserUseCase(userRepository)

export const authTokenStateUseCase = new AuthTokenStateUseCase(authTokenStateRepository)

export const tracksUseCase = new TracksUseCase(tracksRepository)
