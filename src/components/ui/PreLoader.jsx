import { motion } from "motion/react"

export default function PreLoader() {
  return (
    <motion.div id="preloader" className="absolute inset-0 bg-black">
      PreLoader
    </motion.div>
  )
}
