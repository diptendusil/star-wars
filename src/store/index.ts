import { create } from 'zustand'

interface StoreType {
  characterCount: number
  characters: Character[]
  planets: dictionary
  movies: dictionary
  updateCharacterCount: (count: number) => void
  updateCharacterList: (characters: Character[]) => void
  addToCharacterList: (characters: Character[]) => void
  addPlanet: (planet: dictionary) => void
  addMovie: (movie: dictionary) => void
}

export const useStore = create<StoreType>((set) => ({
  characterCount: 0,
  characters: [],
  planets: {},
  movies: {},
  updateCharacterCount: (count) => set({ characterCount: count }),
  updateCharacterList: (characters: Character[]) => set({ characters: [ ...characters ] }),
  addToCharacterList: (characters: Character[]) => set((state) => ({ characters: state.characters.concat(characters)})),
  addPlanet: (planet: dictionary) => set((state) => ({ planets: { ...state.planets, ...planet } })),
  addMovie: (movie: dictionary) => set((state) => ({ movies: { ...state.movies, ...movie } })),
}))