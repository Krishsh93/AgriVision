import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaLeaf, FaSeedling, FaCloudRain, FaChartLine, FaRobot, FaCalendarAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Dashboard = ({ user }) => {
  const [todayWeather] = useState({
    temperature: 28,
    humidity: 65,
    rainfall: 0,
    condition: 'Sunny'
  });

  const [alerts] = useState([
    { id: 1, type: 'info', message: 'Optimal time to fertilize your corn crops' },
    { id: 2, type: 'warning', message: 'Potential pest infestation detected in sector B' },
    { id: 3, type: 'success', message: 'Smart irrigation saved 40% water today' }
  ]);

  const [upcomingTasks, setUpcomingTasks] = useState([]);

  useEffect(() => {
    const fetchAnalysis = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/api/auth/profile/analysis', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const recentAnalysis = response.data[response.data.length - 1]; // Get the most recent analysis
        if (recentAnalysis) {
          const tasks = [];
          if (recentAnalysis.irrigation_needed) {
            tasks.push({
              id: 'irrigation',
              title: 'Irrigation Needed',
              status: 'Pending',
              type: 'irrigation_needed',
              analysisId: recentAnalysis._id
            });
          }
          if (recentAnalysis.fertilization_needed) {
            tasks.push({
              id: 'fertilization',
              title: 'Fertilization Needed',
              status: 'Pending',
              type: 'fertilization_needed',
              analysisId: recentAnalysis._id
            });
          }
          setUpcomingTasks(tasks);
        }
      } catch (error) {
        console.error('Error fetching analysis:', error);
      }
    };

    fetchAnalysis();
  }, []);

  const markTaskAsDone = async (analysisId, type) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:5000/api/auth/profile/analysis/${analysisId}`, {
        [type]: false // Update the specific task to not needed
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUpcomingTasks(prevTasks => prevTasks.filter(task => task.analysisId !== analysisId));
    } catch (error) {
      console.error('Error updating analysis:', error);
    }
  };

  return (
    <div className="min-h-screen pt-20 pb-10 bg-gradient-to-b from-green-50 to-blue-50">
      <div className="container mx-auto px-4">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
            Welcome back, {user?.name?.split(' ')[0] || 'Farmer'}
          </h1>
          <p className="text-gray-600">Here's what's happening on your farm today</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            {/* Alerts Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mb-6"
            >
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Alerts</h2>
              <div className="space-y-3">
                {alerts.map((alert) => (
                  <motion.div
                    key={alert.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`p-4 rounded-lg ${
                      alert.type === 'info' 
                        ? 'bg-blue-50 border-l-4 border-blue-500 text-blue-700' 
                        : alert.type === 'warning'
                        ? 'bg-yellow-50 border-l-4 border-yellow-500 text-yellow-700'
                        : 'bg-green-50 border-l-4 border-green-500 text-green-700'
                    }`}
                  >
                    {alert.message}
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Upcoming Tasks Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mb-6"
            >
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Upcoming Tasks</h2>
              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="p-6">
                  {upcomingTasks.length > 0 ? (
                    upcomingTasks.map(task => (
                      <div key={task.id} className="flex items-center justify-between p-4 border-b border-gray-200">
                        <div>
                          <h3 className="font-medium text-gray-800">{task.title}</h3>
                          <p className="text-sm text-gray-600">Status: {task.status}</p>
                        </div>
                        <button 
                          onClick={() => markTaskAsDone(task.analysisId, task.type)} 
                          className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                        >
                          Mark as Done
                        </button>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-600">No upcoming tasks.</p>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Farm Overview Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="mb-6"
            >
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Farm Overview</h2>
              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-medium text-gray-800 flex items-center">
                        <span className="w-5 h-5 mr-2 text-green-600 flex-shrink-0">
                          <FaMapMarkerAlt className="w-full h-full" />
                        </span>
                        Location
                      </h3>
                      <p className="mt-2 text-gray-600 pl-7">{user?.farmDetails?.location || 'Not specified'}</p>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-gray-800 flex items-center">
                        <span className="w-5 h-5 mr-2 text-green-600 flex-shrink-0">
                          <FaLandmark className="w-full h-full" />
                        </span>
                        Farm Size
                      </h3>
                      <p className="mt-2 text-gray-600 pl-7">{user?.farmDetails?.size ? `${user.farmDetails.size} acres` : 'Not specified'}</p>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-gray-800 flex items-center">
                        <span className="w-5 h-5 mr-2 text-green-600 flex-shrink-0">
                          <FaSeedling className="w-full h-full" />
                        </span>
                        Crop Types
                      </h3>
                      <div className="mt-2 flex flex-wrap gap-2 pl-7">
                        {user?.farmDetails?.cropTypes?.length > 0 ? (
                          user.farmDetails.cropTypes.map((crop, index) => (
                            <span key={index} className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                              {crop}
                            </span>
                          ))
                        ) : (
                          <p className="text-gray-600">No crops specified</p>
                        )}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-gray-800 flex items-center">
                        <span className="w-5 h-5 mr-2 text-green-600 flex-shrink-0">
                          <FaMountain className="w-full h-full" />
                        </span>
                        Soil Type
                      </h3>
                      <p className="mt-2 text-gray-600 pl-7">{user?.farmDetails?.soilType || 'Not specified'}</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Calendar Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <FaCalendarAlt className="w-5 h-5 mr-2 text-green-600" />
                Upcoming Tasks
              </h2>
              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="p-6">
                  <CalendarEvent 
                    date="Today"
                    title="Fertilize Tomato Crops"
                    description="Apply organic fertilizer to sector A"
                    priority="high"
                  />
                  <CalendarEvent 
                    date="Tomorrow"
                    title="Check Irrigation System"
                    description="Maintenance of drip irrigation in sector C"
                    priority="medium"
                  />
                  <CalendarEvent 
                    date="Nov 25"
                    title="Harvest Corn"
                    description="Optimal time based on predictive analysis"
                    priority="low"
                  />
                </div>
              </div>
            </motion.div>
          </div>

          <div className="space-y-6">
            {/* Weather Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Today's Weather</h2>
              <div className="bg-gradient-to-r from-blue-500 to-cyan-600 rounded-2xl text-white p-6 shadow-lg">
                <div className="flex flex-row justify-between items-center">
                  <div className="flex items-center">
                    <div className="mr-4 text-5xl">☀️</div>
                    <div>
                      <p className="text-2xl font-bold">{todayWeather.temperature}°C</p>
                      <p>{todayWeather.condition}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 gap-3">
                    <div className="text-center">
                      <p className="text-xs text-blue-100">Humidity</p>
                      <p className="text-lg font-semibold">{todayWeather.humidity}%</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-blue-100">Rainfall</p>
                      <p className="text-lg font-semibold">{todayWeather.rainfall} mm</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Quick Actions Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Quick Actions</h2>
              <div className="grid grid-cols-1 gap-3">
                <QuickAction 
                  to="/leaf-analysis"
                  icon={<FaLeaf size={20} />}
                  title="Leaf Analysis"
                  description="Analyze crop health with AI"
                  color="bg-green-500"
                  delay={0}
                />
                <QuickAction 
                  to="/smart-irrigation"
                  icon={<FaCloudRain size={20} />}
                  title="Smart Irrigation"
                  description="Optimize water usage"
                  color="bg-blue-500"
                  delay={0.1}
                />
                <QuickAction 
                  to="/predictive-analysis"
                  icon={<FaChartLine size={20} />}
                  title="Predictive Analysis"
                  description="Forecast yields and markets"
                  color="bg-purple-500"
                  delay={0.2}
                />
                <QuickAction 
                  to="/chatbot"
                  icon={<FaRobot size={20} />}
                  title="Farm Assistant"
                  description="Get AI-powered advice"
                  color="bg-amber-500"
                  delay={0.3}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Quick Action Component
const QuickAction = ({ to, icon, title, description, color, delay }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay }}
      whileHover={{ 
        y: -5,
        transition: { duration: 0.2 } 
      }}
    >
      <Link 
        to={to}
        className="flex items-center bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow"
      >
        <div className={`${color} p-3 text-white flex-shrink-0`}>
          {icon}
        </div>
        <div className="p-3">
          <h3 className="font-medium text-gray-800 text-sm">{title}</h3>
          <p className="text-xs text-gray-600">{description}</p>
        </div>
      </Link>
    </motion.div>
  );
};

// Calendar Event Component
const CalendarEvent = ({ date, title, description, priority }) => {
  const priorityStyles = {
    high: "bg-red-100 text-red-800",
    medium: "bg-yellow-100 text-yellow-800",
    low: "bg-blue-100 text-blue-800"
  };

  return (
    <div className="flex items-start mb-4 last:mb-0">
      <div className="bg-green-100 text-green-800 px-3 py-1 rounded font-medium text-sm w-24 text-center">
        {date}
      </div>
      <div className="ml-4 flex-1">
        <h4 className="font-medium text-gray-800">{title}</h4>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
      <div className={`${priorityStyles[priority]} px-3 py-1 rounded-full text-xs`}>
        {priority.charAt(0).toUpperCase() + priority.slice(1)}
      </div>
    </div>
  );
};

// Custom SVG icons - fixed size for consistency
const FaMapMarkerAlt = ({ className }) => (
  <svg className={className} viewBox="0 0 384 512" fill="currentColor">
    <path d="M172.268 501.67C26.97 291.031 0 269.413 0 192 0 85.961 85.961 0 192 0s192 85.961 192 192c0 77.413-26.97 99.031-172.268 309.67-9.535 13.774-29.93 13.773-39.464 0zM192 272c44.183 0 80-35.817 80-80s-35.817-80-80-80-80 35.817-80 80 35.817 80 80 80z" />
  </svg>
);

const FaLandmark = ({ className }) => (
  <svg className={className} viewBox="0 0 512 512" fill="currentColor">
    <path d="M501.62 92.11L267.24 2.04a31.958 31.958 0 0 0-22.47 0L10.38 92.11A16.001 16.001 0 0 0 0 107.09V144c0 8.84 7.16 16 16 16h480c8.84 0 16-7.16 16-16v-36.91c0-6.67-4.14-12.64-10.38-14.98zM64 192v160H48c-8.84 0-16 7.16-16 16v48h448v-48c0-8.84-7.16-16-16-16h-16V192h-64v160h-96V192h-64v160h-96V192H64zm432 256H16c-8.84 0-16 7.16-16 16v32c0 8.84 7.16 16 16 16h480c8.84 0 16-7.16 16-16v-32c0-8.84-7.16-16-16-16z" />
  </svg>
);

const FaMountain = ({ className }) => (
  <svg className={className} viewBox="0 0 640 512" fill="currentColor">
    <path d="M634.92 462.7l-288-448C341.03 5.54 330.89 0 320 0s-21.03 5.54-26.92 14.7l-288 448a32.001 32.001 0 0 0-1.17 32.64A32.004 32.004 0 0 0 32 512h576c11.71 0 22.48-6.39 28.09-16.67a31.983 31.983 0 0 0-1.17-32.63zM320 91.18L405.39 224H320l-64 64-38.06-38.06L320 91.18z" />
  </svg>
);

export default Dashboard; 