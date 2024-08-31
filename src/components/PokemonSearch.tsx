import React, { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import PokeballIcon from './assets/pokeball.png'

function uppercase(str: string) {
  if (!str) {
    return ''
  }
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export default function PokemonSearch() {
  const [pokemonName, setPokemonName] = useState('')
  const { data, isLoading } = useQuery({
    queryKey: ['pokemon', pokemonName],
    queryFn: async ({ queryKey }) => {
      const [, name] = queryKey
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name?.toLowerCase()}`)
      if (!response.ok) {
        return {
          name: 'not found',
          match: false,
        }
      }
      const data = await response.json()
      console.log('response', data)
      return {
        ...data,
        match: true,
      }
    },
    // assume the data will never change:
    staleTime: Infinity,
    gcTime: Infinity,
  })

  return (
    <div>
      <input
        className="outline"
        value={pokemonName}
        onChange={(e) => setPokemonName(e.target.value)}
      />
      {isLoading && (
        <div>
          <img
            src={PokeballIcon}
            alt="loading"
            width={32}
            className="animate-bounce mt-2"
          />
        </div>
      )}
      {!isLoading && (
        data?.match
          ? (
              <div>
                <img src={data?.sprites?.front_default} alt={data?.name} />
                <h2 className="-mt-5 text-2xl">{uppercase(data?.name)}</h2>
              </div>
            )
          : (
            <p className="mt-2"><i>not found</i></p>
          )
      )}
    </div>
  )
}
