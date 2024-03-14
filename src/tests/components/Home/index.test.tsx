import '@testing-library/jest-dom'
import { render, waitFor, fireEvent } from '@testing-library/react'
import { characters as characterArr, planets } from '../../constants'
import Home from '../../../components/Home'

jest.mock('react-router-dom', () => ({
  Link: ({ children }: { children: JSX.Element }) => <a>{children}</a>
}))

jest.mock('../../../utils/fetchUtils', () => ({
  getPlanet: jest.fn((id: string) => Promise.resolve<{ name: string }>({ name: (planets as dictionary)[id] })),
  getAllCharacters: jest.fn((page: number) => Promise.resolve<CharacterList>((characterArr as never)[page.toString()])),
}))

jest.mock('../../../store', () => ({
  useStore: jest.fn(() => {
    const planets = {}, characterCount = 11, characters: Character[] = characterArr['1'].results.concat(characterArr['2'].results)
    const addPlanet = () => null
    const updateCharacterCount = () => null
    const addToCharacterList = () => null
    return { planets, characterCount, characters, addPlanet, updateCharacterCount, addToCharacterList }
  })
}))

describe('Home', () => {
  test('Render component', async () => {
    const { queryByText } = render(<Home />)
    await waitFor(() => {
      expect(queryByText('Luke Skywalker')).toBeInTheDocument()
      expect(queryByText('Obi-Wan Kenobi')).toBeInTheDocument()
    })
  })

  test('Next page', async () => {
    const { queryByText, getByRole } = render(<Home />)
    await waitFor(() => {
      expect(queryByText('Luke Skywalker')).toBeInTheDocument()
    })
    fireEvent.click(getByRole('button', { name: '>' }))
    await waitFor(() => {
      expect(queryByText('Anakin Skywalker')).toBeInTheDocument()
    })
  })
})
