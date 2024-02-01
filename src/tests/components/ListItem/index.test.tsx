import '@testing-library/jest-dom'
import { render, waitFor } from '@testing-library/react'
import { planets } from '../../constants'
import ListItem from '../../../components/ListItem'

jest.mock('../../../utils/fetchUtils', () => ({
  getPlanet: jest.fn((id: string) => Promise.resolve<{ name: string }>({ name: (planets as any)[id] }))
}))

jest.mock('../../../store', () => ({
  useStore: jest.fn(() => {
    let planets = {}
    const addPlanet = (planet: any) => planets = { ...planets, ...planet }
    return { planets, addPlanet }
  })
}))

describe('ListItem', () => {
  test('Render component', async () => {
    const { queryByText } = render(<ListItem name="Luke" gender="Male" homeworld="https://swapi.dev/api/planets/1/" />)
    expect(queryByText('Luke')).toBeInTheDocument()
    expect(queryByText('Male')).toBeInTheDocument()
    await waitFor(() => {
      expect(queryByText('Planet1')).toBeInTheDocument()
    })
  })
})
