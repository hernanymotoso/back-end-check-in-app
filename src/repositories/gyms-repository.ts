import { Gym, Prisma } from '@prisma/client'

export type FindManyNearbyParams = {
  latitude: number
  longitude: number
}

export interface GymsRepository {
  findById(id: string): Promise<Gym | null>
  create(data: Prisma.GymCreateInput): Promise<Gym | null>
  searchMany(query: string, page: number): Promise<Gym[]>
  fyndManyNearby(params: FindManyNearbyParams): Promise<Gym[]>
}
