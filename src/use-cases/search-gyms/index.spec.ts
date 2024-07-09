import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { SearchGymsUseCase } from '.'

let gymsRepository: InMemoryGymsRepository
let sut: SearchGymsUseCase

describe('Search Gyms Use Case', () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new SearchGymsUseCase(gymsRepository)
  })

  it('Should be able to search form gyms', async () => {
    await gymsRepository.create({
      title: 'Java gym',
      description: null,
      phone: null,
      latitude: -27.2092052,
      longitude: -49.6401091
    })

    await gymsRepository.create({
      title: 'Python gym',
      description: null,
      phone: null,
      latitude: -27.2092052,
      longitude: -49.6401091
    })

    const { gyms } = await sut.execute({
      query: 'Java',
      page: 1
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'Java gym' })
    ])
  })

  it('Should be able to fetch paginated gyms search', async () => {
    for (let i = 1; i <= 22; i++) {
      await gymsRepository.create({
        title: `Java gym ${i}`,
        description: null,
        phone: null,
        latitude: -27.2092052,
        longitude: -49.6401091
      })
    }

    const { gyms } = await sut.execute({
      query: 'Java gym',
      page: 2
    })

    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'Java gym 21' }),
      expect.objectContaining({ title: 'Java gym 22' })
    ])
  })
})
