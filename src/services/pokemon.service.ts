import { EHttpMethod } from '../types/enums/http.enum'
import { HttpService } from './http.service'

const api = new HttpService()

export class PokemonService {
  public getAllPokemons(limit: number = 20, offset: number = 0) {
    return api.request(
      EHttpMethod.GET,
      `/pokemon?limit=${limit}&offset=${offset}`,
    )
  }

  public getPokemonByName(name: string) {
    return api.request(EHttpMethod.GET, `/pokemon/${name}`)
  }
}
