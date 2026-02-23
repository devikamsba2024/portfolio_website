"use client"

import { motion } from 'framer-motion'

export function AnimatedBackground() {
    return (
        <div className="fixed inset-0 -z-10 overflow-hidden">
            {/* Gradient Orb 1 */}
            <motion.div
                className="absolute w-[500px] h-[500px] rounded-full blur-3xl opacity-20"
                style={{
                    background: 'radial-gradient(circle, rgba(168, 85, 247, 0.4) 0%, transparent 70%)',
                }}
                animate={{
                    x: ['-25%', '25%', '-25%'],
                    y: ['-25%', '50%', '-25%'],
                    scale: [1, 1.2, 1],
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: 'easeInOut',
                }}
                initial={{ top: '10%', left: '10%' }}
            />

            {/* Gradient Orb 2 */}
            <motion.div
                className="absolute w-[600px] h-[600px] rounded-full blur-3xl opacity-20"
                style={{
                    background: 'radial-gradient(circle, rgba(124, 58, 237, 0.4) 0%, transparent 70%)',
                }}
                animate={{
                    x: ['25%', '-25%', '25%'],
                    y: ['25%', '-25%', '25%'],
                    scale: [1.2, 1, 1.2],
                }}
                transition={{
                    duration: 25,
                    repeat: Infinity,
                    ease: 'easeInOut',
                }}
                initial={{ top: '50%', right: '10%' }}
            />

            {/* Gradient Orb 3 */}
            <motion.div
                className="absolute w-[400px] h-[400px] rounded-full blur-3xl opacity-15"
                style={{
                    background: 'radial-gradient(circle, rgba(139, 92, 246, 0.4) 0%, transparent 70%)',
                }}
                animate={{
                    x: ['-10%', '10%', '-10%'],
                    y: ['10%', '-10%', '10%'],
                    scale: [1, 1.3, 1],
                }}
                transition={{
                    duration: 18,
                    repeat: Infinity,
                    ease: 'easeInOut',
                }}
                initial={{ bottom: '10%', left: '50%' }}
            />

            {/* Mesh Gradient Overlay */}
            <div
                className="absolute inset-0 opacity-30"
                style={{
                    backgroundImage: `
            radial-gradient(at 0% 0%, rgba(168, 85, 247, 0.1) 0px, transparent 50%),
            radial-gradient(at 100% 0%, rgba(124, 58, 237, 0.1) 0px, transparent 50%),
            radial-gradient(at 100% 100%, rgba(139, 92, 246, 0.1) 0px, transparent 50%),
            radial-gradient(at 0% 100%, rgba(147, 51, 234, 0.1) 0px, transparent 50%)
          `,
                }}
            />
        </div>
    )
}
