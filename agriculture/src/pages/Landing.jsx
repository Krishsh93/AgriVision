import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaLeaf, FaSeedling, FaCloudRain, FaRobot, FaChartLine, FaShieldAlt } from 'react-icons/fa';
import image from "../assets/image.png"
const Landing = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat w-full h-full" 
          style={{
            backgroundImage: `url(${image})`,
            backgroundSize: 'cover'
          }}>
          <div className="absolute inset-0 bg-gradient-to-r from-green-900/80 to-blue-900/60"></div>
        </div>

        {/* Animated plants */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {Array.from({ length: 15 }).map((_, index) => (
            <motion.div
              key={index}
              className="absolute text-green-500 opacity-30"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                fontSize: `${Math.random() * 2 + 1}rem`,
              }}
              animate={{
                y: [0, -10, 0],
                rotate: [0, Math.random() > 0.5 ? 5 : -5, 0],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: Math.random() * 2,
              }}
            >
              <FaSeedling />
            </motion.div>
          ))}
        </div>
        
        {/* Hero Content */}
        <div className="container mx-auto px-4 relative z-10 text-white text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex justify-center mb-6">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ 
                  duration: 4,
                  repeat: Infinity,
                  repeatType: "loop",
                  ease: "easeInOut" 
                }}
              >
                <FaLeaf className="text-green-400 text-6xl" />
              </motion.div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="text-green-400">AI-Powered</span> Smart Farming
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-gray-200">
              Revolutionizing agriculture with cutting-edge technology for sustainable and efficient farming solutions.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 max-w-md mx-auto">
              <Link 
                to="/register"
                className="w-full sm:w-auto px-8 py-3 bg-green-600 hover:bg-green-700 rounded-full font-medium text-lg transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Get Started
              </Link>
              <Link 
                to="/login"
                className="w-full sm:w-auto px-8 py-3 bg-transparent border-2 border-white hover:bg-white/10 rounded-full font-medium text-lg transition-all"
              >
                Login
              </Link>
            </div>
          </motion.div>
        </div>
        
        {/* Scroll indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <svg className="w-6 h-10" viewBox="0 0 24 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="1" y="1" width="22" height="38" rx="11" stroke="currentColor" strokeWidth="2"/>
            <motion.circle 
              cx="12" 
              cy="12" 
              r="4" 
              fill="currentColor"
              animate={{ y: [0, 16, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, repeatType: "loop" }}
            />
          </svg>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-b from-green-50 to-blue-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Intelligent Farming Solutions</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our AI-driven platform provides comprehensive tools to optimize your agricultural operations
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <FeatureCard key={index} feature={feature} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">How It Works</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Transforming farming with AI is simple with our intuitive platform
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Connection line */}
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-green-200 z-0 transform -translate-y-1/2"></div>
            
            {steps.map((step, index) => (
              <StepCard key={index} step={step} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gradient-to-b from-blue-50 to-green-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Success Stories</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              See how our platform has helped farmers across the world
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard key={index} testimonial={testimonial} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-green-700 text-white relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-40 h-40 opacity-10">
          <svg viewBox="0 0 200 200" fill="currentColor">
            <path d="M20,180 Q60,120 20,60 Q80,100 140,60 Q100,120 140,180 Q80,140 20,180 Z" />
          </svg>
        </div>
        <div className="absolute bottom-0 right-0 w-48 h-48 opacity-10">
          <svg viewBox="0 0 200 200" fill="currentColor">
            <path d="M100,20 Q140,80 180,40 Q120,100 180,160 Q140,120 100,180 Q60,120 20,160 Q80,100 20,40 Q60,80 100,20 Z" />
          </svg>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to Transform Your Farming?</h2>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-green-100">
              Join thousands of farmers who are already benefiting from our AI-powered platform
            </p>
            <Link 
              to="/register"
              className="px-8 py-4 bg-white text-green-700 hover:bg-green-100 rounded-full font-medium text-lg transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1 inline-block"
            >
              Start Your Free Trial
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

// Feature Card Component
const FeatureCard = ({ feature, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow p-6"
    >
      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-6">
        {feature.icon}
      </div>
      <h3 className="text-xl font-bold text-gray-800 mb-3">{feature.title}</h3>
      <p className="text-gray-600">{feature.description}</p>
    </motion.div>
  );
};

// Step Card Component
const StepCard = ({ step, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="bg-white rounded-2xl shadow-lg p-8 text-center relative z-10"
    >
      <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white font-bold text-lg mx-auto mb-6 relative">
        {index + 1}
      </div>
      <h3 className="text-xl font-bold text-gray-800 mb-3">{step.title}</h3>
      <p className="text-gray-600">{step.description}</p>
    </motion.div>
  );
};

// Testimonial Card Component
const TestimonialCard = ({ testimonial }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white rounded-2xl shadow-lg p-6"
    >
      <div className="flex items-center mb-4">
        <img 
          src={testimonial.avatar} 
          alt={testimonial.name} 
          className="w-14 h-14 rounded-full object-cover border-2 border-green-500"
        />
        <div className="ml-4">
          <h4 className="text-lg font-semibold text-gray-800">{testimonial.name}</h4>
          <p className="text-green-600">{testimonial.location}</p>
        </div>
      </div>
      <p className="text-gray-600 italic">"{testimonial.quote}"</p>
      <div className="flex text-yellow-400 mt-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <span key={i}>★</span>
        ))}
      </div>
    </motion.div>
  );
};

// Data
const features = [
  {
    icon: <FaLeaf size={28} />,
    title: "Leaf Disease Analysis",
    description: "Instantly identify plant diseases with our AI-powered image recognition system and get treatment recommendations."
  },
  {
    icon: <FaCloudRain size={28} />,
    title: "Smart Irrigation",
    description: "Optimize water usage with intelligent irrigation recommendations based on weather data and soil moisture."
  },
  {
    icon: <FaChartLine size={28} />,
    title: "Predictive Analytics",
    description: "Make data-driven decisions with insights on crop yields, market trends, and optimal harvest times."
  },
  {
    icon: <FaRobot size={28} />,
    title: "AI Farm Assistant",
    description: "Get instant answers to your farming questions through our AI-powered chatbot assistant."
  },
  {
    icon: <FaShieldAlt size={28} />,
    title: "Crop Protection",
    description: "Receive personalized recommendations for pest control and disease prevention strategies."
  },
  {
    icon: <FaSeedling size={28} />,
    title: "Sustainable Farming",
    description: "Implement eco-friendly practices with guidance on reducing environmental impact while increasing productivity."
  }
];

const steps = [
  {
    title: "Connect & Monitor",
    description: "Link your farm data, upload images of your crops, or input soil and weather information."
  },
  {
    title: "Analyze & Predict",
    description: "Our AI analyzes your data to identify issues, predict yields, and generate recommendations."
  },
  {
    title: "Implement & Improve",
    description: "Apply the insights to optimize your farming practices and continuously improve your results."
  }
];

const testimonials = [
  {
    name: "John Deere",
    location: "Wheat Farmer, Kansas",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    quote: "The leaf analysis feature saved my wheat crop from a spreading disease. I identified it early and saved over 80% of my yield."
  },
  {
    name: "Maria Rodriguez",
    location: "Orchard Owner, California",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    quote: "Smart irrigation recommendations reduced our water usage by 40% while maintaining our apple orchard's productivity."
  },
  {
    name: "Raj Patel",
    location: "Rice Farmer, India",
    avatar: "https://randomuser.me/api/portraits/men/67.jpg",
    quote: "The predictive analytics helped me time my harvest perfectly and get the best market prices for my rice crop."
  }
];

export default Landing; 