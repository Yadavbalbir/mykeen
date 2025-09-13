import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiPlus, FiMinus, FiTrash2, FiShoppingBag, FiArrowRight } from 'react-icons/fi'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'

const CartPage = () => {
  const { cart, updateQuantity, removeFromCart, getCartTotal, clearCart } = useCart()
  const { isAuthenticated } = useAuth()
  const navigate = useNavigate()

  const handleCheckout = () => {
    if (!isAuthenticated) {
      navigate('/login')
    } else {
      navigate('/checkout')
    }
  }

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId)
    } else {
      updateQuantity(productId, newQuantity)
    }
  }

  if (cart.length === 0) {
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
            🛒
          </motion.div>
          <h2 className="text-3xl font-bold mb-4 text-gray-800">Your cart is empty</h2>
          <p className="text-gray-600 mb-8">Looks like you haven't added any items to your cart yet.</p>
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
      <div className="max-w-6xl mx-auto px-4 py-8">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="flex items-center justify-between mb-8"
        >
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <FiShoppingBag />
            Shopping Cart ({cart.length} items)
          </h1>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={clearCart}
            className="text-red-500 hover:text-red-700 flex items-center gap-2 font-medium"
          >
            <FiTrash2 />
            Clear Cart
          </motion.button>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-lg p-6 flex items-center gap-6"
              >
                <div className="w-24 h-24 bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 rounded-xl flex items-center justify-center flex-shrink-0">
                  <span className="text-3xl">{item.image}</span>
                </div>

                <div className="flex-1">
                  <h3 className="font-bold text-lg mb-1">{item.name}</h3>
                  <p className="text-gray-600 text-sm mb-2">{item.category}</p>
                  <p className="text-2xl font-bold text-orange-600">₹{item.price}</p>
                </div>

                <div className="flex items-center gap-3">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                    className="w-10 h-10 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors duration-200"
                  >
                    <FiMinus />
                  </motion.button>
                  
                  <span className="text-xl font-semibold w-12 text-center">{item.quantity}</span>
                  
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                    className="w-10 h-10 rounded-full bg-orange-500 hover:bg-orange-600 text-white flex items-center justify-center transition-colors duration-200"
                  >
                    <FiPlus />
                  </motion.button>
                </div>

                <div className="text-right">
                  <p className="text-lg font-semibold">₹{item.price * item.quantity}</p>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 hover:text-red-700 mt-2"
                  >
                    <FiTrash2 />
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-2xl shadow-lg p-6 sticky top-24"
            >
              <h3 className="text-xl font-bold mb-6">Order Summary</h3>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₹{getCartTotal()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="text-green-500">Free</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>₹{Math.round(getCartTotal() * 0.18)}</span>
                </div>
                <div className="border-t pt-4">
                  <div className="flex justify-between text-xl font-bold">
                    <span>Total</span>
                    <span>₹{Math.round(getCartTotal() * 1.18)}</span>
                  </div>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleCheckout}
                className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Proceed to Checkout
              </motion.button>

              <div className="mt-4 text-center">
                <Link to="/shop" className="text-orange-500 hover:text-orange-700 font-medium">
                  Continue Shopping
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default CartPage