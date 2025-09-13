import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FiSearch, FiFilter, FiGrid, FiList, FiStar, FiShoppingCart, FiHeart } from 'react-icons/fi'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'

const ShopPage = () => {
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('name')
  const [viewMode, setViewMode] = useState('grid')
  const [priceRange, setPriceRange] = useState([0, 1000])
  const { addToCart } = useCart()
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist()

  // Real products data based on actual images
  const allProducts = [
    { 
      id: 1, 
      name: 'Aloo Bhujia', 
      price: 299, 
      originalPrice: 349,
      image: '/images/aloo_bhujhia.png', 
      rating: 4.8, 
      reviews: 142,
      category: 'Spicy', 
      description: 'Crispy potato-based bhujia with traditional spices and herbs. A perfect tea-time snack.',
      weight: '200g'
    },
    { 
      id: 2, 
      name: 'Premium Chivda Mix', 
      price: 249, 
      originalPrice: 299,
      image: '/images/chivda.png', 
      rating: 4.7, 
      reviews: 198,
      category: 'Crunchy', 
      description: 'Traditional Maharashtrian chivda with peanuts, curry leaves, and aromatic spices.',
      weight: '250g'
    },
    { 
      id: 3, 
      name: 'Cornflakes Mixture', 
      price: 179, 
      originalPrice: 219,
      image: '/images/cornflakes_mixture.png', 
      rating: 4.5, 
      reviews: 167,
      category: 'Crunchy', 
      description: 'Crunchy cornflakes mixed with nuts, raisins, and light spices for a healthy snack.',
      weight: '300g'
    },
    { 
      id: 4, 
      name: 'Gulab Jamun', 
      price: 399, 
      originalPrice: 449,
      image: '/images/gulab_jamun.png', 
      rating: 4.9, 
      reviews: 234,
      category: 'Sweet', 
      description: 'Soft, spongy gulab jamuns soaked in rose-flavored sugar syrup. A royal dessert.',
      weight: '500g (12 pieces)'
    },
    { 
      id: 5, 
      name: 'Khatta Meetha', 
      price: 219, 
      originalPrice: 259,
      image: '/images/khatta_meetha.png', 
      rating: 4.6, 
      reviews: 156,
      category: 'Spicy', 
      description: 'Perfect balance of sweet and tangy flavors with crunchy sev and puffed rice.',
      weight: '200g'
    },
    { 
      id: 6, 
      name: 'Masala Peanuts', 
      price: 159, 
      originalPrice: 189,
      image: '/images/masala_peanut.png', 
      rating: 4.4, 
      reviews: 189,
      category: 'Spicy', 
      description: 'Roasted peanuts coated with spicy masala blend. High in protein and flavor.',
      weight: '250g'
    },
    { 
      id: 7, 
      name: 'Special Mixtures', 
      price: 329, 
      originalPrice: 379,
      image: '/images/mixtures.png', 
      rating: 4.8, 
      reviews: 178,
      category: 'Crunchy', 
      description: 'A delightful mix of various crunchy elements including sev, nuts, and fried lentils.',
      weight: '300g'
    },
    { 
      id: 8, 
      name: 'Moong Dal Namkeen', 
      price: 199, 
      originalPrice: 239,
      image: '/images/moong_dal.png', 
      rating: 4.5, 
      reviews: 145,
      category: 'Healthy', 
      description: 'Crispy roasted moong dal with mild spices. A healthy and protein-rich snack.',
      weight: '200g'
    },
    { 
      id: 9, 
      name: 'Rasgulla', 
      price: 349, 
      originalPrice: 399,
      image: '/images/rasgulla.png', 
      rating: 4.7, 
      reviews: 203,
      category: 'Sweet', 
      description: 'Soft, spongy cheese balls soaked in light sugar syrup. A Bengali delicacy.',
      weight: '500g (10 pieces)'
    },
    { 
      id: 10, 
      name: 'Classic Sev', 
      price: 139, 
      originalPrice: 169,
      image: '/images/sev.png', 
      rating: 4.3, 
      reviews: 167,
      category: 'Crunchy', 
      description: 'Fine gram flour sev with traditional spices. Perfect for garnishing or snacking.',
      weight: '200g'
    },
    { 
      id: 11, 
      name: 'Kaju Katli', 
      price: 549, 
      originalPrice: 649,
      image: '/images/kaju_katli.png', 
      rating: 4.9, 
      reviews: 287,
      category: 'Sweet', 
      description: 'Premium silver-coated cashew sweets made with pure cashews and ghee. A royal delicacy.',
      weight: '500g'
    },
    { 
      id: 12, 
      name: 'Soan Papdi', 
      price: 279, 
      originalPrice: 329,
      image: '/images/soan_papdi.png', 
      rating: 4.6, 
      reviews: 156,
      category: 'Sweet', 
      description: 'Flaky, melt-in-mouth sweet made with gram flour, sugar, and ghee. A traditional favorite.',
      weight: '400g'
    }
  ]

  const categories = ['All', 'Spicy', 'Sweet', 'Crunchy', 'Healthy']

  useEffect(() => {
    setProducts(allProducts)
    setFilteredProducts(allProducts)
  }, [])

  useEffect(() => {
    let filtered = products

    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(product => product.category === selectedCategory)
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Filter by price range
    filtered = filtered.filter(product =>
      product.price >= priceRange[0] && product.price <= priceRange[1]
    )

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price
        case 'price-high':
          return b.price - a.price
        case 'rating':
          return b.rating - a.rating
        case 'name':
        default:
          return a.name.localeCompare(b.name)
      }
    })

    setFilteredProducts(filtered)
  }, [products, selectedCategory, searchTerm, sortBy, priceRange])

  const handleAddToCart = (product) => {
    addToCart(product)
  }

  const handleToggleWishlist = (product) => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id)
    } else {
      addToWishlist(product)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen pt-20 pb-16"
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-4xl md:text-6xl font-bold mb-4"
          >
            Our Products
          </motion.h1>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-xl opacity-90"
          >
            Discover our complete range of delicious namkeens & sweets
          </motion.p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="lg:col-span-1"
          >
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <FiFilter />
                Filters
              </h3>

              {/* Search */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">Search</label>
                <div className="relative">
                  <FiSearch className="absolute left-3 top-3 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Categories */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">Category</label>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`w-full text-left px-3 py-2 rounded-lg transition-colors duration-200 ${
                        selectedCategory === category
                          ? 'bg-orange-500 text-white'
                          : 'hover:bg-gray-100'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">
                  Price Range: ₹{priceRange[0]} - ₹{priceRange[1]}
                </label>
                <input
                  type="range"
                  min="0"
                  max="500"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                  className="w-full"
                />
              </div>

              {/* Sort By */}
              <div>
                <label className="block text-sm font-medium mb-2">Sort By</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                >
                  <option value="name">Name</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Rating</option>
                </select>
              </div>
            </div>
          </motion.div>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            {/* View Toggle and Results Count */}
            <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
              <p className="text-gray-600 mb-4 sm:mb-0">
                Showing {filteredProducts.length} of {products.length} products
              </p>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg ${
                    viewMode === 'grid' ? 'bg-orange-500 text-white' : 'bg-gray-200'
                  }`}
                >
                  <FiGrid />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg ${
                    viewMode === 'list' ? 'bg-orange-500 text-white' : 'bg-gray-200'
                  }`}
                >
                  <FiList />
                </button>
              </div>
            </div>

            {/* Products */}
            <AnimatePresence mode="wait">
              <motion.div
                key={viewMode}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className={`grid gap-6 ${
                  viewMode === 'grid'
                    ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3'
                    : 'grid-cols-1'
                }`}
              >
                {filteredProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    className={`bg-white rounded-2xl shadow-lg overflow-hidden group ${
                      viewMode === 'list' ? 'flex' : ''
                    }`}
                  >
                    <div className={`${viewMode === 'list' ? 'w-48 flex-shrink-0' : 'w-full'} relative`}>
                      <Link to={`/product/${product.id}`}>
                        <div className="h-48 bg-gray-50 flex items-center justify-center cursor-pointer hover:scale-105 transition-transform duration-300 overflow-hidden">
                          <img 
                            src={product.image} 
                            alt={product.name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.target.style.display = 'none'
                              e.target.nextSibling.style.display = 'flex'
                            }}
                          />
                          <div className="hidden w-full h-full bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 items-center justify-center text-white text-2xl font-bold">
                            {product.name.charAt(0)}
                          </div>
                        </div>
                      </Link>
                      
                      {/* Wishlist Heart Button */}
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleToggleWishlist(product)}
                        className={`absolute top-3 right-3 p-2 rounded-full shadow-lg transition-all duration-300 ${
                          isInWishlist(product.id)
                            ? 'bg-red-500 text-white'
                            : 'bg-white/90 hover:bg-white text-gray-600 hover:text-red-500'
                        }`}
                      >
                        <FiHeart className={`w-4 h-4 ${isInWishlist(product.id) ? 'fill-current' : ''}`} />
                      </motion.button>
                    </div>
                    
                    <div className={`p-6 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs bg-orange-100 text-orange-600 px-2 py-1 rounded-full font-semibold">
                          {product.category}
                        </span>
                        <div className="flex items-center">
                          <FiStar className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="text-sm font-semibold ml-1">{product.rating}</span>
                        </div>
                      </div>
                      
                      <Link to={`/product/${product.id}`}>
                        <h3 className="font-bold text-lg mb-2 group-hover:text-orange-500 transition-colors duration-300 cursor-pointer">
                          {product.name}
                        </h3>
                      </Link>
                      
                      <p className="text-gray-600 text-sm mb-2">{product.description}</p>
                      <p className="text-gray-500 text-xs mb-4 font-medium">{product.weight}</p>
                      
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <p className="text-xl font-bold text-orange-600">₹{product.price}</p>
                          {product.originalPrice && (
                            <p className="text-sm text-gray-500 line-through">₹{product.originalPrice}</p>
                          )}
                        </div>
                        {product.originalPrice && (
                          <span className="bg-green-100 text-green-600 px-2 py-1 rounded-full text-xs font-semibold">
                            {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                          </span>
                        )}
                      </div>
                      
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleAddToCart(product)}
                        className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 rounded-xl hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 font-semibold"
                      >
                        <FiShoppingCart />
                        Add to Cart
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>

            {filteredProducts.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-16"
              >
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-2xl font-bold mb-2">No products found</h3>
                <p className="text-gray-600">Try adjusting your filters or search terms</p>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default ShopPage