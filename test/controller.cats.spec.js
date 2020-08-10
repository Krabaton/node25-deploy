const ctrl = require('../src/controllers/cats')
const { HttpCode } = require('../src/helpers/constants')
const { getPayloadFromBearToken } = require('../src/helpers/getpayload')
const { cats } = require('../src/repository')

jest.mock('../src/helpers/getpayload')
jest.mock('../src/repository')

describe('UNIT TEST: Cats controller', () => {
  let resultCats, createdCat
  beforeAll(() => {
    resultCats = [
      {
        id: 1,
        name: 'Simon',
        age: 2,
      },
      {
        id: 2,
        name: 'Barsik',
        age: 3,
      },
    ]
    createdCat = { id: 3, name: 'New cat', age: 1 }
    cats.getAllCats.mockReturnValue({
      total: resultCats.length,
      cats: resultCats,
    })
    cats.getCatById = jest.fn((id) => resultCats.find((el) => el.id === id))
    cats.createCat = jest.fn(() => {
      resultCats.push(createdCat)
      return createdCat
    })
    cats.updateCat = jest.fn((obj, id) => {
      const cat = resultCats.find((el) => el.id === id)
      cat.name = obj.name
      cat.age = obj.age
      return cat
    })
    cats.deleteCat = jest.fn((id) => {
      const result = resultCats.find((el) => el.id === id)
      resultCats = resultCats.filter((el) => el.id !== id)
      return result
    })
  })

  test('should be show all list of cats', async () => {
    const req = {
      query: {},
    }
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn((data) => data),
    }
    getPayloadFromBearToken.mockReturnValue({ id: 1234567 })
    const result = await ctrl.get(req, res)
    expect(result).toBeDefined()
    expect(result).toHaveProperty('statusMessage', 'Ok')
    expect(result).toHaveProperty('status', HttpCode.OK)
    expect(result).toHaveProperty('total', resultCats.length)
    expect(result).toHaveProperty('data', resultCats)
  })

  test('should be show cat by Id', async () => {
    const req = {
      query: {},
      params: { id: 2 },
    }
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn((data) => data),
    }
    const result = await ctrl.getById(req, res)
    expect(result).toBeDefined()
    expect(result).toHaveProperty('name')
    expect(result).toHaveProperty('age')
  })

  test('should be displayed an error cat has the wrong Id', async () => {
    const req = {
      query: {},
      params: { id: 3 },
    }
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn((data) => data),
    }
    const result = await ctrl.getById(req, res)
    expect(result).toBeDefined()
    expect(result).toHaveProperty('err')
  })
  test('should be show create cat', async () => {
    const req = {
      query: {},
    }
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn((data) => data),
    }
    getPayloadFromBearToken.mockReturnValue({ id: 1234567 })
    const result = await ctrl.create(req, res)
    expect(result).toBeDefined()
    expect(result).toHaveProperty('name', createdCat.name)
    expect(result).toHaveProperty('age', createdCat.age)
  })
  test('should be show update cat', async () => {
    const updateCat = {
      name: 'Tobi',
      age: 1,
    }
    const req = {
      query: {},
      params: { id: 3 },
      body: updateCat,
    }
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn((data) => data),
    }
    getPayloadFromBearToken.mockReturnValue({ id: 1234567 })
    const result = await ctrl.update(req, res)
    expect(result).toBeDefined()
    expect(result).toHaveProperty('name', updateCat.name)
    expect(result).toHaveProperty('age', updateCat.age)
  })

  test('should be show delete cat by Id', async () => {
    const req = {
      query: {},
      params: { id: 3 },
    }
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn((data) => data),
    }
    const result = await ctrl.remove(req, res)
    expect(result).toBeDefined()
    expect(result).toHaveProperty('name')
    expect(result).toHaveProperty('age')
  })
})
