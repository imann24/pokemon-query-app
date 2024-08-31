import React from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import PokemonSearch from './components/PokemonSearch'

const queryClient = new QueryClient()

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <h1 className="text-3xl mb-5">Pokémon Query App</h1>
      <p>Type a Pokémon's name:</p>
      <PokemonSearch />
    </QueryClientProvider>
  )
}
