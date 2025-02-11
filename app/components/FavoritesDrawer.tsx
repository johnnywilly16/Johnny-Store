'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { FaTimes, FaShoppingCart, FaTrash, FaHeart } from 'react-icons/fa'
import { useFavorites } from '../contexts/FavoritesContext'
import { useCart } from '../contexts/CartContext'
import Toast from './Toast'
import { useState } from 'react'

type Product = {
  id: number
  name: string
  price: number
  description: string
  rating: number
}

type FavoritesDrawerProps = {
  isOpen: boolean
  onClose: () => void
}

export default function FavoritesDrawer({ isOpen, onClose }: FavoritesDrawerProps) {
  const { favorites, removeFromFavorites } = useFavorites()
  const { addToCart } = useCart()
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState('')
  const [toastVariant, setToastVariant] = useState<'success' | 'error'>('success')

  const handleAddToCart = (product: Product) => {
    addToCart(product)
    setToastMessage('Produto adicionado ao carrinho!')
    setToastVariant('success')
    setShowToast(true)
    setTimeout(() => setShowToast(false), 3000)
  }

  const handleRemoveFromFavorites = (productId: number) => {
    removeFromFavorites(productId)
    setToastMessage('Produto removido dos favoritos!')
    setToastVariant('error')
    setShowToast(true)
    setTimeout(() => setShowToast(false), 3000)
  }

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <>
          <motion.div
            key="drawer-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
            onClick={onClose}
          />
          <motion.div
            key="drawer-content"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ 
              duration: 0.3,
              ease: [0.32, 0.72, 0, 1]
            }}
            className="fixed top-28 sm:top-24 right-2 sm:right-4 w-[calc(100%-1rem)] sm:w-full max-w-[calc(100%-2rem)] sm:max-w-md bg-white dark:bg-dark-secondary rounded-2xl shadow-2xl z-50 overflow-hidden border border-gray-100 dark:border-dark-accent mx-2 sm:mx-0"
          >
            <div className="p-3 sm:p-4 border-b dark:border-dark-accent flex justify-between items-center bg-gray-50/80 dark:bg-dark-accent/80 backdrop-blur-sm">
              <div className="flex items-center gap-2">
                <FaHeart className="text-red-500" />
                <h2 className="text-base sm:text-lg font-bold text-gray-800 dark:text-dark-text">
                  Favoritos ({favorites.length})
                </h2>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 sm:p-2 hover:bg-gray-100 dark:hover:bg-dark-accent rounded-lg transition-colors"
              >
                <FaTimes className="text-gray-500 dark:text-gray-400" />
              </button>
            </div>

            <div className="max-h-[calc(100vh-16rem)] sm:max-h-[calc(100vh-14rem)] overflow-y-auto">
              {favorites.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center p-4 sm:p-6 text-center">
                  <FaHeart className="text-gray-300 dark:text-gray-600 text-4xl sm:text-6xl mb-4" />
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-dark-text mb-2">
                    Sua lista de favoritos está vazia
                  </h3>
                  <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400">
                    Adicione produtos aos favoritos para encontrá-los facilmente depois
                  </p>
                </div>
              ) : (
                <div className="p-4 sm:p-6 space-y-4 sm:space-y-4">
                  {favorites.map((product) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.2 }}
                      className="bg-white dark:bg-dark-accent rounded-xl p-4 sm:p-4 flex gap-4 sm:gap-4 shadow-md"
                    >
                      <div className="w-20 sm:w-20 h-20 sm:h-20 bg-gradient-to-br from-primary-100 to-secondary-100 dark:from-dark-accent dark:to-dark-primary rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm">
                        <FaShoppingCart className="text-2xl sm:text-2xl text-primary-600 dark:text-primary-400" />
                      </div>

                      <div className="flex-1 min-w-0 space-y-2">
                        <h3 className="font-bold text-base sm:text-base text-gray-800 dark:text-white truncate">
                          {product.name}
                        </h3>
                        <p className="text-sm sm:text-sm text-gray-600 dark:text-gray-300 line-clamp-1">
                          {product.description}
                        </p>
                        <div className="flex items-center justify-between pt-1">
                          <span className="text-base sm:text-base text-primary-600 dark:text-primary-400 font-bold">
                            R$ {product.price.toFixed(2)}
                          </span>
                          <div className="flex gap-3">
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => handleAddToCart(product)}
                              className="p-2 sm:p-2 bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 rounded-lg hover:bg-primary-200 dark:hover:bg-primary-900/50 transition-colors"
                            >
                              <FaShoppingCart className="text-sm sm:text-sm" />
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => handleRemoveFromFavorites(product.id)}
                              className="p-2 sm:p-2 bg-red-100 dark:bg-red-900/30 text-red-500 dark:text-red-400 rounded-lg hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors"
                            >
                              <FaTrash className="text-sm sm:text-sm" />
                            </motion.button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}

      <Toast
        message={toastMessage}
        isVisible={showToast}
        onClose={() => setShowToast(false)}
        variant={toastVariant}
      />
    </AnimatePresence>
  )
} 