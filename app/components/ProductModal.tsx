'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { FaTimes, FaShoppingCart, FaStar, FaHeart, FaTruck, FaShieldAlt, FaUndo, FaCheck } from 'react-icons/fa'
import { useCart } from '../contexts/CartContext'
import { useFavorites } from '../contexts/FavoritesContext'
import { useState, useEffect } from 'react'
import Toast from './Toast'

type ProductModalProps = {
  isOpen: boolean
  onClose: () => void
  product: {
    id: number
    name: string
    price: number
    rating: number
    description: string
  }
}

export default function ProductModal({ isOpen, onClose, product }: ProductModalProps) {
  const { addToCart, items } = useCart()
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites()
  const [isInCart, setIsInCart] = useState(false)
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState('')
  const [toastVariant, setToastVariant] = useState<'success' | 'error'>('success')
  const productIsFavorite = isFavorite(product.id)

  useEffect(() => {
    const productInCart = items.some(item => item.id === product.id)
    setIsInCart(productInCart)
  }, [items, product.id])

  const handleAddToCart = () => {
    if (!isInCart) {
      addToCart(product)
      setIsInCart(true)
      setToastMessage('Produto adicionado ao carrinho!')
      setToastVariant('success')
      setShowToast(true)
      setTimeout(() => setShowToast(false), 3000)
    }
  }

  const handleFavoriteClick = () => {
    if (productIsFavorite) {
      removeFromFavorites(product.id)
      setToastMessage('Produto removido dos favoritos!')
      setToastVariant('error')
    } else {
      addToFavorites(product)
      setToastMessage('Produto adicionado aos favoritos!')
      setToastVariant('success')
    }
    setShowToast(true)
    setTimeout(() => setShowToast(false), 3000)
  }

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <>
          <motion.div
            key="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50"
            onClick={onClose}
          />
          
          <motion.div
            key="modal-container"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={onClose}
          >
            <motion.div
              key="modal-content"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
              className="bg-white dark:bg-dark-secondary w-full max-w-2xl rounded-2xl shadow-2xl relative overflow-hidden border border-gray-100 dark:border-dark-accent"
              onClick={e => e.stopPropagation()}
            >
              <div className="p-4 border-b dark:border-dark-accent flex justify-between items-center bg-gray-50/80 dark:bg-dark-accent/80 backdrop-blur-sm">
                <h2 className="text-lg font-bold text-gray-800 dark:text-dark-text">
                  Detalhes do Produto
                </h2>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-dark-accent rounded-lg transition-colors"
                >
                  <FaTimes className="text-gray-500 dark:text-gray-400" />
                </button>
              </div>

              <div className="max-h-[calc(100vh-14rem)] overflow-y-auto">
                <div className="grid sm:grid-cols-2 gap-6 sm:gap-8 p-4 sm:p-6">
                  <div className="space-y-4 sm:space-y-6">
                    <div className="relative group">
                      <div className="w-full aspect-square rounded-xl bg-gradient-to-br from-primary-100 to-secondary-100 dark:from-dark-accent dark:to-dark-primary flex items-center justify-center overflow-hidden">
                        <FaShoppingCart className="text-5xl sm:text-7xl text-primary-600 dark:text-primary-400 group-hover:scale-110 transition-transform" />
                      </div>
                      <button
                        onClick={handleFavoriteClick}
                        className={`absolute top-4 right-4 p-2 sm:p-3 rounded-full shadow-soft transition-all duration-200 hover:scale-110 active:scale-95 ${
                          productIsFavorite
                            ? 'bg-red-500 text-white'
                            : 'bg-white dark:bg-dark-accent text-gray-400 hover:text-red-500'
                        }`}
                      >
                        <FaHeart className="text-lg sm:text-xl" />
                      </button>
                    </div>

                    <div className="grid grid-cols-3 gap-2 sm:gap-4">
                      <div className="text-center">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-primary-100 dark:bg-dark-accent flex items-center justify-center mx-auto mb-2">
                          <FaTruck className="text-lg sm:text-xl text-primary-600 dark:text-primary-400" />
                        </div>
                        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Entrega Grátis</p>
                      </div>
                      <div className="text-center">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-primary-100 dark:bg-dark-accent flex items-center justify-center mx-auto mb-2">
                          <FaShieldAlt className="text-lg sm:text-xl text-primary-600 dark:text-primary-400" />
                        </div>
                        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Garantia</p>
                      </div>
                      <div className="text-center">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-primary-100 dark:bg-dark-accent flex items-center justify-center mx-auto mb-2">
                          <FaUndo className="text-lg sm:text-xl text-primary-600 dark:text-primary-400" />
                        </div>
                        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">30 Dias Retorno</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4 sm:space-y-6">
                    <div>
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-dark-text">{product.name}</h3>
                        <div className="flex items-center gap-1 bg-yellow-100 dark:bg-yellow-900/30 px-2 sm:px-3 py-1 rounded-full">
                          <FaStar className="text-yellow-400" />
                          <span className="text-sm sm:text-base text-yellow-700 dark:text-yellow-400 font-medium">{product.rating}</span>
                        </div>
                      </div>

                      <div className="bg-primary-50 dark:bg-dark-accent rounded-xl p-4 mb-4 sm:mb-6">
                        <p className="text-2xl sm:text-3xl font-bold text-primary-600 dark:text-primary-400">
                          R$ {product.price.toFixed(2).replace('.', ',')}
                        </p>
                        <p className="text-xs sm:text-sm text-primary-600/70 dark:text-primary-400/70 mt-1">
                          Em até 12x sem juros
                        </p>
                      </div>

                      <div className="prose dark:prose-invert max-w-none mb-6 sm:mb-8">
                        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">{product.description}</p>
                      </div>
                    </div>

                    <button
                      onClick={handleAddToCart}
                      disabled={isInCart}
                      className={`w-full py-3 sm:py-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] ${
                        isInCart
                          ? 'bg-green-500 text-white cursor-default'
                          : 'bg-primary-600 dark:bg-primary-500 text-white hover:bg-primary-700 dark:hover:bg-primary-600'
                      }`}
                    >
                      {isInCart ? (
                        <>
                          <FaCheck />
                          Adicionado ao Carrinho
                        </>
                      ) : (
                        <>
                          <FaShoppingCart />
                          Adicionar ao Carrinho
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}

      <AnimatePresence>
        {showToast && (
          <Toast
            message={toastMessage}
            isVisible={showToast}
            onClose={() => setShowToast(false)}
            variant={toastVariant}
          />
        )}
      </AnimatePresence>
    </AnimatePresence>
  )
} 