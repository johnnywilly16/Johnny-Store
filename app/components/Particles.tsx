'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

type Particle = {
  id: number
  x: number
  y: number
  size: number
  duration: number
  delay: number
}

export default function Particles() {
  const [particles, setParticles] = useState<Particle[]>([])

  useEffect(() => {
    const generateParticles = () => {
      const newParticles: Particle[] = []
      for (let i = 0; i < 30; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          size: Math.random() * 4 + 2,
          duration: Math.random() * 5 + 3,
          delay: Math.random() * 3
        })
      }
      setParticles(newParticles)
    }

    generateParticles()

    // Regenerar partículas quando a janela for redimensionada
    const handleResize = () => {
      generateParticles()
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute bg-white dark:bg-white/30 rounded-full"
          style={{
            width: particle.size,
            height: particle.size,
            left: particle.x,
            top: particle.y,
          }}
          animate={{
            y: [0, -100, 0],
            opacity: [0, 0.8, 0],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      ))}
    </div>
  )
} 