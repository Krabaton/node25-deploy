const supertest = require('supertest')
const app = require('../src/app')

jest.mock('../src/controllers/cats.js', () => {
  return {
    get: jest.fn((req, res) => {
      return res.json([])
    }),
    getById: jest.fn((req, res) => {
      return res.json([])
    }),
    create: jest.fn((req, res) => {
      return res.json([])
    }),
    update: jest.fn((req, res) => {
      return res.json([])
    }),
    remove: jest.fn((req, res) => {
      return res.json([])
    }),
  }
})

describe('should handle API', () => {
  it('should be request get api/cats', async (done) => {
    const res = await supertest(app).get('/api/cats')
    expect(res.status).toEqual(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(0)
    done()
  })
})
