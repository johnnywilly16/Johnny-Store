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
  if (!isVisible) return null

  const bgColor = variant === 'success' ? 'bg-green-500' : 'bg-red-500'
  const hoverColor = variant === 'success' ? 'hover:text-green-200' : 'hover:text-red-200'
  const Icon = variant === 'success' ? FaCheckCircle : FaExclamationCircle

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        className={`fixed bottom-4 right-4 ${bgColor} text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2 z-50`}
      >
        <Icon className="text-xl" />
        <span>{message}</span>
        <button
          onClick={onClose}
          className={`ml-2 ${hoverColor} transition-colors`}
        >
          <FaTimes />
        </button>
      </motion.div>
    </AnimatePresence>
  )
} 