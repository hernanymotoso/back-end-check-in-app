import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'

describe('Create Gym (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('Should be able to create a gym', async () => {
    const { token } = await createAndAuthenticateUser(app)

    const response = await request(app.server).post('/gyms').set('Authorization', `Bearer ${token as string}`).send({
      title: 'javaScript Gym',
      description: 'Some description',
      phone: '11933884476',
      latitude: -27.2092052,
      longitude: -49.6401091
    })

    expect(response.statusCode).toEqual(201)
  })
})
