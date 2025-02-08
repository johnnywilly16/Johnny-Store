'use client'

import { createContext, useContext, useState, useEffect } from 'react'

type Product = {
  id: number
  name: string
  price: number
  description: string
  rating: number
}

type FavoritesContextType = {
  favorites: Product[]
  addToFavorites: (product: Product) => void
  removeFromFavorites: (productId: number) => void
  isFavorite: (productId: number) => boolean
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined)

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState<Product[]>([])

  useEffect(() => {
    const savedFavorites = localStorage.getItem('favorites')
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites))
  }, [favorites])

  const addToFavorites = (product: Product) => {
    if (!isFavorite(product.id)) {
      setFavorites(prev => [...prev, product])
    }
  }

  const removeFromFavorites = (productId: number) => {
    setFavorites(prev => prev.filter(item => item.id !== productId))
  }

  const isFavorite = (productId: number) => {
    return favorites.some(item => item.id === productId)
  }

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        addToFavorites,
        removeFromFavorites,
        isFavorite,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  )
}

export function useFavorites() {
  const context = useContext(FavoritesContext)
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider')
  }
  return context
} 