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
    <AnimatePresence mode="wait">
      {isOpen && (
        <>
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
            <div className="p-3 sm:p-4 border-b dark:border-dark-accent flex justify-between items-center bg-gray-50/80 dark:bg-dark-accent/80">
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

            <div className="max-h-[calc(100vh-16rem)] sm:max-h-[calc(100vh-14rem)] overflow-y-auto p-4">
              {items.length === 0 ? (
                <p className="text-center text-sm sm:text-base text-gray-500 dark:text-gray-400">
                  Seu carrinho está vazio
                </p>
              ) : (
                <div className="space-y-4 sm:space-y-4">
                  <AnimatePresence>
                    {items.map((item, index) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="flex items-center gap-4 sm:gap-4 bg-white dark:bg-dark-accent p-4 sm:p-4 rounded-xl shadow-md"
                      >
                        <div className="flex-1 space-y-2">
                          <h3 className="font-bold text-base sm:text-base text-gray-800 dark:text-white">
                            {item.name}
                          </h3>
                          <p className="text-base sm:text-base text-primary-600 dark:text-primary-400 font-bold">
                            R$ {item.price.toFixed(2).replace('.', ',')}
                          </p>
                        </div>

                        <div className="flex items-center gap-3">
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                            className="p-2 sm:p-2 bg-gray-100 dark:bg-dark-primary text-gray-700 dark:text-white hover:bg-gray-200 dark:hover:bg-dark-accent rounded-lg transition-colors"
                          >
                            <FaMinus className="text-sm sm:text-sm" />
                          </motion.button>
                          <motion.span
                            key={item.quantity}
                            initial={{ scale: 1.2 }}
                            animate={{ scale: 1 }}
                            className="w-8 sm:w-8 text-center text-base sm:text-base font-bold text-gray-800 dark:text-white"
                          >
                            {item.quantity}
                          </motion.span>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                            className="p-2 sm:p-2 bg-gray-100 dark:bg-dark-primary text-gray-700 dark:text-white hover:bg-gray-200 dark:hover:bg-dark-accent rounded-lg transition-colors"
                          >
                            <FaPlus className="text-sm sm:text-sm" />
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => handleRemoveFromCart(item.id)}
                            className="p-2 sm:p-2 bg-red-100 dark:bg-red-900/30 text-red-500 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-900/50 rounded-lg transition-colors"
                          >
                            <FaTrash className="text-sm sm:text-sm" />
                          </motion.button>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </div>

            <div className="border-t dark:border-dark-accent p-4">
              <div className="flex justify-between items-center mb-4">
                <span className="text-base sm:text-lg font-semibold text-gray-800 dark:text-dark-text">
                  Total
                </span>
                <span className="text-xl sm:text-2xl font-bold text-primary-600 dark:text-primary-400">
                  R$ {total.toFixed(2).replace('.', ',')}
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