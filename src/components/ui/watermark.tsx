"use client"

import { motion } from 'framer-motion'

interface WatermarkProps {
    text: string
}

export function Watermark({ text }: WatermarkProps) {
    return (
        <div className="absolute inset-0 z-0 flex items-center justify-center overflow-hidden pointer-events-none select-none">
            <motion.span
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 0.03 }}
                transition={{ duration: 1 }}
                viewport={{ once: true }}
                className="text-[15vw] md:text-[20vw] font-black text-foreground tracking-widest whitespace-nowrap"
                style={{ fontFamily: 'Inter, sans-serif' }}
            >
                {text}
            </motion.span>
        </div>
    )
}
