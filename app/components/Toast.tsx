'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { FaCheckCircle, FaTimes, FaExclamationCircle } from 'react-icons/fa'

type ToastProps = {
  message: string
  isVisible: boolean
  onClose: () => void
  variant?: 'success' | 'error'
}

export default function Toast({ message, isVisible, onClose, variant = 'success' }: ToastProps) {
  const bgColor = variant === 'success' ? 'bg-green-500' : 'bg-red-500'
  const hoverColor = variant === 'success' ? 'hover:text-green-200' : 'hover:text-red-200'
  const Icon = variant === 'success' ? FaCheckCircle : FaExclamationCircle

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="toast"
          initial={{ opacity: 0, y: 50, scale: 0.3 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.3 }}
          transition={{ 
            type: "spring",
            stiffness: 100,
            damping: 15,
            mass: 0.8
          }}
          className={`fixed bottom-4 right-4 ${bgColor} text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-3 z-50`}
        >
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Icon className="text-xl" />
          </motion.span>
          <motion.span 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="font-medium"
          >
            {message}
          </motion.span>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
            className={`ml-2 ${hoverColor} transition-colors`}
          >
            <FaTimes />
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  )
} 