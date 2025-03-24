'use client'
import { motion } from 'framer-motion'
import { useIsFetching, useIsMutating } from '@tanstack/react-query'

const Loading = () => {
  const isFetching = useIsFetching() + useIsMutating() > 0
  console.log('isF', isFetching)

  if (!isFetching) return null
  return (
    <motion.div
      className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50 dark:bg-opacity-70"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div className="w-16 h-16 border-4 border-gray-300 border-t-transparent rounded-full animate-spin dark:border-gray-600 dark:border-t-transparent" />
    </motion.div>
  )
}

export default Loading
