import { describe, it, expect, vi, beforeEach } from "vitest"

import { AuthUseCase } from "../auth/auth.usecase"

import type { AuthRepository } from "../auth/ports"
import type { AuthCredentials } from "@/entities/auth"

describe("AuthUseCase", () => {
  let authUseCase: AuthUseCase
  let mockAuthRepository: AuthRepository

  beforeEach(() => {
    mockAuthRepository = {
      login: vi.fn(),
      register: vi.fn()
    }

    authUseCase = new AuthUseCase(mockAuthRepository)
  })

  describe("login", () => {
    const validCredentials: AuthCredentials = {
      email: "test@example.com",
      password: "password123"
    }

    it("should call repository login with valid credentials", async () => {
      await authUseCase.login(validCredentials)

      expect(mockAuthRepository.login).toHaveBeenCalledWith(validCredentials)
    })

    it("should validate credentials before login", async () => {
      const invalidCredentials: AuthCredentials = {
        email: "invalid-email",
        password: "123"
      }

      await expect(authUseCase.login(invalidCredentials)).rejects.toThrow()
      expect(mockAuthRepository.login).not.toHaveBeenCalled()
    })
  })

  describe("register", () => {
    const validCredentials: AuthCredentials = {
      email: "test@example.com",
      password: "password123"
    }

    it("should call repository register with valid credentials", async () => {
      await authUseCase.register(validCredentials)

      expect(mockAuthRepository.register).toHaveBeenCalledWith(validCredentials)
    })

    it("should validate credentials before registration", async () => {
      const invalidCredentials: AuthCredentials = {
        email: "invalid-email",
        password: "123"
      }

      await expect(authUseCase.register(invalidCredentials)).rejects.toThrow()
      expect(mockAuthRepository.register).not.toHaveBeenCalled()
    })
  })

})
