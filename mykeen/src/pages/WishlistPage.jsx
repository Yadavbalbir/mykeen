import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiHeart, FiShoppingCart, FiTrash2, FiStar, FiArrowRight } from 'react-icons/fi'
import { useWishlist } from '../context/WishlistContext'
import { useCart } from '../context/CartContext'

const WishlistPage = () => {
  const { wishlist, removeFromWishlist, clearWishlist } = useWishlist()
  const { addToCart } = useCart()

  const handleAddToCart = (product) => {
    addToCart(product)
  }

  const handleRemoveFromWishlist = (productId) => {
    removeFromWishlist(productId)
  }

  if (wishlist.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen pt-20 pb-16 flex items-center justify-center"
      >
        <div className="text-center max-w-md mx-auto px-4">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
            className="text-8xl mb-6"
          >
            💔
          </motion.div>
          <h2 className="text-3xl font-bold mb-4 text-gray-800">Your wishlist is empty</h2>
          <p className="text-gray-600 mb-8">Save items you love to your wishlist and shop them later.</p>
          <Link to="/shop">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-3 rounded-xl font-semibold flex items-center gap-2 mx-auto"
            >
              Start Shopping
              <FiArrowRight />
            </motion.button>
          </Link>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen pt-20 pb-16"
    >
      <div className="max-w-7xl mx-auto px-4 py-8">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="flex items-center justify-between mb-8"
        >
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <FiHeart className="text-red-500" />
            My Wishlist ({wishlist.length} items)
          </h1>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={clearWishlist}
            className="text-red-500 hover:text-red-700 flex items-center gap-2 font-medium"
          >
            <FiTrash2 />
            Clear Wishlist
          </motion.button>
        </motion.div>

        {/* Wishlist Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlist.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden group"
            >
              {/* Product Image */}
              <Link to={`/product/${item.id}`}>
                <div className="h-48 bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 flex items-center justify-center cursor-pointer hover:scale-105 transition-transform duration-300 relative">
                  <span className="text-6xl">{item.image}</span>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={(e) => {
                      e.preventDefault()
                      handleRemoveFromWishlist(item.id)
                    }}
                    className="absolute top-3 right-3 p-2 bg-white/90 hover:bg-white rounded-full shadow-lg text-red-500 hover:text-red-600 transition-colors duration-200"
                  >
                    <FiHeart className="fill-current" />
                  </motion.button>
                </div>
              </Link>

              {/* Product Info */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs bg-orange-100 text-orange-600 px-2 py-1 rounded-full font-semibold">
                    {item.category}
                  </span>
                  <div className="flex items-center">
                    <FiStar className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-semibold ml-1">{item.rating}</span>
                  </div>
                </div>

                <Link to={`/product/${item.id}`}>
                  <h3 className="font-bold text-lg mb-2 group-hover:text-orange-500 transition-colors duration-300 cursor-pointer line-clamp-2">
                    {item.name}
                  </h3>
                </Link>

                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{item.description}</p>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <p className="text-xl font-bold text-orange-600">₹{item.price}</p>
                    {item.originalPrice && (
                      <p className="text-sm text-gray-500 line-through">₹{item.originalPrice}</p>
                    )}
                  </div>
                  {item.originalPrice && (
                    <span className="bg-green-100 text-green-600 px-2 py-1 rounded-full text-xs font-semibold">
                      {Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)}% OFF
                    </span>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleAddToCart(item)}
                    className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <FiShoppingCart className="text-sm" />
                    Add to Cart
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleRemoveFromWishlist(item.id)}
                    className="p-3 border border-red-300 text-red-500 hover:bg-red-50 rounded-xl transition-all duration-300"
                  >
                    <FiTrash2 className="text-sm" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Continue Shopping */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-center mt-12"
        >
          <Link to="/shop">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="border-2 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2 mx-auto"
            >
              Continue Shopping
              <FiArrowRight />
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default WishlistPage