import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiCheckCircle, FiTruck, FiPackage, FiHome, FiMail } from 'react-icons/fi'

const OrderConfirmationPage = () => {
  const location = useLocation()
  const orderData = location.state?.orderData

  if (!orderData) {
    return (
      <div className="min-h-screen pt-20 pb-16 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Order not found</h2>
          <Link to="/shop" className="text-orange-500 hover:text-orange-700">
            Continue Shopping
          </Link>
        </div>
      </div>
    )
  }

  const { orderId, items, total, shippingAddress } = orderData

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen pt-20 pb-16 bg-gradient-to-br from-green-50 to-blue-50"
    >
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Success Header */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-12"
        >
          <div className="text-8xl mb-6">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="inline-block"
            >
              🎉
            </motion.div>
          </div>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            <FiCheckCircle className="text-6xl text-green-500 mx-auto mb-4" />
            <h1 className="text-4xl font-bold mb-4 text-gray-800">Order Confirmed!</h1>
            <p className="text-xl text-gray-600 mb-2">Thank you for your purchase</p>
            <p className="text-lg text-gray-500">Order ID: <span className="font-semibold text-orange-600">{orderId}</span></p>
          </motion.div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Order Details */}
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-2xl shadow-lg p-6"
          >
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <FiPackage />
              Order Details
            </h3>
            
            <div className="space-y-4 mb-6">
              {items.map((item) => (
                <div key={item.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                  <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 rounded-lg flex items-center justify-center text-2xl">
                    {item.image}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold">{item.name}</h4>
                    <p className="text-gray-600 text-sm">{item.category}</p>
                    <p className="text-sm">Quantity: {item.quantity}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">₹{item.price}</p>
                    <p className="text-sm text-gray-600">× {item.quantity}</p>
                    <p className="font-bold text-orange-600">₹{item.price * item.quantity}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="border-t pt-4">
              <div className="flex justify-between text-xl font-bold">
                <span>Total Paid</span>
                <span className="text-green-600">₹{total}</span>
              </div>
            </div>
          </motion.div>

          {/* Shipping & Status */}
          <div className="space-y-6">
            {/* Shipping Address */}
            <motion.div
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-2xl shadow-lg p-6"
            >
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <FiHome />
                Shipping Address
              </h3>
              <div className="text-gray-700">
                <p className="font-semibold">{shippingAddress.name}</p>
                <p>{shippingAddress.address}</p>
                <p>{shippingAddress.city}, {shippingAddress.state}</p>
                <p>{shippingAddress.pincode}</p>
              </div>
            </motion.div>

            {/* Order Status */}
            <motion.div
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="bg-white rounded-2xl shadow-lg p-6"
            >
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <FiTruck />
                Order Status
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                    <FiCheckCircle className="text-white text-sm" />
                  </div>
                  <div>
                    <p className="font-semibold">Order Confirmed</p>
                    <p className="text-sm text-gray-600">We've received your order</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
                    <FiPackage className="text-white text-sm" />
                  </div>
                  <div>
                    <p className="font-semibold">Processing</p>
                    <p className="text-sm text-gray-600">Your order is being prepared</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 opacity-50">
                  <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                    <FiTruck className="text-white text-sm" />
                  </div>
                  <div>
                    <p className="font-semibold">Shipped</p>
                    <p className="text-sm text-gray-600">Expected in 2-3 business days</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 opacity-50">
                  <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                    <FiHome className="text-white text-sm" />
                  </div>
                  <div>
                    <p className="font-semibold">Delivered</p>
                    <p className="text-sm text-gray-600">We'll notify you when delivered</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Email Notification */}
            <motion.div
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="bg-blue-50 border border-blue-200 rounded-2xl p-6"
            >
              <div className="flex items-center gap-3 mb-3">
                <FiMail className="text-blue-600 text-xl" />
                <h4 className="font-semibold text-blue-800">Email Confirmation Sent</h4>
              </div>
              <p className="text-blue-700 text-sm">
                We've sent a confirmation email with your order details and tracking information.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Action Buttons */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mt-12"
        >
          <Link to="/shop">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Continue Shopping
            </motion.button>
          </Link>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.print()}
            className="border-2 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300"
          >
            Print Order
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default OrderConfirmationPage