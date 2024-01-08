import { Suspense, lazy, useCallback, useEffect, useState } from 'react'
import { Card } from '../components/Card'
import { Header } from '../components/Header'
import { Search } from '../components/Search'
import { PokemonService } from '../services/pokemon.service'
import { IGetPokemon } from '../types/models/pokemon.interface'

const Pagination = lazy(() => import('../components/Pagination'))

const pokemonService = new PokemonService()
const PageSize: number = 12
let totalCount: number

export function Home() {
  const [pokemons, setPokemons] = useState<IGetPokemon[]>([
    { name: '', url: '' },
  ])
  const [currentPage, setCurrentPage] = useState(1)
  const [displayPagination, setDisplayPagination] = useState<boolean>(true)

  const getPokemonByName = useCallback(async (pokemonName: string) => {
    pokemonName = pokemonName.toLowerCase()

    if (pokemonName === '') {
      setDisplayPagination(true)
      setCurrentPage(1)
      return getAllPokemon()
    }

    await pokemonService
      .getPokemonByName(pokemonName)
      .then((response) => {
        setPokemons([response])
        setDisplayPagination(false)
      })
      .catch((err) => {
        console.log(err)
        console.log('err')
      })
  }, [])

  const getAllPokemon = useCallback(async () => {
    const response = await pokemonService.getAllPokemons(
      PageSize,
      (currentPage - 1) * PageSize,
    )
    totalCount = response?.count
    setPokemons(response.results)
  }, [currentPage])

  useEffect(() => {
    getAllPokemon()
  }, [currentPage, getAllPokemon])

  return (
    <div className="h-screen w-screen overflow-x-hidden">
      <div className="px-60">
        <Header />
        <Search getPokemonByName={getPokemonByName} />
        <div className="mt-8 grid w-4/6 grid-cols-3 gap-4">
          {pokemons?.map((pokemon) => {
            return <Card key={pokemon.name} name={pokemon.name} />
          })}
        </div>
        <div>
          <Suspense fallback={<div>Loading...</div>}>
            {displayPagination && (
              <Pagination
                currentPage={currentPage}
                totalCount={totalCount}
                pageSize={PageSize}
                onPageChange={(page) => setCurrentPage(page)}
              />
            )}
          </Suspense>
        </div>
      </div>
    </div>
  )
}
