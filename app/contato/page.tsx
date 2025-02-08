'use client'

import { motion } from 'framer-motion'
import { FaUser, FaEnvelope, FaComment, FaPaperPlane, FaPhone, FaMapMarkerAlt, FaWhatsapp, FaInstagram, FaFacebook } from 'react-icons/fa'
import Particles from '../components/Particles'

export default function Contato() {
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

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-dark-primary relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-conic from-primary-600 via-secondary-500 to-primary-600 opacity-90 animate-gradient" />
      <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-10" />
      <Particles />

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-16 sm:py-24">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="bg-white/10 dark:bg-dark-secondary/10 backdrop-blur-lg rounded-3xl p-8 sm:p-12 border border-white/20 shadow-2xl"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Formulário */}
            <motion.div variants={itemVariants} className="space-y-8">
              <div className="text-center lg:text-left">
                <motion.h1 
                  className="text-4xl sm:text-5xl font-bold text-white mb-4"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  Entre em Contato
                </motion.h1>
                <motion.p 
                  className="text-white/80 text-lg"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  Estamos aqui para ajudar. Envie sua mensagem!
                </motion.p>
              </div>

              <motion.form className="space-y-6">
                <div className="space-y-4">
                  <motion.div
                    variants={itemVariants}
                    className="relative"
                  >
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <FaUser className="text-white/60" />
                    </div>
                    <input
                      type="text"
                      placeholder="Seu nome"
                      className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                    />
                  </motion.div>

                  <motion.div
                    variants={itemVariants}
                    className="relative"
                  >
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <FaEnvelope className="text-white/60" />
                    </div>
                    <input
                      type="email"
                      placeholder="Seu email"
                      className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                    />
                  </motion.div>

                  <motion.div
                    variants={itemVariants}
                    className="relative"
                  >
                    <div className="absolute top-4 left-0 pl-4 pointer-events-none">
                      <FaComment className="text-white/60" />
                    </div>
                    <textarea
                      rows={4}
                      placeholder="Sua mensagem"
                      className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all resize-none"
                    />
                  </motion.div>
                </div>

                <motion.button
                  variants={itemVariants}
                  whileHover={{ scale: 1.02, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.2)" }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-4 bg-gradient-to-r from-primary-600 to-secondary-500 text-white rounded-xl font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-all"
                >
                  <FaPaperPlane />
                  Enviar Mensagem
                </motion.button>
              </motion.form>
            </motion.div>

            {/* Informações de Contato */}
            <motion.div 
              variants={itemVariants}
              className="lg:border-l border-white/10 lg:pl-12 space-y-8"
            >
              <div className="text-center lg:text-left">
                <h2 className="text-2xl font-bold text-white mb-2">Outras Formas de Contato</h2>
                <p className="text-white/80">Escolha a melhor forma de falar conosco</p>
              </div>

              <div className="space-y-6">
                <motion.div
                  whileHover={{ x: 5 }}
                  className="flex items-center gap-4 text-white/80 hover:text-white transition-colors"
                >
                  <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center">
                    <FaPhone className="text-xl" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Telefone</h3>
                    <p>(11) 1234-5678</p>
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ x: 5 }}
                  className="flex items-center gap-4 text-white/80 hover:text-white transition-colors"
                >
                  <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center">
                    <FaWhatsapp className="text-xl" />
                  </div>
                  <div>
                    <h3 className="font-semibold">WhatsApp</h3>
                    <p>(11) 98765-4321</p>
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ x: 5 }}
                  className="flex items-center gap-4 text-white/80 hover:text-white transition-colors"
                >
                  <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center">
                    <FaEnvelope className="text-xl" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Email</h3>
                    <p>contato@johnnystore.com</p>
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ x: 5 }}
                  className="flex items-center gap-4 text-white/80 hover:text-white transition-colors"
                >
                  <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center">
                    <FaMapMarkerAlt className="text-xl" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Endereço</h3>
                    <p>Rua Exemplo, 123 - São Paulo, SP</p>
                  </div>
                </motion.div>
              </div>

              <div className="pt-8 border-t border-white/10">
                <h3 className="text-white font-semibold mb-4 text-center lg:text-left">Siga-nos nas Redes Sociais</h3>
                <div className="flex justify-center lg:justify-start gap-4">
                  <motion.a
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    href="#"
                    className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center text-white/80 hover:text-white transition-colors"
                  >
                    <FaFacebook className="text-xl" />
                  </motion.a>
                  <motion.a
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    href="#"
                    className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center text-white/80 hover:text-white transition-colors"
                  >
                    <FaInstagram className="text-xl" />
                  </motion.a>
                  <motion.a
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    href="#"
                    className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center text-white/80 hover:text-white transition-colors"
                  >
                    <FaWhatsapp className="text-xl" />
                  </motion.a>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </main>
  )
} 