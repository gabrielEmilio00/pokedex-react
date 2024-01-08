import { useEffect, useState } from 'react'
import { PokemonService } from '../services/pokemon.service'
import { IPokemon } from '../types/models/pokemon.interface'
import { Icon } from './Icon'

interface CardProps {
  name: string
}

const pokemonService = new PokemonService()

export function Card({ name }: CardProps) {
  const [pokemon, setPokemon] = useState<IPokemon | undefined>()

  useEffect(() => {
    ;(async function () {
      await pokemonService.getPokemonByName(name).then((response) => {
        setPokemon(response)
      })
    })()
  }, [name])

  return (
    <div className="mt-6 flex h-52 w-full flex-col items-center rounded-xl bg-white shadow-lg">
      <div className="relative h-1/5 w-full ">
        <div className="absolute -top-2/3 left-2/4 -translate-x-1/2">
          <img
            src={pokemon?.sprites?.other.dream_world.front_default}
            alt="pokemon"
            height={60}
            width={60}
          />
        </div>
      </div>
      <div className="z-10 mt-6">
        <p className="text-base font-bold text-gray-400">
          # {('000' + pokemon?.id).slice(-3)}
        </p>
      </div>
      <div className="mt-3">
        <span className="text-xl font-semibold capitalize">
          {pokemon?.name}
        </span>
      </div>
      <div className="mt-3 flex items-center justify-center gap-2">
        {pokemon?.types?.map((type) => {
          return (
            <Icon
              key={type?.type.name}
              text={type?.type.name}
              icon={`./images/icons/${type.type.name}.svg`}
              color={`var(--${type?.type.name})`}
            />
          )
        })}
      </div>
    </div>
  )
}
