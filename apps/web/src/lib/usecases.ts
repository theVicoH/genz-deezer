import { AuthUseCase, UserUseCase, AuthTokenStateUseCase, TracksUseCase, AudioPlayerUseCase } from "@genz-deezer/core"

import { authRepository, userRepository, tracksRepository, authTokenStateRepository, html5PlayerAudioRepository } from "./repositories"

// Auth usecase

export const authUseCase = new AuthUseCase(authRepository)

export const authTokenStateUseCase = new AuthTokenStateUseCase(authTokenStateRepository)

// User usecase

export const userUseCase = new UserUseCase(userRepository)

// Track usecase

export const tracksUseCase = new TracksUseCase(tracksRepository)

// Player Audio usecase

export const playerAudioUseCase = new AudioPlayerUseCase(html5PlayerAudioRepository)
