import { useEffect, useState } from "react"
import { Spinner } from "react-bootstrap"
import { useStore } from "../../store"
import { getPlanet } from '../../utils/fetchUtils'
import './index.scss'

const ListItem = (props: Character) => {
  const { name, gender, homeworld } = props
  const { planets, addPlanet } = useStore((state) => ({
    planets: state.planets,
    addPlanet: state.addPlanet
  }))
  const [planet, setPlanet] = useState(<Spinner animation="border" size="sm" />)
  const planetUrlArr = homeworld.split('/')
  const id = planetUrlArr[planetUrlArr.length - 2]
  const planetObj: any = {}

  useEffect(() => {
    if (!id) setPlanet(<span>'N/A'</span>)
    else if (id && planets[id]) setPlanet(planets[id])
    else {
      getPlanet(id).then((res) => {
        planetObj[id] = res.name
        addPlanet(planetObj)
        setPlanet(<span>{res.name}</span>)
      })
    }
  }, [id])

  return (
    <div className="container-fluid listText">
      <div><b>Name:</b> {name}</div>
      <div><b>Gender:</b> {gender}</div>
      <div><b>Home World:</b> {planet}</div>
    </div>
  )
}

export default ListItem
