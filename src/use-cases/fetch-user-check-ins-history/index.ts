import { CheckInsRepository } from '@/repositories/check-ins-repository'
import { CheckIn } from '@prisma/client'

type FetchUserCheckInsUseCaseRequest = {
  userId: string
}

type FetchUserCheckInsUseCaseResponse = {
  checkIns: CheckIn[]
}

export class FetchUserCheckInsUseCase {
  constructor(private readonly checkInsRepository: CheckInsRepository) {}

  async execute({ userId }: FetchUserCheckInsUseCaseRequest): Promise<FetchUserCheckInsUseCaseResponse> {
    const checkIns = await this.checkInsRepository.findManyByUserId(userId)

    return {
      checkIns
    }
  }
}
