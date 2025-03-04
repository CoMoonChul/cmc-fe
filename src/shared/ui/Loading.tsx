'use client'
import React from 'react'
import { useIsFetching } from '@tanstack/react-query'

export default function Loading() {
  const isFetching = useIsFetching()
  if (isFetching) return <h3>isLoading!!!!</h3>
  return <></>
}

// import React from "react";
// import {motion} from "framer-motion"

// const Loading: React.FC = () => {
//   return (
//     <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
//       <motion.div
//         className="w-12 h-12 border-4 border-t-transparent border-white rounded-full animate-spin"
//         animate={{ rotate: 360 }}
//         transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
//       />
//     </div>
//   );
// };

// export default Loading;
