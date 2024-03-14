import '@testing-library/jest-dom'
import { render, waitFor } from '@testing-library/react'
import { characters as characterArr, planets, films } from '../../constants'
import CharacterPage from '../../../components/CharacterPage'

jest.mock('react-router-dom', () => ({
  useParams: jest.fn(() => ({ id: 11 })),
  Link: ({ children }: { children: JSX.Element }) => <a>{children}</a>
}))

jest.mock('../../../utils/fetchUtils', () => ({
  getPlanet: jest.fn((id: string) => Promise.resolve<{ name: string }>({ name: (planets as dictionary)[id] })),
  getFilm: jest.fn((id: string) => Promise.resolve<{ title: string }>({ title: (films as dictionary)[id] })),
  getAllCharacters: jest.fn((page: number) => Promise.resolve<CharacterList>((characterArr as never)[page.toString()])),
}))

jest.mock('../../../store', () => ({
  useStore: jest.fn(() => {
    const characters: Character[] = characterArr['1'].results.concat(characterArr['2'].results), movies = {}
    const updateCharacterList = () => null
    const addMovie = () => null
    return { planets, characters, movies, addMovie, updateCharacterList }
  })
}))

describe('CharacterPage', () => {
  test('Render component', async () => {
    const { queryByText, queryAllByText } = render(<CharacterPage />)
    expect(queryAllByText('Anakin Skywalker')).toHaveLength(2)
    expect(queryByText('Planet1')).toBeInTheDocument()
      await waitFor(() => {
        expect(queryByText('FilmD')).toBeInTheDocument()
        expect(queryByText('FilmE')).toBeInTheDocument()
        expect(queryByText('FilmF')).toBeInTheDocument()
      })
  })
})
