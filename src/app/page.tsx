// // Home.tsx
// "use client";
// import React, { useState } from 'react';
// import Image from 'next/image';
// import InputForm from './InputForm'; // Import the InputForm component
// import ApiComponent from './ApiComponent';

// const Home: React.FC = () => {
//   const [apiData, setApiData] = useState<any>(null);

//   const handleDataUpdate = (data: any) => {
//     setApiData(data);
//   };

//   return (
//     <div>
//       <h1>Home</h1>
//       <Image src="/images/1.jpg" alt="Picture of the author" width={500} height={500} />
//       <InputForm onDataUpdate={handleDataUpdate} /> {/* Render the InputForm component */}
//       {apiData && <ApiComponent data={apiData} />} {/* Pass data prop to ApiComponent */}
//     </div>
//   );
// };

// export default Home;

// pages/index.js
"use client";
import React, { useState } from 'react';
import axios from 'axios';

// Define a type for the API response
interface ApiResponse {
  message: string;
  reportUrl: string;
}

const Home = () => {
  const [formData, setFormData] = useState({
    companyName: '',
    budget: '',
    industry: '',
    directorsInfo: '',
    targetMarket: '',
    annualProfit: '',
  });
  const [apiResponse, setApiResponse] = useState<ApiResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const prompt = `Generate me a business plan for my bussiness with name: ${formData.companyName} with a budget of ${formData.budget} in the ${formData.industry} industry. Directors and Info: ${formData.directorsInfo}. Target Market: ${formData.targetMarket}. Project Annual Profit: ${formData.annualProfit}`;

    try {
      const response = await axios.post('https://fynoih10s8.execute-api.us-east-1.amazonaws.com/Prod/reports', {
        prompt,
      });

      if (response.data.message && response.data.reportUrl) {
        setApiResponse(response.data);
      } else {
        console.error('API response format is incorrect');
      }
    } catch (error) {
      console.error('API request failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-500">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-3/5">
        <h1 className="text-black text-3xl text-center mb-8">Generate a Business Plan</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="companyName">
              Company Name:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              id="companyName"
              name="companyName"
              value={formData.companyName}
              onChange={handleInputChange}
              placeholder="Enter Company Name"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="budget">
              Budget with Currency:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              id="budget"
              name="budget"
              value={formData.budget}
              onChange={handleInputChange}
              placeholder="Enter Budget"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="industry">
              Which Industry:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              id="industry"
              name="industry"
              value={formData.industry}
              onChange={handleInputChange}
              placeholder="Enter Industry"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="directorsInfo">
              Directors and Info:
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="directorsInfo"
              name="directorsInfo"
              value={formData.directorsInfo}
              onChange={handleInputChange}
              placeholder="Enter Directors and Info"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="targetMarket">
              Target Market:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              id="targetMarket"
              name="targetMarket"
              value={formData.targetMarket}
              onChange={handleInputChange}
              placeholder="Enter Target Market"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="annualProfit">
              Project Annual Profit:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              id="annualProfit"
              name="annualProfit"
              value={formData.annualProfit}
              onChange={handleInputChange}
              placeholder="Enter Project Annual Profit"
              required
            />
          </div>
          <div className="flex items-center justify-center">
            <button
              type="submit"
              disabled={isLoading}
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              {isLoading ? 'Generating...' : 'Generate Business Plan'}
            </button>
          </div>
        </form>
        {apiResponse && (
          <div className="mt-4">
            <p>{apiResponse.message}</p>
            <a
              href={apiResponse.reportUrl}
              download="generated.pdf"
              className="text-blue-500 hover:text-blue-700"
            >
              Download Report
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;




