import { compare } from 'bcryptjs'
import { describe, expect, it } from 'vitest'
import { RegisterUseCase } from '.'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { UserAlreadyExistsError } from '../errors/user-already-exists-error'

describe('Register Use Case', () => {
  it('should be able to register', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const registerUseCase = new RegisterUseCase(usersRepository)
    const { user } = await registerUseCase.execure({
      name: 'John Doe',
      email: 'john@example.com',
      password: '123456'
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should hash user password upon registration', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const registerUseCase = new RegisterUseCase(usersRepository)
    const { user } = await registerUseCase.execure({
      name: 'John Doe',
      email: 'john@example.com',
      password: '123456'
    })
    const isPasswordCorrectlyHashedj = await compare('123456', user.password_hash)

    expect(isPasswordCorrectlyHashedj).toBe(true)
  })

  it('should not be able to register with same email twice', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const registerUseCase = new RegisterUseCase(usersRepository)
    const email = 'john@example.com'
    await registerUseCase.execure({
      name: 'John Doe',
      email,
      password: '123456'
    })

    await expect(async () => await registerUseCase.execure({
      name: 'John Doe',
      email,
      password: '123456'
    })).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})
