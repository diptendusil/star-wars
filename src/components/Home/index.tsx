/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useMemo, useState } from 'react'
import { Button, Stack } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import ListItem from '../ListItem'
import { useStore } from '../../store'
import { getAllCharacters } from '../../utils/fetchUtils'
import './index.scss'

const Home = () => {
  const {
    characterCount,
    characters,
    updateCharacterCount,
    addToCharacterList,
  } = useStore((state) => ({
    characterCount: state.characterCount,
    characters: state.characters,
    updateCharacterCount: state.updateCharacterCount,
    addToCharacterList: state.addToCharacterList,
  }))

  const [page, setPage] = useState(1)
  const [maxPage, setMaxPage] = useState(1)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (!characters || characters.length <= ((page - 1) * 10)) {
      setIsLoading(true)
      getAllCharacters(page).then((res) => {
        if (characterCount === 0) {
          updateCharacterCount(res.count)
          if (Math.trunc(res.count % 10) === 0) setMaxPage(Math.trunc(res.count / 10))
          else setMaxPage(Math.trunc(res.count / 10) + 1)
        }
        addToCharacterList(res.results)
        setIsLoading(false)
      }).catch(() => {
        console.log('Failed to load data')
        setIsLoading(false)
      })
    } else {
      if (Math.trunc(characterCount % 10) === 0) setMaxPage(Math.trunc(characterCount / 10))
      else setMaxPage(Math.trunc(characterCount / 10) + 1)
    }
  }, [page])

  const list = useMemo(() => {
    let listArr: JSX.Element[] = []
    const startIndex = (page - 1) * 10
    for (let index = startIndex; index < startIndex + 10; index++) {
      if (index === characters.length) break
      const char = characters[index]
      listArr = listArr.concat(
        <Link key={`${char.name}-${index}`} className="list-group-item list-group-item-action transluscentBody" to={`/character/${index + 1}`}>
          <ListItem name={char?.name} gender={char?.gender} homeworld={char?.homeworld} />
        </Link>
      )
    }
    return listArr
  }, [page, characterCount, isLoading])

  const placeholderList = useMemo(() => {
    let listArr: JSX.Element[] = []
    for (let index = 0; index < 7; index++) {
      listArr = listArr.concat(
        <a key={`placeholder-${index}`} className="list-group-item list-group-item-action transluscentBody" aria-disabled="true">
          <div className="placeholder-glow"><span className="placeholder col-3" /></div>
          <div className="placeholder-glow"><span className="placeholder col-2" /></div>
          <div className="placeholder-glow"><span className="placeholder col-4" /></div>
        </a>
      )
    }
    return listArr
  }, [])

  return (
    <>
      <div className="container">
        <p className="text-center fs-5 text-white">A long time ago in a galaxy far far away, these characters left behind their legacy</p>
      </div>
      <div className="container myList">
        <div className="list-group">
          <Stack gap={3}>
            {isLoading ? placeholderList : list}
          </Stack>
        </div>
      </div>
      <div className="container d-flex justify-content-end align-items-center mt-2 mb-2">
        <Button
          variant="outline-info"
          disabled={isLoading || page === 1}
          onClick={() => setPage(page - 1)}
        >
          {'<'}
        </Button>
        <span className="ms-2 me-2 text-white">{page} / {maxPage}</span>
        <Button
          variant="outline-info"
          disabled={isLoading || page === maxPage}
          onClick={() => setPage(page + 1)}
        >
          {'>'}
        </Button>
      </div>
    </>
  )
}

export default Home
