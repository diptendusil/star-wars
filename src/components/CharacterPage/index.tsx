import { useEffect, useState } from 'react'
import { Button, Spinner } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { Link, useParams } from 'react-router-dom'
import { useStore } from '../../store'
import { getFilm } from '../../utils/fetchUtils'
import './index.scss'

const CharacterPage = () => {
  const { characters, movies, planets, addMovie, updateCharacterList } = useStore((state) => ({
    characters: state.characters,
    movies: state.movies,
    planets: state.planets,
    addMovie: state.addMovie,
    updateCharacterList: state.updateCharacterList
  }))
  const [ localMovies, setLocalMovies ] = useState<string[]>([])
  const [ isLoading, setIsLoading ] = useState(false)
  const [ isEditing, setIsEditing ] = useState(false)
  const buttonText = isEditing ? 'done' : 'edit'
  const { id = '1' } = useParams()
  const {
    name = '',
    films = [],
    homeworld,
    ...character
  } = characters[(+id) - 1] || {}
  const planetId = homeworld.split('/')[homeworld.split('/').length - 2]
  const tempFilms: any = {}
  const { register, handleSubmit, setValue, formState: { errors } } = useForm({
    defaultValues: {
      gender: character.gender,
      height: character.height,
    }
  })

  useEffect(() => {
    const evalArr = async () => {
      const tempArr: string[] = []
      setIsLoading(true)
      for (const film of films) {
        const filmId = film.split('/')[film.split('/').length - 2]
        if (!filmId) tempArr.push('Invalid movie!')
        else if (filmId && movies[filmId]) tempArr.push(movies[filmId])
        else {
          const res = await getFilm(filmId)
          tempFilms[filmId] = res.title
          addMovie(tempFilms)
          tempArr.push(res.title)
        }
      }
      setLocalMovies(tempArr)
      setIsLoading(false)
    }
    evalArr()
  }, [id])

  const onSubmit = (d: { gender: string, height?: string }) => {
    if (isEditing) {
      const charactersClone = [ ...characters ]
      charactersClone[(+id) - 1] = {
        name,
        films,
        homeworld,
        ...character,
        gender: d.gender,
        height: d.height,
      }
      updateCharacterList(charactersClone)
    }
    setIsEditing(!isEditing)
  }

  const cancel = () => {
    setValue("gender", character.gender)
    setValue("height", character.height)
    setIsEditing(false)
  }

  return (
    <>
      <div className="container">
        <span>
          <p className="text-center fs-5 text-white">
            {name}
            <Button onClick={handleSubmit(onSubmit)} className="transparentBody ms-2" size="sm">
              <span className="material-symbols-outlined">{buttonText}</span>
            </Button>
            {isEditing && (
              <Button onClick={cancel} className="transparentBody ms-2" size="sm">
                <span className="material-symbols-outlined">close</span>
              </Button>
            )}
          </p>
        </span>
      </div>
      <div className="container myContainer d-flex justify-content-center align-items-center">
        <form>
          <div className="container-fluid row d-flex justify-content-center align-items-center">
            <div className="row col-md-4 d-flex justify-content-center align-items-center mt-2 mb-4">
              <div className="d-flex justify-content-center align-items-center col-xs-12">
                <label htmlFor="name" id="nameLabel"><b>Name</b></label>
              </div>
              <div className="d-flex justify-content-center align-items-center col-xs-12">
                <span>{name}</span>
              </div>
            </div>
            <div className="row col-md-4 d-flex justify-content-center align-items-center mb-4">
              <div className="d-flex justify-content-center align-items-center col-xs-12">
                <label htmlFor="gender" id="genderLabel"><b>Gender</b></label>
              </div>
              <div className="d-flex justify-content-center align-items-center col-xs-12">
                {isEditing ? (
                  <input
                    className={`form-control form-control-sm ${errors.gender ? 'is-invalid' : 'is-valid'}`}
                    id="gender"
                    { ...register('gender', { required: true }) }
                  />
                ): (
                  <span>{character?.gender}</span>
                )}
              </div>
            </div>
            <div className="row col-md-4 d-flex justify-content-center align-items-center mb-4">
              <div className="d-flex justify-content-center align-items-center col-xs-12">
                <label htmlFor="height" id="heightLabel"><b>Height</b></label>
              </div>
              <div className="d-flex justify-content-center align-items-center col-xs-12">
                {isEditing ? (
                  <input
                    className={`form-control form-control-sm ${errors.height ? 'is-invalid' : 'is-valid'}`}
                    type="number" id="height"
                    { ...register('height', { required: true }) }
                  />
                ): (
                  <span>{character?.height}</span>
                )}
              </div>
            </div>
            <div className="row col-md-4 d-flex justify-content-center align-items-center mb-4">
              <div className="d-flex justify-content-center align-items-center col-xs-12">
                <label htmlFor="homeworld" id="homeworldLabel"><b>Home World</b></label>
              </div>
              <div className="d-flex justify-content-center align-items-center col-xs-12">
                <span>{planets[planetId]}</span>
              </div>
            </div>
            <div className="row col-md-4 d-flex justify-content-center align-items-center mb-4">
              <div className="d-flex justify-content-center align-items-center col-xs-12">
                <label htmlFor="eyeColor" id="eyeColorLabel"><b>Eye Color</b></label>
              </div>
              <div className="d-flex justify-content-center align-items-center col-xs-12">
                <span>{character?.eye_color}</span>
              </div>
            </div>
            <div className="row col-md-4 d-flex justify-content-center align-items-center mb-4">
              <div className="d-flex justify-content-center align-items-center col-xs-12">
                <label htmlFor="hairColor" id="hairColorLabel"><b>Hair Color</b></label>
              </div>
              <div className="d-flex justify-content-center align-items-center col-xs-12">
                <span>{character?.hair_color}</span>
              </div>
            </div>
            <div className="row col-md-4 d-flex justify-content-center align-items-center mb-4">
              <div className="d-flex justify-content-center align-items-center col-xs-12">
                <label><b>List of movies</b></label>
              </div>
              {!isLoading ? localMovies.map((film) => {
                return (
                  <div className="d-flex justify-content-center align-items-center col-xs-12">
                    <span>{film}</span>
                  </div>
                )
              }) : (
                <Spinner animation="border" />
              )}
            </div>
          </div>
        </form>
      </div>
      <div className="container d-flex justify-content-center align-items-center mt-2 mb-2">
        <Link className="btn btn-info fs-5" to="/home">Go Back</Link>
      </div>
    </>
  )
}

export default CharacterPage
