import { CheckInsRepository } from '@/repositories/check-ins-repository'
import { CheckIn } from '@prisma/client'

type FetchUserCheckInsHistoryUseCaseRequest = {
  userId: string
  page: number
}

type FetchUserCheckInsHistoryUseCaseResponse = {
  checkIns: CheckIn[]
}

export class FetchUserCheckInsHistoryUseCase {
  constructor(private readonly checkInsRepository: CheckInsRepository) {}

  async execute({ userId, page }: FetchUserCheckInsHistoryUseCaseRequest): Promise<FetchUserCheckInsHistoryUseCaseResponse> {
    const checkIns = await this.checkInsRepository.findManyByUserId(userId, page)

    return {
      checkIns
    }
  }
}
