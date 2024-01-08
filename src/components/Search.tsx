import { useEffect, useState } from 'react'

interface SearchProps {
  getPokemonByName: (name: string) => Promise<void>
}

export function Search({ getPokemonByName }: SearchProps) {
  const [pokemonName, setPokemonName] = useState<string>('')
  const [delaySearch, setDelaySearch] = useState(0)

  useEffect(() => {
    if (delaySearch !== 0) {
      clearTimeout(delaySearch)
    }

    const timeOutId = setTimeout(async () => {
      await getPokemonByName(pokemonName)
    }, 1000)

    setDelaySearch(timeOutId)
  }, [pokemonName])

  return (
    <div className="relative mt-6 flex h-14 w-4/6 overflow-hidden rounded-lg bg-white shadow-lg">
      <input
        type="text"
        placeholder="Search your Pokemon!"
        className="w-full rounded-lg p-5 font-medium"
        onChange={(e) => setPokemonName(e.target.value)}
      />
      <button className="absolute right-0 mr-3 mt-2 h-10 w-10 rounded-md bg-[#ff5350] shadow-xl">
        <img
          src="./images/pokeball.png"
          alt="Search button"
          className="pointer-events-none"
        />
      </button>
    </div>
  )
}
