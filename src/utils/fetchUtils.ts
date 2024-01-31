let host = 'https://swapi.dev/api/'

export const updateHost = (newHost: string) => { host = newHost }

export const getAllCharacters = async (page = 1): Promise<CharacterList> => {
  try {
    const res = await fetch(`${host}people?page=${page}`)
    const data = await res.json()
    return data
  } catch (err) {
    console.log('Failed to retrieve')
    throw err
  }
}

export const getCharacter = async (id: number): Promise<Character> => {
  try {
    const res = await fetch(`${host}people/${id}`)
    const data = await res.json()
    return data
  } catch (err) {
    console.log('Failed to retrieve')
    throw err
  }
}

export const getPlanet = async (id: string | number): Promise<{name: string}> => {
  try {
    const res = await fetch(`${host}planets/${id}`)
    const data = await res.json()
    return data
  } catch (err) {
    console.log('Failed to retrieve')
    throw err
  }
}

export const getFilm = async (id: string | number): Promise<{title: string}> => {
  try {
    const res = await fetch(`${host}films/${id}`)
    const data = await res.json()
    return data
  } catch (err) {
    console.log('Failed to retrieve')
    throw err
  }
}
