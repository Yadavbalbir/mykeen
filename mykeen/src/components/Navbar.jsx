import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiShoppingCart, FiHeart, FiUser, FiMenu, FiX } from 'react-icons/fi'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'
import { useAuth } from '../context/AuthContext'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { getCartItemCount } = useCart()
  const { getWishlistItemCount } = useWishlist()
  const { user, logout, isAuthenticated } = useAuth()
  const location = useLocation()

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Shop', href: '/shop' },
    { name: 'About', href: '/#about' },
    { name: 'Contact', href: '/#contact' }
  ]

  const isActive = (path) => location.pathname === path

  return (
    <nav className="fixed top-0 left-0 right-0 w-full bg-white/90 backdrop-blur-lg z-50 shadow-lg border-b border-orange-100">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 max-w-7xl mx-auto">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent"
              >
                MyKeen
              </motion.div>
            </Link>
          </div>

          {/* Desktop Navigation - Center */}
          <div className="hidden md:flex items-center justify-center flex-1 mx-8">
            <div className="flex items-center space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`relative text-gray-700 hover:text-orange-500 transition-colors duration-300 font-medium ${
                    isActive(item.href) ? 'text-orange-500' : ''
                  }`}
                >
                  {item.name}
                  {isActive(item.href) && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-orange-500"
                    />
                  )}
                </Link>
              ))}
            </div>
          </div>

          {/* Desktop Actions - Right */}
          <div className="hidden md:flex items-center space-x-2">
            {/* Wishlist */}
            <Link to="/wishlist" className="relative">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="text-gray-700 hover:text-red-500 transition-colors duration-300 p-2 rounded-lg hover:bg-red-50"
              >
                <FiHeart size={20} />
                {getWishlistItemCount() > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold"
                  >
                    {getWishlistItemCount()}
                  </motion.span>
                )}
              </motion.button>
            </Link>

            {/* Cart */}
            <Link to="/cart" className="relative">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="text-gray-700 hover:text-orange-500 transition-colors duration-300 p-2 rounded-lg hover:bg-orange-50"
              >
                <FiShoppingCart size={20} />
                {getCartItemCount() > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold"
                  >
                    {getCartItemCount()}
                  </motion.span>
                )}
              </motion.button>
            </Link>

            {/* User Menu */}
            {isAuthenticated ? (
              <div className="flex items-center space-x-3 ml-2">
                <span className="text-gray-700 font-medium text-sm">Hi, {user.name}</span>
                <button
                  onClick={logout}
                  className="text-gray-700 hover:text-red-500 transition-colors duration-300 font-medium text-sm px-3 py-1 rounded-md hover:bg-red-50"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-2 ml-2">
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-orange-500 transition-colors duration-300 font-medium text-sm px-3 py-2 rounded-md hover:bg-orange-50"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-full font-semibold text-sm hover:shadow-lg transition-all duration-300"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-3">
            <Link to="/wishlist" className="relative">
              <FiHeart size={20} className="text-gray-700" />
              {getWishlistItemCount() > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center text-xs">
                  {getWishlistItemCount()}
                </span>
              )}
            </Link>
            <Link to="/cart" className="relative">
              <FiShoppingCart size={20} className="text-gray-700" />
              {getCartItemCount() > 0 && (
                <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center text-xs">
                  {getCartItemCount()}
                </span>
              )}
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-orange-500 transition-colors duration-300 p-1"
            >
              {isOpen ? <FiX size={20} /> : <FiMenu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <motion.div
          initial={false}
          animate={{ height: isOpen ? 'auto' : 0 }}
          className="md:hidden overflow-hidden bg-white/95 backdrop-blur-sm"
        >
          <div className="py-4 space-y-2 border-t border-orange-100">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                onClick={() => setIsOpen(false)}
                className={`block px-4 py-2 text-gray-700 hover:text-orange-500 hover:bg-orange-50 transition-colors duration-300 font-medium rounded-md mx-2 ${
                  isActive(item.href) ? 'text-orange-500 bg-orange-50' : ''
                }`}
              >
                {item.name}
              </Link>
            ))}
            <div className="pt-2 mt-4 border-t border-gray-200 mx-2">
              {isAuthenticated ? (
                <div className="space-y-2">
                  <div className="px-4 py-2 text-gray-700 font-medium text-sm">Hi, {user.name}</div>
                  <button
                    onClick={() => {
                      logout()
                      setIsOpen(false)
                    }}
                    className="block w-full text-left px-4 py-2 text-red-500 font-medium hover:bg-red-50 rounded-md"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="space-y-2">
                  <Link
                    to="/login"
                    onClick={() => setIsOpen(false)}
                    className="block px-4 py-2 text-gray-700 hover:text-orange-500 hover:bg-orange-50 transition-colors duration-300 font-medium rounded-md"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    onClick={() => setIsOpen(false)}
                    className="block mx-4 my-2 bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-full font-semibold text-center text-sm"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </nav>
  )
}

export default Navbar