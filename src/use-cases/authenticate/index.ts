import { UsersRepository } from '@/repositories/users-repository'
import { User } from '@prisma/client'
import { InvalidCredentialsError } from '../errors/invalid-credentials-error'
import { compare } from 'bcryptjs'

type AuthenticateUseCaseRequest = {
  email: string
  password: string
}

type AuthenticateUseCaseResponse = {
  user: User
}

export class AuthenticateUseCase {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute({ email, password }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
    const user = await this.usersRepository.findByEmail(email)
    if (!user) throw new InvalidCredentialsError()
    const doesPasswordMatches = await compare(password, user.password_hash)
    if (!doesPasswordMatches) throw new InvalidCredentialsError()

    return {
      user
    }
  }
}
