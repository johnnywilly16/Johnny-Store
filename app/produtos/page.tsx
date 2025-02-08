'use client'

import { motion } from 'framer-motion'
import { useState, useMemo } from 'react'
import { FaSearch, FaStar, FaHeart, FaShoppingCart, FaArrowRight } from 'react-icons/fa'
import { products, categories } from '../data/products'
import { useCart } from '../contexts/CartContext'
import { useFavorites } from '../contexts/FavoritesContext'
import ProductModal from '../components/ProductModal'

export default function Produtos() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('Todos')
  const [selectedProduct, setSelectedProduct] = useState<typeof products[0] | null>(null)
  const { addToCart } = useCart()
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites()

  const filteredProducts = useMemo(() => {
    const searchTermLower = searchTerm.toLowerCase().trim()
    
    return products.filter(product => {
      const matchesSearch = !searchTermLower || 
        `${product.name} ${product.description} ${product.category}`
          .toLowerCase()
          .includes(searchTermLower)
      
      const matchesCategory = selectedCategory === 'Todos' || 
        product.category === selectedCategory

      return matchesSearch && matchesCategory
    })
  }, [searchTerm, selectedCategory])

  const handleFavoriteClick = (product: typeof products[0], event: React.MouseEvent) => {
    event.stopPropagation()
    if (isFavorite(product.id)) {
      removeFromFavorites(product.id)
    } else {
      addToFavorites(product)
    }
  }

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-dark-primary pt-24 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-primary-600 to-secondary-500 bg-clip-text text-transparent">
            Nossos Produtos
          </h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Explore nossa coleção completa de produtos premium, filtrados por categoria e com busca inteligente.
          </p>
        </div>

        {/* Filters */}
        <div className="mb-12 space-y-6">
          {/* Search */}
          <div className="max-w-xl mx-auto">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <FaSearch className="text-gray-400 dark:text-gray-500" />
              </div>
              <input
                type="text"
                placeholder="Buscar produtos por nome, descrição ou categoria..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white dark:bg-dark-secondary rounded-full border border-gray-200 dark:border-dark-accent focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 focus:border-transparent transition-all text-gray-800 dark:text-dark-text placeholder-gray-400 dark:placeholder-gray-500"
              />
            </div>
          </div>

          {/* Categories */}
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <motion.button
                key={category}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-primary-600 text-white'
                    : 'bg-white dark:bg-dark-secondary text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-dark-accent'
                }`}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((produto) => (
            <motion.div
              key={produto.id}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white dark:bg-dark-secondary rounded-2xl p-4 shadow-soft-xl hover:shadow-2xl transition-shadow"
            >
              <div className="relative group">
                <div className="w-full aspect-square rounded-xl mb-4 bg-gradient-to-br from-primary-100 to-secondary-100 dark:from-dark-accent dark:to-dark-primary flex items-center justify-center overflow-hidden">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <FaShoppingCart className="text-4xl sm:text-6xl text-primary-600 dark:text-primary-400 transition-transform" />
                  </motion.div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={(e) => handleFavoriteClick(produto, e)}
                  className={`absolute top-2 right-2 p-2 rounded-full shadow-soft ${
                    isFavorite(produto.id)
                      ? 'bg-red-500 text-white'
                      : 'bg-white dark:bg-dark-accent text-gray-400 hover:text-red-500'
                  }`}
                >
                  <FaHeart className="text-base" />
                </motion.button>
              </div>

              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="text-base font-bold text-gray-800 dark:text-dark-text mb-1 line-clamp-2">
                    {produto.name}
                  </h3>
                  <p className="text-lg font-bold text-primary-600 dark:text-primary-400">
                    R$ {produto.price.toFixed(2)}
                  </p>
                </div>
                <div className="flex items-center gap-1">
                  <FaStar className="text-yellow-400" />
                  <span className="text-sm text-gray-600 dark:text-dark-text font-medium">
                    {produto.rating}
                  </span>
                </div>
              </div>

              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                {produto.description}
              </p>

              <div className="flex gap-2">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedProduct(produto)}
                  className="flex-1 py-2 bg-primary-600 dark:bg-primary-500 text-white rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-primary-700 dark:hover:bg-primary-600 transition-colors text-sm"
                >
                  Ver Detalhes
                  <FaArrowRight className="text-sm" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => addToCart(produto)}
                  className="p-2 border-2 border-primary-600 dark:border-primary-400 text-primary-600 dark:text-primary-400 rounded-xl font-semibold hover:bg-primary-50 dark:hover:bg-dark-accent transition-colors"
                >
                  <FaShoppingCart className="text-sm" />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              Nenhum produto encontrado com os filtros selecionados.
            </p>
          </div>
        )}
      </div>

      {/* Product Modal */}
      {selectedProduct && (
        <ProductModal
          isOpen={!!selectedProduct}
          onClose={() => setSelectedProduct(null)}
          product={selectedProduct}
        />
      )}
    </main>
  )
} 