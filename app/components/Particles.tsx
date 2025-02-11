'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useTheme } from 'next-themes'

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
  const { theme } = useTheme()

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
          className={`absolute rounded-full ${
            theme === 'dark' 
              ? 'bg-white/30'
              : 'bg-primary-800/40'
          }`}
          style={{
            width: particle.size,
            height: particle.size,
            left: particle.x,
            top: particle.y,
          }}
          animate={{
            y: [0, -100, 0],
            opacity: [0, 1, 0],
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