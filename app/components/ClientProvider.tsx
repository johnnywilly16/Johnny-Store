'use client'

import { ThemeProvider } from 'next-themes'
import { CartProvider } from '../contexts/CartContext'
import { FavoritesProvider } from '../contexts/FavoritesContext'

type ClientProviderProps = {
  children: React.ReactNode
}

export default function ClientProvider({ children }: ClientProviderProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <CartProvider>
        <FavoritesProvider>
          {children}
        </FavoritesProvider>
      </CartProvider>
    </ThemeProvider>
  )
} 