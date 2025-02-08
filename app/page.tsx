'use client'

import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import Link from 'next/link'
import { FaShoppingCart, FaSearch, FaStar, FaArrowRight, FaHeart, FaShoppingBag, FaTruck } from 'react-icons/fa'
import { useState, useRef } from 'react'
import ProductModal from './components/ProductModal'
import { products } from './data/products'
import { useCart } from './contexts/CartContext'
import { useFavorites } from './contexts/FavoritesContext'
import Particles from './components/Particles'

export default function Home() {
  const [selectedProduct, setSelectedProduct] = useState<typeof products[0] | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const { addToCart } = useCart()
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites()

  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  })

  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 }
  const y = useSpring(useTransform(scrollYProgress, [0, 1], [0, -150]), springConfig)
  const opacity = useSpring(useTransform(scrollYProgress, [0, 0.5], [1, 0]), springConfig)

  const handleFavoriteClick = (product: typeof products[0], event: React.MouseEvent) => {
    event.stopPropagation()
    if (isFavorite(product.id)) {
      removeFromFavorites(product.id)
    } else {
      addToFavorites(product)
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  }

  const handleExploreClick = () => {
    const productsSection = document.getElementById('products')
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-dark-primary">
      {/* Hero Section */}
      <section ref={ref} className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center overflow-hidden px-4 py-12 sm:py-0">
        <Particles />
        <div className="absolute inset-0 bg-gradient-radial from-primary-500/20 to-transparent dark:from-primary-900/20" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        
        <motion.div 
          style={{ y, opacity }}
          className="relative z-10 text-center"
        >
          <motion.h1 
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-4xl sm:text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary-600 to-secondary-500 bg-clip-text text-transparent px-4"
          >
            Descubra o Extraordinário
          </motion.h1>
          <motion.p 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-lg sm:text-xl md:text-2xl text-gray-600 dark:text-dark-text mb-12 max-w-2xl mx-auto px-4"
          >
            Explore nossa coleção exclusiva de produtos premium, cuidadosamente selecionados para você.
          </motion.p>
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center px-4"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleExploreClick}
              className="w-full sm:w-auto px-8 py-4 bg-primary-600 text-white rounded-full font-semibold flex items-center justify-center gap-2 hover:bg-primary-700 transition-colors shadow-soft"
            >
              Explorar Coleção
              <FaArrowRight />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto px-8 py-4 bg-white dark:bg-dark-accent text-primary-600 dark:text-primary-400 rounded-full font-semibold flex items-center justify-center gap-2 hover:bg-gray-50 dark:hover:bg-dark-secondary transition-colors shadow-soft"
            >
              Saiba Mais
              <FaSearch />
            </motion.button>
          </motion.div>
        </motion.div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-12 sm:py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="text-center mb-8 sm:mb-16"
          >
            <motion.h2 
              variants={itemVariants}
              className="text-3xl sm:text-4xl font-bold mb-4 bg-gradient-to-r from-primary-600 to-secondary-500 bg-clip-text text-transparent"
            >
              Produtos em Destaque
            </motion.h2>
            <motion.p 
              variants={itemVariants}
              className="text-gray-600 dark:text-dark-text max-w-2xl mx-auto mb-8 px-4"
            >
              Descubra nossa seleção especial de produtos premium, criados para proporcionar uma experiência única.
            </motion.p>

            <motion.div 
              variants={containerVariants}
              className="max-w-xl mx-auto mb-12"
            >
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <FaSearch className="text-gray-400 dark:text-gray-500" />
                </div>
                <motion.input
                  variants={itemVariants}
                  type="text"
                  placeholder="Buscar produtos por nome, descrição ou categoria..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-white dark:bg-dark-secondary rounded-full border border-gray-200 dark:border-dark-accent focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 focus:border-transparent transition-all text-gray-800 dark:text-dark-text placeholder-gray-400 dark:placeholder-gray-500"
                />
              </div>
            </motion.div>
          </motion.div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-8"
          >
            {products
              .filter(product => 
                !searchTerm || 
                product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                product.description.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .slice(0, 9)
              .map((produto) => (
                <motion.div
                  key={produto.id}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white dark:bg-dark-secondary rounded-2xl p-4 sm:p-6 shadow-soft-xl hover:shadow-2xl transition-shadow"
                >
                  <div className="relative group">
                    <div className="w-full aspect-square rounded-xl mb-4 sm:mb-6 bg-gradient-to-br from-primary-100 to-secondary-100 dark:from-dark-accent dark:to-dark-primary flex items-center justify-center overflow-hidden">
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
                      className={`absolute top-2 right-2 sm:top-4 sm:right-4 p-2 sm:p-3 rounded-full shadow-soft ${
                        isFavorite(produto.id)
                          ? 'bg-red-500 text-white'
                          : 'bg-white dark:bg-dark-accent text-gray-400 hover:text-red-500'
                      }`}
                    >
                      <FaHeart className="text-base sm:text-xl" />
                    </motion.button>
                  </div>

                  <div className="flex justify-between items-start mb-3 sm:mb-4">
                    <div>
                      <h3 className="text-base sm:text-xl font-bold text-gray-800 dark:text-dark-text mb-1 sm:mb-2 line-clamp-2">{produto.name}</h3>
                      <p className="text-lg sm:text-2xl font-bold text-primary-600 dark:text-primary-400">
                        R$ {produto.price.toFixed(2)}
                      </p>
                    </div>
                    <div className="flex items-center gap-1">
                      <FaStar className="text-yellow-400" />
                      <span className="text-sm sm:text-base text-gray-600 dark:text-dark-text font-medium">{produto.rating}</span>
                    </div>
                  </div>

                  <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-4 sm:mb-6 line-clamp-2">{produto.description}</p>

                  <div className="flex gap-2 sm:gap-4">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setSelectedProduct(produto)}
                      className="flex-1 py-2 sm:py-3 bg-primary-600 dark:bg-primary-500 text-white rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-primary-700 dark:hover:bg-primary-600 transition-colors text-sm sm:text-base"
                    >
                      <span className="hidden sm:inline">Ver Detalhes</span>
                      <span className="sm:hidden">Detalhes</span>
                      <FaArrowRight className="text-sm sm:text-base" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => addToCart(produto)}
                      className="p-2 sm:px-4 sm:py-3 border-2 border-primary-600 dark:border-primary-400 text-primary-600 dark:text-primary-400 rounded-xl font-semibold hover:bg-primary-50 dark:hover:bg-dark-accent transition-colors"
                    >
                      <FaShoppingCart className="text-sm sm:text-base" />
                    </motion.button>
                  </div>
                </motion.div>
              ))}
          </motion.div>

          <motion.div
            variants={containerVariants}
            className="flex justify-center mt-12"
          >
            <Link href="/produtos">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-primary-600 text-white rounded-xl font-semibold flex items-center gap-2 hover:bg-primary-700 transition-colors shadow-soft"
              >
                Ver Todos os Produtos
                <FaArrowRight />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 sm:py-32 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-conic from-primary-600 via-secondary-500 to-primary-600 opacity-90 animate-gradient" />
        <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-10" />
        <Particles />
        
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative z-10 max-w-7xl mx-auto"
        >
          <div className="bg-white/20 dark:bg-white/10 backdrop-blur-lg rounded-3xl p-6 sm:p-8 md:p-12 border border-white/20 shadow-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-center mb-8 sm:mb-12"
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                Pronto para uma Experiência <br className="hidden sm:block" />
                <span className="bg-gradient-to-r from-yellow-300 to-yellow-500 bg-clip-text text-transparent">
                  Premium de Compras?
                </span>
              </h2>
              <p className="text-lg sm:text-xl md:text-2xl text-white max-w-3xl mx-auto">
                Junte-se a milhares de clientes satisfeitos e descubra por que somos a escolha premium para produtos exclusivos.
              </p>
            </motion.div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/contato">
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.2)" }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-white text-primary-600 rounded-full font-semibold flex items-center gap-2 hover:bg-gray-50 transition-colors shadow-xl text-base sm:text-lg"
                >
                  Entre em Contato
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    <FaArrowRight />
                  </motion.div>
                </motion.button>
              </Link>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleExploreClick}
                className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-transparent border-2 border-white text-white rounded-full font-semibold flex items-center gap-2 hover:bg-white/10 transition-colors text-base sm:text-lg"
              >
                Ver Produtos
                <FaShoppingBag />
              </motion.button>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-8 sm:mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 text-center"
            >
              <div className="bg-white/10 backdrop-blur rounded-xl p-4 sm:p-6">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary-500 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <FaShoppingBag className="text-white text-lg sm:text-xl" />
                </div>
                <h3 className="text-white font-semibold mb-2 text-base sm:text-lg">Produtos Premium</h3>
                <p className="text-white/90 text-sm">Seleção exclusiva de produtos de alta qualidade</p>
              </div>
              
              <div className="bg-white/10 backdrop-blur rounded-xl p-4 sm:p-6">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-secondary-500 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <FaTruck className="text-white text-lg sm:text-xl" />
                </div>
                <h3 className="text-white font-semibold mb-2 text-base sm:text-lg">Entrega Rápida</h3>
                <p className="text-white/90 text-sm">Envio expresso para todo o Brasil</p>
              </div>
              
              <div className="bg-white/10 backdrop-blur rounded-xl p-4 sm:p-6">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary-700 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <FaHeart className="text-white text-lg sm:text-xl" />
                </div>
                <h3 className="text-white font-semibold mb-2 text-base sm:text-lg">Satisfação Garantida</h3>
                <p className="text-white/90 text-sm">Qualidade e atendimento excepcional</p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

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
