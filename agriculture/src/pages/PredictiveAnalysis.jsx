import { motion } from 'framer-motion';
import { FaChartLine } from 'react-icons/fa';

const PredictiveAnalysis = () => {
  return (
    <div className="min-h-screen pt-20 pb-10 bg-gradient-to-b from-green-50 to-blue-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2 flex items-center">
            <FaChartLine className="text-purple-600 mr-3" />
            Predictive Analysis
          </h1>
          <p className="text-gray-600 max-w-3xl">
            Make data-driven decisions with insights on crop yields, market trends, and optimal harvest times.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white rounded-2xl shadow-lg overflow-hidden max-w-4xl mx-auto p-8 text-center"
        >
          <div className="w-24 h-24 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 mx-auto mb-6">
            <FaChartLine size={40} />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Coming Soon</h2>
          <p className="text-gray-600 max-w-lg mx-auto">
            Our Predictive Analysis feature is currently under development. Soon you'll have access to powerful forecasting tools for your farm planning and operations!
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default PredictiveAnalysis; 