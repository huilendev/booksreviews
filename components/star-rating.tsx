// // components/star-rating.tsx
// "use client"

// import { useState } from "react"
// import { motion } from "framer-motion"

// interface StarRatingProps {
//   rating: number
//   onRate: (rating: number) => void
// }

// export function StarRating({ rating, onRate }: StarRatingProps) {
//   const [hover, setHover] = useState(0)

//   return (
//     <div className="flex gap-2">
//       {[1, 2, 3, 4, 5].map((star) => (
//         <motion.button
//           key={star}
//           whileHover={{ scale: 1.1 }}
//           whileTap={{ scale: 0.95 }}
//           onClick={() => onRate(star)}
//           onMouseEnter={() => setHover(star)}
//           onMouseLeave={() => setHover(0)}
//           className="focus:outline-none transition-all"
//         >
//           <span className={`text-3xl transition-colors ${star <= (hover || rating) ? "text-black" : "text-gray-300"}`}>
//             ★
//           </span>
//         </motion.button>
//       ))}
//     </div>
//   )
// }
