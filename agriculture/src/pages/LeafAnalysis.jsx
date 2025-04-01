import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { FaLeaf, FaUpload, FaCheckCircle, FaExclamationTriangle, FaSpinner, FaDownload, FaArrowLeft } from 'react-icons/fa';
import axios from 'axios';

const LeafAnalysis = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Check file type
    const validTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    if (!validTypes.includes(file.type)) {
      setError('Please select a valid image file (JPEG or PNG)');
      return;
    }

    // Check file size (limit to 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('Image size should be less than 5MB');
      return;
    }

    setError(null);
    setSelectedFile(file);

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);

    // Reset results
    setResult(null);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange({ target: { files: e.dataTransfer.files } });
    }
  };

  const handleAnalyze = async () => {
    if (!selectedFile) return;

    setLoading(true);
    setError(null);

    try {
      // Create form data
      const formData = new FormData();
      formData.append('image', selectedFile);

      // Call API
      // For demo purposes, we'll simulate the API call with a timeout
      // In a real app, you would use:
      // const response = await axios.post('http://localhost:5050/predict/leaf-disease', formData);
      // setResult(response.data);

      // Simulating API call with mock data
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock result
      setResult({
        disease: 'Apple_Black_rot',
        confidence: 0.92,
        information: {
          description: 'Apple black rot is a fungal disease that affects apples, caused by the fungus Botryosphaeria obtusa.',
          symptoms: 'Circular lesions on leaves, rotting fruit with concentric rings, and cankers on branches.',
          treatment: 'Prune out cankers and dead wood. Apply fungicides during the growing season. Remove fallen fruits and leaves to reduce infection sources.'
        },
        recommendations: 'Prune out cankers and dead wood. Apply fungicides during the growing season. Remove fallen fruits and leaves to reduce infection sources.'
      });
    } catch (err) {
      setError('Failed to analyze image. Please try again later.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const resetAnalysis = () => {
    setSelectedFile(null);
    setPreview(null);
    setResult(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Generate PDF report (placeholder function)
  const downloadReport = () => {
    alert('Download report functionality would be implemented here');
  };

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
            <FaLeaf className="text-green-600 mr-3" />
            Leaf Disease Analysis
          </h1>
          <p className="text-gray-600 max-w-3xl">
            Upload an image of your plant leaf to analyze for diseases and get instant recommendations for treatment.
          </p>
        </motion.div>

        {!result && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white rounded-2xl shadow-lg overflow-hidden max-w-4xl mx-auto"
          >
            <div className="p-6 md:p-8">
              {error && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-red-50 text-red-700 p-4 rounded-lg mb-6 flex items-start"
                >
                  <FaExclamationTriangle className="text-red-500 mt-1 mr-2 flex-shrink-0" />
                  <p>{error}</p>
                </motion.div>
              )}

              <div 
                className={`border-2 border-dashed rounded-xl p-8 text-center ${
                  preview ? 'border-green-300 bg-green-50' : 'border-gray-300 hover:border-green-300 bg-gray-50'
                } transition-colors cursor-pointer`}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current.click()}
              >
                <input 
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  accept="image/jpeg, image/png, image/jpg"
                  onChange={handleFileChange}
                />
                
                {preview ? (
                  <div className="space-y-6">
                    <div className="relative max-w-sm mx-auto">
                      <img 
                        src={preview} 
                        alt="Leaf preview" 
                        className="max-h-64 max-w-full mx-auto rounded-lg shadow-md"
                      />
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          resetAnalysis();
                        }}
                        className="absolute top-2 right-2 bg-white p-1.5 rounded-full shadow-md text-gray-500 hover:text-gray-700"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                    <p className="text-green-700 font-medium">Image Selected: {selectedFile.name}</p>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAnalyze();
                      }}
                      disabled={loading}
                      className={`inline-flex items-center px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-full shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                    >
                      {loading ? (
                        <>
                          <FaSpinner className="animate-spin mr-2" />
                          Analyzing...
                        </>
                      ) : (
                        <>
                          <FaLeaf className="mr-2" />
                          Analyze Leaf
                        </>
                      )}
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-green-600 mx-auto">
                      <FaUpload size={30} />
                    </div>
                    <h3 className="text-lg font-medium text-gray-700">
                      Drag & Drop or Click to Upload
                    </h3>
                    <p className="text-gray-500">
                      Upload a clear image of your plant leaf <br />
                      Supported formats: JPEG, PNG (Max size: 5MB)
                    </p>
                  </div>
                )}
              </div>

              <div className="mt-8">
                <h3 className="text-lg font-medium text-gray-800 mb-4">For best results:</h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start">
                    <FaCheckCircle className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                    Take close-up photos in good lighting conditions
                  </li>
                  <li className="flex items-start">
                    <FaCheckCircle className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                    Ensure the leaf is the main focus of the image
                  </li>
                  <li className="flex items-start">
                    <FaCheckCircle className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                    Include both healthy and affected areas of the leaf
                  </li>
                  <li className="flex items-start">
                    <FaCheckCircle className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                    Remove any other objects from the frame
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>
        )}

        {result && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-2xl shadow-lg overflow-hidden max-w-4xl mx-auto"
          >
            <div className="bg-green-600 p-6 text-white">
              <h2 className="text-2xl font-bold">Analysis Results</h2>
            </div>
            
            <div className="p-6 md:p-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-1">
                  <div className="bg-gray-100 p-4 rounded-lg">
                    <img 
                      src={preview} 
                      alt="Analyzed leaf" 
                      className="w-full h-auto rounded-lg"
                    />
                  </div>

                  <div className="mt-6 bg-green-50 rounded-lg p-4">
                    <h3 className="font-medium text-gray-800 mb-2">Analysis Details</h3>
                    <div className="space-y-2">
                      <div>
                        <span className="text-gray-600 text-sm">Disease Detected:</span>
                        <p className="font-medium text-red-600">
                          {result.disease.replace(/_/g, ' ')}
                        </p>
                      </div>
                      <div>
                        <span className="text-gray-600 text-sm">Confidence:</span>
                        <div className="mt-1 relative w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className="absolute top-0 left-0 h-full bg-green-500 rounded-full"
                            style={{ width: `${result.confidence * 100}%` }}
                          />
                        </div>
                        <p className="text-right text-sm text-gray-600 mt-1">
                          {Math.round(result.confidence * 100)}%
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="md:col-span-2">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium text-gray-800 border-b pb-2">Description</h3>
                      <p className="mt-2 text-gray-600">{result.information.description}</p>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium text-gray-800 border-b pb-2">Symptoms</h3>
                      <p className="mt-2 text-gray-600">{result.information.symptoms}</p>
                    </div>
                    
                    <div className="bg-green-50 p-4 rounded-lg">
                      <h3 className="text-lg font-medium text-green-800 mb-2">Treatment Recommendations</h3>
                      <p className="text-gray-700">{result.recommendations}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex flex-col sm:flex-row justify-between space-y-3 sm:space-y-0 sm:space-x-3">
                <button
                  type="button"
                  onClick={resetAnalysis}
                  className="inline-flex items-center px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg transition-colors"
                >
                  <FaArrowLeft className="mr-2" />
                  Analyze Another Leaf
                </button>
                
                <button
                  type="button"
                  onClick={downloadReport}
                  className="inline-flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg shadow-md hover:shadow-lg transition-all"
                >
                  <FaDownload className="mr-2" />
                  Download Report
                </button>
              </div>
            </div>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-12 max-w-4xl mx-auto"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Frequently Asked Questions</h2>
          
          <div className="space-y-4">
            <details className="bg-white rounded-lg shadow-md overflow-hidden">
              <summary className="cursor-pointer p-4 font-medium flex items-center justify-between">
                <span>How accurate is the leaf disease detection?</span>
                <svg className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="p-4 pt-0 text-gray-600">
                Our AI model has been trained on thousands of plant disease images and achieves an accuracy of over 90% for most common diseases. However, the accuracy may vary depending on the quality of the uploaded image and the specific disease.
              </div>
            </details>
            
            <details className="bg-white rounded-lg shadow-md overflow-hidden">
              <summary className="cursor-pointer p-4 font-medium flex items-center justify-between">
                <span>What types of plants and diseases can be detected?</span>
                <svg className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="p-4 pt-0 text-gray-600">
                Our system can currently detect diseases in major crops including apple, tomato, corn, potato, pepper, and several others. We are continuously expanding our database to include more plants and diseases.
              </div>
            </details>
            
            <details className="bg-white rounded-lg shadow-md overflow-hidden">
              <summary className="cursor-pointer p-4 font-medium flex items-center justify-between">
                <span>Are the images I upload stored or shared?</span>
                <svg className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="p-4 pt-0 text-gray-600">
                Your privacy is important to us. Images are processed in real-time and are not permanently stored on our servers. They are automatically deleted after analysis unless you explicitly consent to their use for improving our AI model.
              </div>
            </details>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LeafAnalysis; 