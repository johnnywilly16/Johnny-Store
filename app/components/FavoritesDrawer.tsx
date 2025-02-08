'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { FaTimes, FaShoppingCart, FaTrash, FaHeart } from 'react-icons/fa'
import { useFavorites } from '../contexts/FavoritesContext'
import { useCart } from '../contexts/CartContext'
import Toast from './Toast'
import { useState } from 'react'
import { products } from '../data/products'

type Product = typeof products[0]

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
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 z-40"
            onClick={onClose}
          />
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed top-24 right-4 w-full max-w-md bg-white dark:bg-dark-secondary rounded-2xl shadow-2xl z-50 overflow-hidden border border-gray-100 dark:border-dark-accent"
          >
            <div className="p-4 border-b dark:border-dark-accent flex justify-between items-center bg-gray-50/80 dark:bg-dark-accent/80 backdrop-blur-sm">
              <div className="flex items-center gap-2">
                <FaHeart className="text-red-500" />
                <h2 className="text-lg font-bold text-gray-800 dark:text-dark-text">
                  Favoritos ({favorites.length})
                </h2>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 dark:hover:bg-dark-accent rounded-lg transition-colors"
              >
                <FaTimes className="text-gray-500 dark:text-gray-400" />
              </button>
            </div>

            <div className="max-h-[calc(100vh-14rem)] overflow-y-auto">
              {favorites.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center p-6 text-center">
                  <FaHeart className="text-gray-300 dark:text-gray-600 text-6xl mb-4" />
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-dark-text mb-2">
                    Sua lista de favoritos está vazia
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Adicione produtos aos favoritos para encontrá-los facilmente depois
                  </p>
                </div>
              ) : (
                <div className="p-6 space-y-4">
                  {favorites.map((product) => (
                    <div
                      key={product.id}
                      className="bg-gray-50 dark:bg-dark-accent rounded-xl p-4 flex gap-4"
                    >
                      <div className="w-20 h-20 bg-gradient-to-br from-primary-100 to-secondary-100 dark:from-dark-accent dark:to-dark-primary rounded-lg flex items-center justify-center flex-shrink-0">
                        <FaShoppingCart className="text-2xl text-primary-600 dark:text-primary-400" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-800 dark:text-dark-text truncate">
                          {product.name}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-2 line-clamp-1">
                          {product.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-primary-600 dark:text-primary-400 font-semibold">
                            R$ {product.price.toFixed(2)}
                          </span>
                          <div className="flex gap-2">
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => handleAddToCart(product)}
                              className="p-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                            >
                              <FaShoppingCart className="text-sm" />
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => handleRemoveFromFavorites(product.id)}
                              className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                            >
                              <FaTrash className="text-sm" />
                            </motion.button>
                          </div>
                        </div>
                      </div>
                    </div>
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