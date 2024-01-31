import { create } from 'zustand'

interface StoreType {
  characterCount: number
  characters: Character[]
  planets: any
  movies: any
  updateCharacterCount: (count: number) => void
  updateCharacterList: (characters: Character[]) => void
  addToCharacterList: (characters: Character[]) => void
  addPlanet: (planet: any) => void
  addMovie: (movie: any) => void
}

export const useStore = create<StoreType>((set) => ({
  characterCount: 0,
  characters: [],
  planets: {},
  movies: {},
  updateCharacterCount: (count) => set({ characterCount: count }),
  updateCharacterList: (characters: Character[]) => set({ characters: [ ...characters ] }),
  addToCharacterList: (characters: Character[]) => set((state) => ({ characters: state.characters.concat(characters)})),
  addPlanet: (planet: any) => set((state) => ({ planets: { ...state.planets, ...planet } })),
  addMovie: (movie: any) => set((state) => ({ movies: { ...state.movies, ...movie } })),
}))