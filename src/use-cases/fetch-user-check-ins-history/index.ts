import { CheckInsRepository } from '@/repositories/check-ins-repository'
import { CheckIn } from '@prisma/client'

type FetchUserCheckInsUseCaseRequest = {
  userId: string
  page: number
}

type FetchUserCheckInsUseCaseResponse = {
  checkIns: CheckIn[]
}

export class FetchUserCheckInsUseCase {
  constructor(private readonly checkInsRepository: CheckInsRepository) {}

  async execute({ userId, page }: FetchUserCheckInsUseCaseRequest): Promise<FetchUserCheckInsUseCaseResponse> {
    const checkIns = await this.checkInsRepository.findManyByUserId(userId, page)

    return {
      checkIns
    }
  }
}
