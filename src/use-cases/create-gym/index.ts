import { GymsRepository } from '@/repositories/gyms-repository'
import { Gym } from '@prisma/client'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

type CreateGymUseCaseRequest = {
  title: string
  description: string | null
  phone: string | null
  latitude: number
  longitude: number
}

type CreateGymUseCaseResponse = {
  gym: Gym
}

export class CreateGymUseCase {
  constructor (private readonly gymsRepository: GymsRepository) {}

  async execute ({ title, description, phone, latitude, longitude }: CreateGymUseCaseRequest): Promise<CreateGymUseCaseResponse> {
    const gym = await this.gymsRepository.create({
      title,
      description,
      phone,
      latitude,
      longitude
    })

    if (!gym) throw new ResourceNotFoundError()

    return {
      gym
    }
  }
}
