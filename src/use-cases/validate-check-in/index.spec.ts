import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { afterAll, beforeEach, describe, expect, it, vi } from 'vitest'
import { ValidateCheckInUseCase } from '.'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

let checkInsRepository: InMemoryCheckInsRepository
let sut: ValidateCheckInUseCase

describe('Validate Check-In Use Case', () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository()
    sut = new ValidateCheckInUseCase(checkInsRepository)

    vi.useFakeTimers()
  })

  afterAll(() => {
    vi.useRealTimers()
  })

  it('Should be able to validate the check-in', async () => {
    const createdCheckIn = await checkInsRepository.create({
      gym_id: 'gym-01',
      user_id: 'user-01'
    })

    const { checkIn } = await sut.execute({
      checkInId: createdCheckIn.id
    })

    expect(checkIn.validated_at).toEqual(expect.any(Date))
    expect(checkInsRepository.checkIns[0].validated_at).toEqual(expect.any(Date))
  })

  it('Should not be able to validate an inexistent check-in', async () => {
    await expect(async () => sut.execute({
      checkInId: 'inexistent-check-in-id'
    })).rejects.toBeInstanceOf(ResourceNotFoundError)
  })

  it('Should not be able to validate the check-in after 20 minutes of its creation', async () => {
    vi.setSystemTime(new Date(2023, 0, 1, 13, 40))

    const createdCheckIn = await checkInsRepository.create({
      gym_id: 'gym-01',
      user_id: 'user-01'
    })

    const twentyOneMinutesInMs = 1000 * 60 * 21
    vi.advanceTimersByTime(twentyOneMinutesInMs)

    await expect(async () => sut.execute({
      checkInId: createdCheckIn.id
    })).rejects.toBeInstanceOf(Error)
  })
})
