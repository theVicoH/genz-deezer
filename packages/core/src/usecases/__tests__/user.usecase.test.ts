import { describe, it, expect, vi, beforeEach } from "vitest"

import { UserUseCase } from "../user/user.usecase"

import type { UserRepository } from "../user/ports"

describe("UserUseCase", () => {
  let userUseCase: UserUseCase
  let mockUserRepository: UserRepository

  beforeEach(() => {
    mockUserRepository = {
      getCurrentUser: vi.fn(),
      updateProfile: vi.fn()
    }

    userUseCase = new UserUseCase(mockUserRepository)
  })

  describe("getCurrentUser", () => {
    it("should call repository getCurrentUser", async () => {
      await userUseCase.getCurrentUser()

      expect(mockUserRepository.getCurrentUser).toHaveBeenCalled()
    })
  })

  describe("updateProfile", () => {
    it("should update profile with valid email", async () => {
      const email = "test@example.com"
      const expectedUser = { email }

      mockUserRepository.updateProfile = vi.fn().mockResolvedValue(expectedUser)

      const result = await userUseCase.updateProfile(email)

      expect(result).toEqual(expectedUser)
      expect(mockUserRepository.updateProfile).toHaveBeenCalledWith(email)
    })

    it("should throw error with invalid email", async () => {
      const invalidEmail = "invalid-email"

      await expect(userUseCase.updateProfile(invalidEmail))
        .rejects
        .toThrow("Email invalide")

      expect(mockUserRepository.updateProfile).not.toHaveBeenCalled()
    })

    it("should throw error with empty email", async () => {
      const emptyEmail = ""

      await expect(userUseCase.updateProfile(emptyEmail))
        .rejects
        .toThrow("Email invalide")

      expect(mockUserRepository.updateProfile).not.toHaveBeenCalled()
    })
  })
  
})
