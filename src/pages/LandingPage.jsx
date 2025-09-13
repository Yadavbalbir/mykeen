import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FiArrowRight, FiStar, FiTruck, FiShield, FiHeart, FiAward, FiUsers, FiCheckCircle, FiPlus, FiMinus, FiShoppingCart, FiMessageCircle } from 'react-icons/fi'

const LandingPage = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isVisible, setIsVisible] = useState({})
  const [activeTestimonial, setActiveTestimonial] = useState(0)
  const [openFAQ, setOpenFAQ] = useState(null)

  // Featured products with real data
  const featuredProducts = [
    { 
      id: 11, 
      name: 'Kaju Katli', 
      price: 549, 
      originalPrice: 649,
      image: '/images/kaju_katli.png', 
      rating: 4.9, 
      category: 'Sweet',
      description: 'Premium silver-coated cashew sweets'
    },
    { 
      id: 1, 
      name: 'Aloo Bhujia', 
      price: 299, 
      originalPrice: 349,
      image: '/images/aloo_bhujhia.png', 
      rating: 4.8, 
      category: 'Spicy',
      description: 'Crispy potato-based bhujia with spices'
    },
    { 
      id: 7, 
      name: 'Special Mixtures', 
      price: 329, 
      originalPrice: 379,
      image: '/images/mixtures.png', 
      rating: 4.8, 
      category: 'Crunchy',
      description: 'Delightful mix of crunchy elements'
    },
    { 
      id: 4, 
      name: 'Gulab Jamun', 
      price: 399, 
      originalPrice: 449,
      image: '/images/gulab_jamun.png', 
      rating: 4.9, 
      category: 'Sweet',
      description: 'Soft gulab jamuns in rose syrup'
    }
  ]

  // Testimonials data
  const testimonials = [
    {
      name: 'Priya Sharma',
      location: 'Mumbai, Maharashtra',
      rating: 5,
      text: 'MyKeen has become our family\'s favorite snack brand. The quality is exceptional and the taste reminds me of my grandmother\'s homemade namkeen. Highly recommended!',
      image: '👩🏻‍💼'
    },
    {
      name: 'Rajesh Kumar',
      location: 'Delhi, NCR',
      rating: 5,
      text: 'I\'ve tried many brands but MyKeen stands out. Their Kaju Katli is absolutely divine and the packaging keeps everything fresh. Will definitely order again!',
      image: '👨🏻‍💻'
    },
    {
      name: 'Meera Patel',
      location: 'Ahmedabad, Gujarat',
      rating: 5,
      text: 'As someone who loves traditional sweets and namkeen, MyKeen exceeded my expectations. The authenticity in taste and premium quality ingredients are evident.',
      image: '👩🏻‍🍳'
    },
    {
      name: 'Amit Singh',
      location: 'Pune, Maharashtra',
      rating: 5,
      text: 'Fast delivery, excellent packaging, and most importantly - amazing taste! MyKeen has made our evening tea time so much more special.',
      image: '👨🏻‍🎓'
    }
  ]

  // FAQ data
  const faqs = [
    {
      question: 'What makes MyKeen products special?',
      answer: 'Our products are made with premium ingredients using traditional recipes passed down through generations. We maintain strict quality control and use no artificial preservatives.'
    },
    {
      question: 'How long do the products stay fresh?',
      answer: 'All our products come with a shelf life of 3-6 months depending on the item. We use airtight packaging to ensure maximum freshness and taste retention.'
    },
    {
      question: 'Do you offer same-day delivery?',
      answer: 'Yes! We offer same-day delivery in select cities including Mumbai, Delhi, Bangalore, and Pune. For other locations, we provide next-day delivery.'
    },
    {
      question: 'Are your products suitable for gifting?',
      answer: 'Absolutely! We offer beautiful gift packaging options perfect for festivals, celebrations, and corporate gifting. Many customers choose us for Diwali and wedding gifts.'
    },
    {
      question: 'What if I\'m not satisfied with my order?',
      answer: 'We offer a 100% satisfaction guarantee. If you\'re not happy with your order, contact us within 7 days for a full refund or replacement.'
    },
    {
      question: 'Do you have sugar-free options?',
      answer: 'Yes, we have a range of sugar-free sweets and healthy namkeen options. Check our "Healthy" category for diabetes-friendly and low-sugar alternatives.'
    }
  ]

  // Auto-advance slider
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featuredProducts.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  // Auto-advance testimonials
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [])

  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(prev => ({
              ...prev,
              [entry.target.id]: true
            }))
          }
        })
      },
      { threshold: 0.1 }
    )

    const elements = document.querySelectorAll('[data-animate]')
    elements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-screen"
    >
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative pt-16 overflow-hidden bg-gradient-to-br from-orange-50 via-yellow-50 to-red-50">
        {/* Background Animation */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                width: Math.random() * 120 + 60,
                height: Math.random() * 120 + 60,
                left: Math.random() * 100 + '%',
                top: Math.random() * 100 + '%',
                background: `linear-gradient(135deg, ${
                  ['#ff6b35', '#f7931e', '#ffb347', '#ff8c42'][Math.floor(Math.random() * 4)]
                }20, ${
                  ['#ff6b35', '#f7931e', '#ffb347', '#ff8c42'][Math.floor(Math.random() * 4)]
                }10)`,
              }}
              animate={{
                y: [0, -40, 0],
                x: [0, Math.random() * 30 - 15, 0],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: Math.random() * 4 + 6,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>

        <div className="text-center max-w-7xl mx-auto px-4 z-10">
          <motion.div variants={itemVariants}>
            <motion.div
              className="inline-block mb-6"
              whileHover={{ scale: 1.05 }}
            >
              <span className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-full text-sm font-semibold shadow-lg">
                🏆 India's Premium Namkeen Brand
              </span>
            </motion.div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold mb-8 leading-tight">
              <motion.span
                className="bg-gradient-to-r from-orange-600 via-yellow-500 to-red-600 bg-clip-text text-transparent"
                animate={{ 
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                  backgroundSize: ['200% 200%', '200% 200%', '200% 200%']
                }}
                transition={{ duration: 4, repeat: Infinity }}
                style={{ backgroundImage: 'linear-gradient(90deg, #ea580c, #eab308, #dc2626, #ea580c)' }}
              >
                MyKeen
              </motion.span>
              <br />
              <span className="text-gray-800 text-4xl md:text-6xl lg:text-7xl">Where Tradition Meets</span>
              <br />
              <motion.span
                className="bg-gradient-to-r from-red-500 to-orange-600 bg-clip-text text-transparent text-5xl md:text-7xl lg:text-8xl"
                whileHover={{ scale: 1.02 }}
              >
                Taste Perfection
              </motion.span>
            </h1>
          </motion.div>

          <motion.div variants={itemVariants}>
            <p className="text-xl md:text-2xl mb-12 text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Experience the authentic flavors of India with our handcrafted namkeen and sweets. 
              Made with premium ingredients and generations-old recipes that bring families together.
            </p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-6 justify-center mb-12"
          >
            <Link to="/shop">
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 25px 50px rgba(251, 146, 60, 0.4)" }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-12 py-5 rounded-2xl text-xl font-semibold shadow-2xl flex items-center gap-3 group"
              >
                <FiShoppingCart />
                Shop Now
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <FiArrowRight />
                </motion.div>
              </motion.button>
            </Link>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="border-2 border-orange-500 text-orange-500 px-12 py-5 rounded-2xl text-xl font-semibold hover:bg-orange-500 hover:text-white transition-all duration-300 shadow-lg"
            >
              View Collection
            </motion.button>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-wrap justify-center gap-8 text-gray-600"
          >
            <div className="flex items-center gap-2">
              <FiUsers className="text-orange-500" />
              <span className="font-semibold">50,000+ Happy Customers</span>
            </div>
            <div className="flex items-center gap-2">
              <FiStar className="text-yellow-500 fill-current" />
              <span className="font-semibold">4.9/5 Average Rating</span>
            </div>
            <div className="flex items-center gap-2">
              <FiTruck className="text-green-500" />
              <span className="font-semibold">Free Delivery Available</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section id="featured" data-animate className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            className="text-center mb-20"
            variants={containerVariants}
            initial="hidden"
            animate={isVisible.featured ? "visible" : "hidden"}
          >
            <motion.div variants={itemVariants}>
              <span className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-full text-sm font-semibold shadow-lg inline-block mb-6">
                ⭐ Bestsellers
              </span>
              <h2 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
                Customer
                <span className="bg-gradient-to-r from-red-500 to-orange-600 bg-clip-text text-transparent"> Favorites</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Discover the products that have won hearts across India. Each item is crafted with love and premium ingredients.
              </p>
            </motion.div>
          </motion.div>

          {/* Products Grid */}
          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate={isVisible.featured ? "visible" : "hidden"}
          >
            {featuredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                variants={itemVariants}
                whileHover={{ y: -10, scale: 1.02 }}
                className="bg-white rounded-3xl shadow-xl overflow-hidden group border border-gray-100"
              >
                <div className="relative h-64 bg-gradient-to-br from-orange-100 to-red-100 overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    onError={(e) => {
                      e.target.style.display = 'none'
                      e.target.nextSibling.style.display = 'flex'
                    }}
                  />
                  <div className="hidden w-full h-full bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 items-center justify-center text-white text-6xl font-bold">
                    {product.name.charAt(0)}
                  </div>
                  <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-xs font-semibold">
                      {product.category}
                    </span>
                    <div className="flex items-center">
                      <FiStar className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-semibold ml-1">{product.rating}</span>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-2 group-hover:text-orange-500 transition-colors duration-300">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">{product.description}</p>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-orange-600">₹{product.price}</span>
                      <span className="text-sm text-gray-500 line-through">₹{product.originalPrice}</span>
                    </div>
                  </div>
                  
                  <Link to={`/product/${product.id}`}>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      View Details
                    </motion.button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div 
            className="text-center mt-12"
            variants={itemVariants}
            initial="hidden"
            animate={isVisible.featured ? "visible" : "hidden"}
          >
            <Link to="/shop">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white px-10 py-4 rounded-2xl text-lg font-semibold transition-all duration-300 shadow-lg"
              >
                View All Products
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section id="features" data-animate className="py-24 bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-500 transform rotate-12 scale-150"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <motion.div
            className="text-center mb-20"
            variants={containerVariants}
            initial="hidden"
            animate={isVisible.features ? "visible" : "hidden"}
          >
            <motion.div variants={itemVariants}>
              <span className="bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-full text-sm font-semibold shadow-lg inline-block mb-6">
                🎯 Why MyKeen?
              </span>
              <h2 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
                The MyKeen
                <span className="bg-gradient-to-r from-yellow-400 to-orange-300 bg-clip-text text-transparent"> Difference</span>
              </h2>
              <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
                We don't just make snacks; we create experiences that bring families together and keep traditions alive.
              </p>
            </motion.div>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate={isVisible.features ? "visible" : "hidden"}
          >
            {[
              { 
                title: 'Premium Quality', 
                icon: FiShield, 
                desc: 'Finest ingredients sourced from trusted suppliers across India',
                color: 'from-blue-400 to-blue-600'
              },
              { 
                title: 'Fast Delivery', 
                icon: FiTruck, 
                desc: 'Same-day delivery in major cities, next-day everywhere else',
                color: 'from-green-400 to-green-600'
              },
              { 
                title: 'Customer Love', 
                icon: FiHeart, 
                desc: 'Over 50,000 satisfied customers and counting every day',
                color: 'from-pink-400 to-pink-600'
              },
              { 
                title: 'Authentic Taste', 
                icon: FiAward, 
                desc: 'Traditional recipes passed down through generations',
                color: 'from-yellow-400 to-yellow-600'
              }
            ].map((item, index) => (
              <motion.div
                key={item.title}
                variants={itemVariants}
                whileHover={{ scale: 1.05, y: -10 }}
                className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20 text-center group hover:bg-white/20 transition-all duration-300"
              >
                <motion.div
                  className={`w-20 h-20 bg-gradient-to-r ${item.color} rounded-2xl flex items-center justify-center text-3xl mb-6 shadow-2xl mx-auto`}
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                >
                  <item.icon className="text-white" />
                </motion.div>
                <h3 className="text-2xl font-bold mb-4 group-hover:text-yellow-300 transition-colors duration-300">{item.title}</h3>
                <p className="text-white/90 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" data-animate className="py-24 bg-gradient-to-br from-orange-50 to-red-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            className="text-center mb-20"
            variants={containerVariants}
            initial="hidden"
            animate={isVisible.testimonials ? "visible" : "hidden"}
          >
            <motion.div variants={itemVariants}>
              <span className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-full text-sm font-semibold shadow-lg inline-block mb-6">
                💬 Customer Stories
              </span>
              <h2 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
                What Our
                <span className="bg-gradient-to-r from-red-500 to-orange-600 bg-clip-text text-transparent"> Customers Say</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Real stories from real customers who have experienced the MyKeen difference.
              </p>
            </motion.div>
          </motion.div>

          <motion.div
            className="relative max-w-4xl mx-auto"
            variants={containerVariants}
            initial="hidden"
            animate={isVisible.testimonials ? "visible" : "hidden"}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTestimonial}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-3xl shadow-2xl p-12 text-center relative"
              >
                <FiMessageCircle className="text-6xl text-orange-200 absolute top-8 left-8" />
                
                <div className="text-6xl mb-6">{testimonials[activeTestimonial].image}</div>
                
                <div className="flex justify-center mb-6">
                  {[...Array(testimonials[activeTestimonial].rating)].map((_, i) => (
                    <FiStar key={i} className="w-8 h-8 text-yellow-400 fill-current" />
                  ))}
                </div>
                
                <p className="text-xl text-gray-700 mb-8 leading-relaxed italic">
                  "{testimonials[activeTestimonial].text}"
                </p>
                
                <div>
                  <h4 className="text-2xl font-bold text-gray-900 mb-2">
                    {testimonials[activeTestimonial].name}
                  </h4>
                  <p className="text-gray-600 font-medium">
                    {testimonials[activeTestimonial].location}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Testimonial Navigation */}
            <div className="flex justify-center mt-8 space-x-3">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTestimonial(index)}
                  className={`w-4 h-4 rounded-full transition-all duration-300 ${
                    index === activeTestimonial ? 'bg-orange-500 w-12' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" data-animate className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            className="text-center mb-20"
            variants={containerVariants}
            initial="hidden"
            animate={isVisible.faq ? "visible" : "hidden"}
          >
            <motion.div variants={itemVariants}>
              <span className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-full text-sm font-semibold shadow-lg inline-block mb-6">
                ❓ Got Questions?
              </span>
              <h2 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
                Frequently Asked
                <span className="bg-gradient-to-r from-red-500 to-orange-600 bg-clip-text text-transparent"> Questions</span>
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed">
                Everything you need to know about MyKeen products and services.
              </p>
            </motion.div>
          </motion.div>

          <motion.div
            className="space-y-4"
            variants={containerVariants}
            initial="hidden"
            animate={isVisible.faq ? "visible" : "hidden"}
          >
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="border border-gray-200 rounded-2xl overflow-hidden shadow-lg"
              >
                <button
                  onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                  className="w-full px-8 py-6 text-left bg-white hover:bg-gray-50 transition-colors duration-300 flex items-center justify-between"
                >
                  <span className="text-lg font-semibold text-gray-900 pr-4">
                    {faq.question}
                  </span>
                  <motion.div
                    animate={{ rotate: openFAQ === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {openFAQ === index ? <FiMinus className="text-orange-500" /> : <FiPlus className="text-orange-500" />}
                  </motion.div>
                </button>
                <AnimatePresence>
                  {openFAQ === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-8 py-6 bg-gray-50 border-t border-gray-200">
                        <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section id="cta" data-animate className="py-32 bg-gradient-to-br from-orange-500 via-red-500 to-pink-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-white"
              style={{
                width: Math.random() * 100 + 50,
                height: Math.random() * 100 + 50,
                left: Math.random() * 100 + '%',
                top: Math.random() * 100 + '%',
              }}
              animate={{
                y: [0, -50, 0],
                opacity: [0.1, 0.3, 0.1],
              }}
              transition={{
                duration: Math.random() * 4 + 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
        
        <div className="text-center max-w-5xl mx-auto px-4 relative z-10">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isVisible.cta ? "visible" : "hidden"}
          >
            <motion.div variants={itemVariants}>
              <span className="bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-full text-sm font-semibold shadow-lg inline-block mb-8">
                🚀 Ready to Experience MyKeen?
              </span>
              <h2 className="text-5xl md:text-8xl font-bold mb-8 leading-tight">
                Start Your
                <br />
                <span className="bg-gradient-to-r from-yellow-300 to-white bg-clip-text text-transparent">
                  Flavor Journey
                </span>
                <br />
                Today
              </h2>
              <p className="text-2xl mb-12 text-white/90 max-w-3xl mx-auto leading-relaxed">
                Join thousands of satisfied customers and discover why MyKeen is India's most loved snack brand.
              </p>
            </motion.div>
            
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-6 justify-center mb-12"
            >
              <Link to="/shop">
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 25px 50px rgba(0, 0, 0, 0.3)" }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white text-orange-600 px-12 py-5 rounded-2xl text-xl font-bold shadow-2xl flex items-center gap-3"
                >
                  <FiShoppingCart />
                  Shop Now & Save 20%
                </motion.button>
              </Link>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-white text-white px-12 py-5 rounded-2xl text-xl font-semibold hover:bg-white hover:text-orange-600 transition-all duration-300 shadow-xl"
              >
                Contact Us
              </motion.button>
            </motion.div>
            
            <motion.div 
              variants={itemVariants}
              className="flex flex-wrap justify-center gap-8 text-white/90"
            >
              <div className="flex items-center gap-2">
                <FiCheckCircle className="text-green-300" />
                <span className="font-semibold">Free Shipping on ₹500+</span>
              </div>
              <div className="flex items-center gap-2">
                <FiCheckCircle className="text-green-300" />
                <span className="font-semibold">100% Quality Guarantee</span>
              </div>
              <div className="flex items-center gap-2">
                <FiCheckCircle className="text-green-300" />
                <span className="font-semibold">Same Day Delivery</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </motion.div>
  )
}

export default LandingPage