'use client'

import { FaHome, FaShoppingBag, FaEnvelope, FaBars, FaSun, FaMoon, FaShoppingCart, FaHeart, FaTimes } from 'react-icons/fa'
import { useTheme } from 'next-themes'
import { useCart } from '../contexts/CartContext'
import { useFavorites } from '../contexts/FavoritesContext'
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import CartDrawer from './CartDrawer'
import FavoritesDrawer from './FavoritesDrawer'
import Link from 'next/link'

export default function Navbar() {
  const { theme, setTheme } = useTheme()
  const { itemCount } = useCart()
  const { favorites } = useFavorites()
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const mobileMenuItems = [
    { href: '/', icon: <FaHome className="text-xl" />, text: 'Início' },
    { href: '/produtos', icon: <FaShoppingBag className="text-xl" />, text: 'Produtos' },
    { href: '/contato', icon: <FaEnvelope className="text-xl" />, text: 'Contato' },
  ]

  if (!mounted) return null

  return (
    <>
      <nav className="bg-white/80 dark:bg-dark-secondary/80 backdrop-blur-md shadow-soft fixed w-full z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <motion.a 
              href="/" 
              className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-primary-600 to-secondary-500 bg-clip-text text-transparent"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Johnny Store
            </motion.a>
            
            <div className="hidden md:flex items-center space-x-8">
              <NavLink href="/" icon={<FaHome />} text="Início" />
              <NavLink href="/produtos" icon={<FaShoppingBag />} text="Produtos" />
              <NavLink href="/contato" icon={<FaEnvelope />} text="Contato" />
            </div>

            <div className="flex items-center gap-6">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsFavoritesOpen(true)}
                className="relative p-2 text-gray-700 dark:text-dark-text hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              >
                <FaHeart className="text-xl" />
                {favorites.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                    {favorites.length}
                  </span>
                )}
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 text-gray-700 dark:text-dark-text hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              >
                <FaShoppingCart className="text-xl" />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary-600 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                    {itemCount}
                  </span>
                )}
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="p-2 rounded-full bg-gray-100 dark:bg-dark-accent text-gray-700 dark:text-dark-text hover:bg-primary-100 dark:hover:bg-dark-primary transition-colors"
              >
                {theme === 'dark' ? <FaSun className="text-xl" /> : <FaMoon className="text-xl" />}
              </motion.button>

              <div className="md:hidden">
                <motion.button 
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsMobileMenuOpen(true)}
                  className="p-2 rounded-full bg-gray-100 dark:bg-dark-accent text-gray-700 dark:text-dark-text hover:bg-primary-100 dark:hover:bg-dark-primary transition-colors"
                >
                  <FaBars className="h-6 w-6" />
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/20 z-40"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="fixed top-24 right-4 w-64 bg-white dark:bg-dark-secondary rounded-2xl shadow-2xl z-50 overflow-hidden border border-gray-100 dark:border-dark-accent"
            >
              <div className="p-4 border-b dark:border-dark-accent flex justify-between items-center bg-gray-50/80 dark:bg-dark-accent/80 backdrop-blur-sm">
                <h2 className="text-lg font-bold text-gray-800 dark:text-dark-text">
                  Menu
                </h2>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-dark-accent rounded-lg transition-colors"
                >
                  <FaTimes className="text-gray-500 dark:text-gray-400" />
                </button>
              </div>
              <div className="p-4 space-y-4">
                {mobileMenuItems.map((item, index) => (
                  <Link key={item.href} href={item.href}>
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center gap-4 p-5 bg-primary-50/80 dark:bg-dark-secondary rounded-2xl hover:bg-primary-100 dark:hover:bg-dark-primary transition-colors cursor-pointer shadow-soft"
                    >
                      <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/20 rounded-xl flex items-center justify-center text-primary-600 dark:text-primary-400">
                        {item.icon}
                      </div>
                      <span className="font-medium text-gray-800 dark:text-dark-text text-lg">
                        {item.text}
                      </span>
                    </motion.div>
                  </Link>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <FavoritesDrawer isOpen={isFavoritesOpen} onClose={() => setIsFavoritesOpen(false)} />
    </>
  )
}

function NavLink({ href, icon, text }: { href: string; icon: React.ReactNode; text: string }) {
  return (
    <motion.a
      href={href}
      className="text-gray-700 dark:text-dark-text hover:text-primary-600 dark:hover:text-primary-400 transition-colors flex items-center gap-2 py-2 px-3 rounded-full hover:bg-gray-100 dark:hover:bg-dark-accent"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {icon}
      <span className="font-medium">{text}</span>
    </motion.a>
  )
} 