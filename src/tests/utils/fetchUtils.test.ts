import {
  getAllCharacters,
  getCharacter,
  getFilm,
  getPlanet,
} from '../../utils/fetchUtils'

describe('Fetch utils', () => {
  beforeAll(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ count: 50, name: 'Dummy', title: 'Movie' }),
      }),
    ) as jest.Mock
  })

  test('getAllCharacters', async () => {
    const res = await getAllCharacters(2)
    expect(res.count).toBe(50)
    expect(fetch).toHaveBeenCalled()
  })

  test('getCharacter', async () => {
    const res = await getCharacter(2)
    expect(res.name).toBe('Dummy')
    expect(fetch).toHaveBeenCalled()
  })

  test('getFilm', async () => {
    const res = await getFilm(2)
    expect(res.title).toBe('Movie')
    expect(fetch).toHaveBeenCalled()
  })

  test('getPlanet', async () => {
    const res = await getPlanet(2)
    expect(res.name).toBe('Dummy')
    expect(fetch).toHaveBeenCalled()
  })
})
