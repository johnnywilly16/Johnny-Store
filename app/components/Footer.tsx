'use client'

import { motion } from 'framer-motion'
import { FaFacebook, FaInstagram, FaTwitter, FaWhatsapp, FaEnvelope, FaMapMarkerAlt, FaPhone, FaHeart } from 'react-icons/fa'
import Link from 'next/link'

export default function Footer() {
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
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

  return (
    <footer className="bg-white dark:bg-dark-secondary relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-primary-50 dark:to-dark-accent/20 pointer-events-none" />
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="max-w-7xl mx-auto px-4 py-12 sm:py-16 relative z-10"
      >
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 sm:gap-12">
          {/* Brand Column */}
          <motion.div variants={itemVariants} className="space-y-4">
            <Link href="/">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-secondary-500 bg-clip-text text-transparent">
                Johnny Store
              </h2>
            </Link>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Sua loja premium de produtos exclusivos, oferecendo uma experiência única de compra com qualidade e estilo.
            </p>
            <div className="flex gap-4">
              <motion.a
                href="#"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              >
                <FaFacebook className="text-xl" />
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              >
                <FaInstagram className="text-xl" />
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              >
                <FaTwitter className="text-xl" />
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              >
                <FaWhatsapp className="text-xl" />
              </motion.a>
            </div>
          </motion.div>

          {/* Links Column */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-dark-text">Links Rápidos</h3>
            <ul className="space-y-2">
              {['Início', 'Produtos', 'Sobre Nós', 'Contato'].map((item) => (
                <li key={item}>
                  <motion.a
                    href="#"
                    className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors text-sm"
                    whileHover={{ x: 5 }}
                  >
                    {item}
                  </motion.a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Categories Column */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-dark-text">Categorias</h3>
            <ul className="space-y-2">
              {['Eletrônicos', 'Computadores', 'Acessórios', 'Ofertas'].map((item) => (
                <li key={item}>
                  <motion.a
                    href="#"
                    className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors text-sm"
                    whileHover={{ x: 5 }}
                  >
                    {item}
                  </motion.a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Column */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-dark-text">Contato</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-gray-600 dark:text-gray-400 text-sm">
                <FaMapMarkerAlt className="text-primary-600 dark:text-primary-400" />
                <span>Rua Exemplo, 123 - São Paulo, SP</span>
              </li>
              <li className="flex items-center gap-2 text-gray-600 dark:text-gray-400 text-sm">
                <FaPhone className="text-primary-600 dark:text-primary-400" />
                <span>(11) 1234-5678</span>
              </li>
              <li className="flex items-center gap-2 text-gray-600 dark:text-gray-400 text-sm">
                <FaEnvelope className="text-primary-600 dark:text-primary-400" />
                <span>contato@johnnystore.com</span>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          variants={itemVariants}
          className="mt-12 pt-8 border-t border-gray-200 dark:border-dark-accent flex flex-col sm:flex-row justify-between items-center gap-4"
        >
          <p className="text-gray-600 dark:text-gray-400 text-sm text-center sm:text-left">
            © 2024 Johnny Store. Todos os direitos reservados.
          </p>
          <p className="text-gray-600 dark:text-gray-400 text-sm flex items-center gap-1">
            Feito com <FaHeart className="text-red-500" /> por Johnny Store
          </p>
        </motion.div>
      </motion.div>
    </footer>
  )
} 