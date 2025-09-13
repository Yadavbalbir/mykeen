import React, { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiStar, FiShoppingCart, FiHeart, FiShare2, FiTruck, FiShield, FiRefreshCcw, FiMinus, FiPlus, FiArrowLeft } from 'react-icons/fi'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'

const ProductDetailsPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addToCart } = useCart()
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist()
  const [product, setProduct] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)
  const [activeTab, setActiveTab] = useState('description')
  const [loading, setLoading] = useState(true)

  // Sample products data (in a real app, this would come from an API)
  const allProducts = [
    { 
      id: 1, 
      name: 'Aloo Bhujia', 
      price: 299, 
      originalPrice: 349,
      image: '/images/aloo_bhujhia.png', 
      images: ['/images/aloo_bhujhia.png', '/images/aloo_bhujhia.png', '/images/aloo_bhujhia.png'],
      rating: 4.8, 
      reviews: 142,
      category: 'Spicy', 
      description: 'Crispy potato-based bhujia with traditional spices and herbs. Made with premium ingredients following authentic recipes passed down through generations.',
      ingredients: 'Potato flour, Gram flour, Vegetable oil, Red chili powder, Turmeric, Salt, Cumin powder, Coriander powder, Asafoetida, Black pepper',
      nutritionInfo: {
        calories: '520 per 100g',
        protein: '14g',
        carbs: '52g',
        fat: '28g',
        fiber: '8g'
      },
      features: [
        'Made with fresh potatoes',
        'Traditional recipe',
        'No artificial preservatives',
        'Perfect tea-time snack',
        'Crispy texture'
      ],
      inStock: true,
      stockCount: 50,
      weight: '200g'
    },
    { 
      id: 2, 
      name: 'Premium Chivda Mix', 
      price: 249, 
      originalPrice: 299,
      image: '/images/chivda.png', 
      images: ['/images/chivda.png', '/images/chivda.png', '/images/chivda.png'],
      rating: 4.7, 
      reviews: 198,
      category: 'Crunchy', 
      description: 'Traditional Maharashtrian chivda with peanuts, curry leaves, and aromatic spices. A perfect blend of taste and crunch.',
      ingredients: 'Rice flakes, Peanuts, Curry leaves, Green chilies, Turmeric, Salt, Sugar, Mustard seeds, Vegetable oil, Cashews',
      nutritionInfo: {
        calories: '480 per 100g',
        protein: '12g',
        carbs: '65g',
        fat: '18g',
        fiber: '6g'
      },
      features: [
        'Authentic Maharashtrian recipe',
        'Fresh curry leaves',
        'Premium peanuts and cashews',
        'Light and crunchy',
        'No artificial colors'
      ],
      inStock: true,
      stockCount: 45,
      weight: '250g'
    },
    { 
      id: 3, 
      name: 'Cornflakes Mixture', 
      price: 179, 
      originalPrice: 219,
      image: '/images/cornflakes_mixture.png', 
      images: ['/images/cornflakes_mixture.png', '/images/cornflakes_mixture.png', '/images/cornflakes_mixture.png'],
      rating: 4.5, 
      reviews: 167,
      category: 'Crunchy', 
      description: 'Crunchy cornflakes mixed with nuts, raisins, and light spices for a healthy and delicious snack.',
      ingredients: 'Cornflakes, Cashews, Almonds, Raisins, Vegetable oil, Salt, Sugar, Chat masala, Black pepper',
      nutritionInfo: {
        calories: '420 per 100g',
        protein: '8g',
        carbs: '70g',
        fat: '12g',
        fiber: '4g'
      },
      features: [
        'Healthy breakfast option',
        'Mixed dry fruits',
        'Light spices',
        'Crunchy texture',
        'Energy boosting'
      ],
      inStock: true,
      stockCount: 60,
      weight: '300g'
    },
    { 
      id: 4, 
      name: 'Gulab Jamun', 
      price: 399, 
      originalPrice: 449,
      image: '/images/gulab_jamun.png', 
      images: ['/images/gulab_jamun.png', '/images/gulab_jamun.png', '/images/gulab_jamun.png'],
      rating: 4.9, 
      reviews: 234,
      category: 'Sweet', 
      description: 'Soft, spongy gulab jamuns soaked in rose-flavored sugar syrup. A royal dessert perfect for celebrations.',
      ingredients: 'Milk powder, All-purpose flour, Ghee, Sugar, Rose water, Cardamom powder, Saffron',
      nutritionInfo: {
        calories: '290 per 100g',
        protein: '6g',
        carbs: '45g',
        fat: '10g',
        fiber: '1g'
      },
      features: [
        'Authentic Indian sweet',
        'Rose-flavored syrup',
        'Soft and spongy texture',
        'Perfect for festivals',
        'Made with pure ghee'
      ],
      inStock: true,
      stockCount: 25,
      weight: '500g (12 pieces)'
    },
    { 
      id: 5, 
      name: 'Khatta Meetha', 
      price: 219, 
      originalPrice: 259,
      image: '/images/khatta_meetha.png', 
      images: ['/images/khatta_meetha.png', '/images/khatta_meetha.png', '/images/khatta_meetha.png'],
      rating: 4.6, 
      reviews: 156,
      category: 'Spicy', 
      description: 'Perfect balance of sweet and tangy flavors with crunchy sev and puffed rice. A delightful snack for all ages.',
      ingredients: 'Sev, Puffed rice, Peanuts, Dried mango powder, Tamarind, Jaggery, Salt, Red chili powder, Chat masala',
      nutritionInfo: {
        calories: '450 per 100g',
        protein: '10g',
        carbs: '60g',
        fat: '18g',
        fiber: '5g'
      },
      features: [
        'Sweet and tangy taste',
        'Crunchy texture',
        'Natural ingredients',
        'Popular street food flavor',
        'All age favorite'
      ],
      inStock: true,
      stockCount: 55,
      weight: '200g'
    },
    { 
      id: 6, 
      name: 'Masala Peanuts', 
      price: 159, 
      originalPrice: 189,
      image: '/images/masala_peanut.png', 
      images: ['/images/masala_peanut.png', '/images/masala_peanut.png', '/images/masala_peanut.png'],
      rating: 4.4, 
      reviews: 189,
      category: 'Spicy', 
      description: 'Roasted peanuts coated with spicy masala blend. High in protein and packed with flavors.',
      ingredients: 'Peanuts, Gram flour, Red chili powder, Turmeric, Salt, Garam masala, Vegetable oil, Garlic powder',
      nutritionInfo: {
        calories: '560 per 100g',
        protein: '25g',
        carbs: '20g',
        fat: '40g',
        fiber: '8g'
      },
      features: [
        'High protein snack',
        'Roasted to perfection',
        'Spicy masala coating',
        'Healthy option',
        'Great for parties'
      ],
      inStock: true,
      stockCount: 70,
      weight: '250g'
    },
    { 
      id: 7, 
      name: 'Special Mixtures', 
      price: 329, 
      originalPrice: 379,
      image: '/images/mixtures.png', 
      images: ['/images/mixtures.png', '/images/mixtures.png', '/images/mixtures.png'],
      rating: 4.8, 
      reviews: 178,
      category: 'Crunchy', 
      description: 'A delightful mix of various crunchy elements including sev, nuts, and fried lentils. Perfect variety pack.',
      ingredients: 'Sev, Fried gram dal, Peanuts, Cashews, Raisins, Curry leaves, Vegetable oil, Salt, Turmeric, Red chili powder',
      nutritionInfo: {
        calories: '510 per 100g',
        protein: '16g',
        carbs: '45g',
        fat: '28g',
        fiber: '7g'
      },
      features: [
        'Variety of textures',
        'Premium ingredients',
        'Balanced flavors',
        'Crunchy and satisfying',
        'Traditional recipe'
      ],
      inStock: true,
      stockCount: 40,
      weight: '300g'
    },
    { 
      id: 8, 
      name: 'Moong Dal Namkeen', 
      price: 199, 
      originalPrice: 239,
      image: '/images/moong_dal.png', 
      images: ['/images/moong_dal.png', '/images/moong_dal.png', '/images/moong_dal.png'],
      rating: 4.5, 
      reviews: 145,
      category: 'Healthy', 
      description: 'Crispy roasted moong dal with mild spices. A healthy and protein-rich snack that\'s guilt-free.',
      ingredients: 'Split moong dal, Vegetable oil, Salt, Turmeric, Red chili powder, Asafoetida, Curry leaves',
      nutritionInfo: {
        calories: '380 per 100g',
        protein: '24g',
        carbs: '45g',
        fat: '8g',
        fiber: '12g'
      },
      features: [
        'High protein content',
        'Low fat snack',
        'Rich in fiber',
        'Easy to digest',
        'Healthy option'
      ],
      inStock: true,
      stockCount: 65,
      weight: '200g'
    },
    { 
      id: 9, 
      name: 'Rasgulla', 
      price: 349, 
      originalPrice: 399,
      image: '/images/rasgulla.png', 
      images: ['/images/rasgulla.png', '/images/rasgulla.png', '/images/rasgulla.png'],
      rating: 4.7, 
      reviews: 203,
      category: 'Sweet', 
      description: 'Soft, spongy cheese balls soaked in light sugar syrup. A Bengali delicacy loved across India.',
      ingredients: 'Fresh cottage cheese, Sugar, Water, Cardamom powder, Rose water',
      nutritionInfo: {
        calories: '180 per 100g',
        protein: '8g',
        carbs: '28g',
        fat: '4g',
        fiber: '0g'
      },
      features: [
        'Authentic Bengali sweet',
        'Soft and spongy',
        'Light sugar syrup',
        'Fresh cottage cheese',
        'Traditional preparation'
      ],
      inStock: true,
      stockCount: 30,
      weight: '500g (10 pieces)'
    },
    { 
      id: 10, 
      name: 'Classic Sev', 
      price: 139, 
      originalPrice: 169,
      image: '/images/sev.png', 
      images: ['/images/sev.png', '/images/sev.png', '/images/sev.png'],
      rating: 4.3, 
      reviews: 167,
      category: 'Crunchy', 
      description: 'Fine gram flour sev with traditional spices. Perfect for garnishing or enjoying as a standalone snack.',
      ingredients: 'Gram flour, Vegetable oil, Salt, Turmeric, Red chili powder, Carom seeds, Asafoetida',
      nutritionInfo: {
        calories: '500 per 100g',
        protein: '18g',
        carbs: '50g',
        fat: '24g',
        fiber: '10g'
      },
      features: [
        'Fine texture',
        'Traditional spices',
        'Versatile usage',
        'Crispy and light',
        'Perfect garnish'
      ],
      inStock: true,
      stockCount: 80,
      weight: '200g'
    },
    { 
      id: 11, 
      name: 'Kaju Katli', 
      price: 549, 
      originalPrice: 649,
      image: '/images/kaju_katli.png', 
      images: ['/images/kaju_katli.png', '/images/kaju_katli.png', '/images/kaju_katli.png'],
      rating: 4.9, 
      reviews: 287,
      category: 'Sweet', 
      description: 'Premium silver-coated cashew sweets made with pure cashews and ghee. A royal delicacy perfect for special occasions and festivals.',
      ingredients: 'Premium cashews, Sugar, Pure ghee, Silver leaf (varak), Cardamom powder, Rose water',
      nutritionInfo: {
        calories: '455 per 100g',
        protein: '18g',
        carbs: '38g',
        fat: '25g',
        fiber: '3g'
      },
      features: [
        'Made with premium cashews',
        'Silver leaf coating',
        'Pure ghee used',
        'Royal delicacy',
        'Festival special',
        'Melt-in-mouth texture'
      ],
      inStock: true,
      stockCount: 20,
      weight: '500g'
    },
    { 
      id: 12, 
      name: 'Soan Papdi', 
      price: 279, 
      originalPrice: 329,
      image: '/images/soan_papdi.png', 
      images: ['/images/soan_papdi.png', '/images/soan_papdi.png', '/images/soan_papdi.png'],
      rating: 4.6, 
      reviews: 156,
      category: 'Sweet', 
      description: 'Flaky, melt-in-mouth sweet made with gram flour, sugar, and ghee. A traditional North Indian favorite with delicate layers.',
      ingredients: 'Gram flour, Sugar, Pure ghee, Milk, Cardamom powder, Almonds, Pistachios',
      nutritionInfo: {
        calories: '425 per 100g',
        protein: '10g',
        carbs: '58g',
        fat: '18g',
        fiber: '2g'
      },
      features: [
        'Traditional North Indian sweet',
        'Flaky layered texture',
        'Melt-in-mouth experience',
        'Made with pure ghee',
        'Garnished with nuts',
        'Perfect for sharing'
      ],
      inStock: true,
      stockCount: 35,
      weight: '400g'
    }
  ]

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const foundProduct = allProducts.find(p => p.id === parseInt(id))
      setProduct(foundProduct)
      setLoading(false)
    }, 1000)
  }, [id])

  const handleAddToCart = () => {
    if (product) {
      for (let i = 0; i < quantity; i++) {
        addToCart(product)
      }
      // You could add a toast notification here
    }
  }

  const handleQuantityChange = (change) => {
    setQuantity(prev => Math.max(1, Math.min(prev + change, product?.stockCount || 1)))
  }

  const handleToggleWishlist = () => {
    if (product) {
      if (isInWishlist(product.id)) {
        removeFromWishlist(product.id)
      } else {
        addToWishlist(product)
      }
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen pt-20 pb-16 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-500"></div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen pt-20 pb-16 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">😕</div>
          <h2 className="text-2xl font-bold mb-4">Product not found</h2>
          <Link to="/shop" className="text-orange-500 hover:text-orange-700">
            Back to Shop
          </Link>
        </div>
      </div>
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
        {/* Breadcrumb */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="flex items-center gap-2 mb-8 text-sm text-gray-600"
        >
          <Link to="/" className="hover:text-orange-500">Home</Link>
          <span>/</span>
          <Link to="/shop" className="hover:text-orange-500">Shop</Link>
          <span>/</span>
          <span className="text-gray-900">{product.name}</span>
        </motion.div>

        {/* Back Button */}
        <motion.button
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 mb-8 text-gray-600 hover:text-orange-500 transition-colors duration-200"
        >
          <FiArrowLeft />
          Back
        </motion.button>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="space-y-4"
          >
            <div className="aspect-square bg-gray-50 rounded-3xl flex items-center justify-center overflow-hidden">
              <img 
                src={product.images[selectedImage]} 
                alt={product.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.style.display = 'none'
                  e.target.nextSibling.style.display = 'flex'
                }}
              />
              <div className="hidden w-full h-full bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 items-center justify-center text-white text-6xl font-bold">
                {product.name.charAt(0)}
              </div>
            </div>
            
            {/* Image thumbnails */}
            <div className="flex gap-4 justify-center">
              {product.images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`w-20 h-20 rounded-2xl flex items-center justify-center overflow-hidden transition-all duration-200 ${
                    selectedImage === index 
                      ? 'ring-4 ring-orange-500 ring-offset-2' 
                      : 'hover:ring-2 hover:ring-orange-300'
                  }`}
                >
                  <img 
                    src={img} 
                    alt={`${product.name} view ${index + 1}`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.style.display = 'none'
                      e.target.nextSibling.style.display = 'flex'
                    }}
                  />
                  <div className="hidden w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 items-center justify-center text-gray-600 text-lg font-bold">
                    {product.name.charAt(0)}
                  </div>
                </button>
              ))}
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="space-y-6"
          >
            <div>
              <span className="inline-block bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-sm font-semibold mb-4">
                {product.category}
              </span>
              <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
              
              {/* Rating */}
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <FiStar
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                      }`}
                    />
                  ))}
                  <span className="ml-2 font-semibold">{product.rating}</span>
                </div>
                <span className="text-gray-600">({product.reviews} reviews)</span>
              </div>

              {/* Price */}
              <div className="flex items-center gap-4 mb-6">
                <span className="text-4xl font-bold text-orange-600">₹{product.price}</span>
                {product.originalPrice && (
                  <span className="text-2xl text-gray-500 line-through">₹{product.originalPrice}</span>
                )}
                {product.originalPrice && (
                  <span className="bg-green-100 text-green-600 px-2 py-1 rounded-full text-sm font-semibold">
                    Save ₹{product.originalPrice - product.price}
                  </span>
                )}
              </div>
            </div>

            {/* Stock Status */}
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${product.inStock ? 'bg-green-500' : 'bg-red-500'}`}></div>
              <span className={`font-semibold ${product.inStock ? 'text-green-600' : 'text-red-600'}`}>
                {product.inStock ? `In Stock (${product.stockCount} left)` : 'Out of Stock'}
              </span>
            </div>

            {/* Quantity Selector */}
            <div className="space-y-4">
              <label className="block text-sm font-medium">Quantity</label>
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button
                    onClick={() => handleQuantityChange(-1)}
                    className="p-2 hover:bg-gray-100 transition-colors duration-200"
                    disabled={quantity <= 1}
                  >
                    <FiMinus />
                  </button>
                  <span className="px-4 py-2 font-semibold">{quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(1)}
                    className="p-2 hover:bg-gray-100 transition-colors duration-200"
                    disabled={quantity >= product.stockCount}
                  >
                    <FiPlus />
                  </button>
                </div>
                <span className="text-gray-600">
                  Total: ₹{product.price * quantity}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 text-white py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <FiShoppingCart />
                Add to Cart
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleToggleWishlist}
                className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                  isInWishlist(product?.id) 
                    ? 'border-red-500 text-red-500 bg-red-50' 
                    : 'border-gray-300 text-gray-500 hover:border-red-500 hover:text-red-500'
                }`}
              >
                <FiHeart className={isInWishlist(product?.id) ? 'fill-current' : ''} />
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-4 rounded-xl border-2 border-gray-300 text-gray-500 hover:border-orange-500 hover:text-orange-500 transition-all duration-300"
              >
                <FiShare2 />
              </motion.button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-3 gap-4 py-6 border-t border-b">
              <div className="text-center">
                <FiTruck className="w-8 h-8 mx-auto mb-2 text-orange-500" />
                <p className="text-sm font-semibold">Free Delivery</p>
                <p className="text-xs text-gray-600">On orders above ₹500</p>
              </div>
              <div className="text-center">
                <FiShield className="w-8 h-8 mx-auto mb-2 text-orange-500" />
                <p className="text-sm font-semibold">Quality Assured</p>
                <p className="text-xs text-gray-600">Premium ingredients</p>
              </div>
              <div className="text-center">
                <FiRefreshCcw className="w-8 h-8 mx-auto mb-2 text-orange-500" />
                <p className="text-sm font-semibold">Easy Returns</p>
                <p className="text-xs text-gray-600">7-day return policy</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Product Details Tabs */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-16"
        >
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8">
              {['description', 'ingredients', 'nutrition', 'reviews'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm capitalize transition-colors duration-200 ${
                    activeTab === tab
                      ? 'border-orange-500 text-orange-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </nav>
          </div>

          <div className="py-8">
            {activeTab === 'description' && (
              <div className="space-y-4">
                <p className="text-gray-700 text-lg leading-relaxed">{product.description}</p>
                <ul className="space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {activeTab === 'ingredients' && (
              <div>
                <h3 className="text-lg font-semibold mb-4">Ingredients</h3>
                <p className="text-gray-700">{product.ingredients}</p>
              </div>
            )}

            {activeTab === 'nutrition' && (
              <div>
                <h3 className="text-lg font-semibold mb-4">Nutrition Information</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {Object.entries(product.nutritionInfo).map(([key, value]) => (
                    <div key={key} className="flex justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="font-medium capitalize">{key}:</span>
                      <span>{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div>
                <h3 className="text-lg font-semibold mb-4">Customer Reviews</h3>
                <div className="space-y-6">
                  {/* Sample reviews */}
                  {[
                    { name: 'Priya S.', rating: 5, comment: 'Absolutely delicious! The spice level is perfect and the quality is outstanding.', date: '2 days ago' },
                    { name: 'Rajesh K.', rating: 4, comment: 'Great taste and fresh quality. Will definitely order again.', date: '1 week ago' },
                    { name: 'Meera R.', rating: 5, comment: 'Best namkeen I have ever tasted. Highly recommended!', date: '2 weeks ago' }
                  ].map((review, index) => (
                    <div key={index} className="border-b border-gray-200 pb-4">
                      <div className="flex items-center gap-4 mb-2">
                        <span className="font-semibold">{review.name}</span>
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <FiStar
                              key={i}
                              className={`w-4 h-4 ${
                                i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-gray-500">{review.date}</span>
                      </div>
                      <p className="text-gray-700">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default ProductDetailsPage