import { GymsRepository } from '@/repositories/gyms-repository'
import { Gym } from '@prisma/client'

type FetchNearbyGymsUseCaseRequest = {
  userLatitude: number
  userLongitude: number
}

type FetchNearbyGymsUseCaseResponse = {
  gyms: Gym[]
}

export class FetchNearbyGymsUseCase {
  constructor (private readonly gymsRepository: GymsRepository) {}

  async execute ({ userLatitude, userLongitude }: FetchNearbyGymsUseCaseRequest): Promise<FetchNearbyGymsUseCaseResponse> {
    const gyms = await this.gymsRepository.fyndManyNearby({ latitude: userLatitude, longitude: userLongitude })

    return {
      gyms
    }
  }
}
