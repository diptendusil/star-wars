type Character = {
  name: string
  gender: string
  homeworld: string
  height?: string
  hair_color?: string
  eye_color?: string
  skin_color?: string
  films?: string[]
}

type CharacterList = {
  count: number
  next: string
  previous: string
  results: Character[]
}

type dictionary = { [key: string | number]: string }
