'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { FaTimes, FaTrash, FaPlus, FaMinus } from 'react-icons/fa'
import { useCart } from '../contexts/CartContext'
import Toast from './Toast'
import { useState } from 'react'

type CartDrawerProps = {
  isOpen: boolean
  onClose: () => void
}

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { items, removeFromCart, updateQuantity, total } = useCart()
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState('')
  const [toastVariant, setToastVariant] = useState<'success' | 'error'>('success')

  const handleRemoveFromCart = (itemId: number) => {
    removeFromCart(itemId)
    setToastMessage('Produto removido do carrinho!')
    setToastVariant('error')
    setShowToast(true)
    setTimeout(() => setShowToast(false), 3000)
  }

  const handleUpdateQuantity = (itemId: number, newQuantity: number) => {
    if (newQuantity < 1) {
      handleRemoveFromCart(itemId)
      return
    }
    updateQuantity(itemId, newQuantity)
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
            className="fixed top-16 right-2 sm:right-4 mt-1 w-[calc(100%-1rem)] sm:w-full max-w-[calc(100%-2rem)] sm:max-w-md bg-white dark:bg-dark-secondary rounded-2xl shadow-2xl z-50 overflow-hidden border border-gray-100 dark:border-dark-accent mx-2 sm:mx-0"
          >
            {/* Header */}
            <div className="p-3 sm:p-4 border-b dark:border-dark-accent flex justify-between items-center bg-gray-50/80 dark:bg-dark-accent/80 backdrop-blur-sm">
              <h2 className="text-base sm:text-lg font-bold text-gray-800 dark:text-dark-text">
                Carrinho ({items.length})
              </h2>
              <button
                onClick={onClose}
                className="p-1.5 sm:p-2 hover:bg-gray-100 dark:hover:bg-dark-accent rounded-lg transition-colors"
              >
                <FaTimes className="text-gray-500 dark:text-gray-400" />
              </button>
            </div>

            {/* Content */}
            <div className="max-h-[calc(100vh-16rem)] sm:max-h-[calc(100vh-14rem)] overflow-y-auto p-4">
              {items.length === 0 ? (
                <p className="text-center text-sm sm:text-base text-gray-500 dark:text-gray-400">
                  Seu carrinho está vazio
                </p>
              ) : (
                <div className="space-y-3 sm:space-y-4">
                  {items.map(item => (
                    <div
                      key={item.id}
                      className="flex items-center gap-3 sm:gap-4 bg-gray-50 dark:bg-dark-accent p-3 sm:p-4 rounded-lg"
                    >
                      <div className="flex-1">
                        <h3 className="font-semibold text-sm sm:text-base text-gray-800 dark:text-dark-text">
                          {item.name}
                        </h3>
                        <p className="text-sm sm:text-base text-primary-600 dark:text-primary-400 font-medium">
                          R$ {item.price.toFixed(2)}
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                          className="p-1 sm:p-1.5 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                        >
                          <FaMinus className="text-xs sm:text-sm" />
                        </button>
                        <span className="w-6 sm:w-8 text-center text-sm sm:text-base text-gray-800 dark:text-dark-text">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                          className="p-1 sm:p-1.5 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                        >
                          <FaPlus className="text-xs sm:text-sm" />
                        </button>
                        <button
                          onClick={() => handleRemoveFromCart(item.id)}
                          className="p-1.5 sm:p-2 text-red-500 hover:text-red-700"
                        >
                          <FaTrash className="text-xs sm:text-sm" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="border-t dark:border-dark-accent p-4">
              <div className="flex justify-between items-center mb-4">
                <span className="text-base sm:text-lg font-semibold text-gray-800 dark:text-dark-text">
                  Total
                </span>
                <span className="text-xl sm:text-2xl font-bold text-primary-600 dark:text-primary-400">
                  R$ {total.toFixed(2)}
                </span>
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-2.5 sm:py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-colors text-sm sm:text-base"
              >
                Finalizar Compra
              </motion.button>
            </div>
          </motion.div>

          <Toast
            message={toastMessage}
            isVisible={showToast}
            onClose={() => setShowToast(false)}
            variant={toastVariant}
          />
        </>
      )}
    </AnimatePresence>
  )
} 