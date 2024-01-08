/* eslint-disable no-use-before-define */
export interface IGetPokemon {
  name: string
  url: string
}

export interface IPokemon {
  name: string
  id: number
  types: IType[]
  sprites: ISprites
}

interface ISprites {
  other: {
    'official-artwork': {
      front_default: string
    }
    dream_world: {
      front_default: string
    }
  }
}

interface IType {
  slot: number
  type: {
    name: string
    url: string
  }
}
