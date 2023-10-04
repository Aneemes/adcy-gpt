
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

    // Construct the prompt with the provided information
    const prompt = `Generate me a business plan for my ${formData.companyName} with a budget of ${formData.budget} in the ${formData.industry} industry. Directors and Info: ${formData.directorsInfo}. Target Market: ${formData.targetMarket}. Project Annual Profit: ${formData.annualProfit}`;

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
    <div>
      <h1>Generate a Business Plan</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="companyName">Company Name:</label>
          <input
            type="text"
            id="companyName"
            name="companyName"
            value={formData.companyName}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="budget">Budget with Currency:</label>
          <input
            type="text"
            id="budget"
            name="budget"
            value={formData.budget}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="industry">Which Industry:</label>
          <input
            type="text"
            id="industry"
            name="industry"
            value={formData.industry}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="directorsInfo">Directors and Info:</label>
          <textarea
            id="directorsInfo"
            name="directorsInfo"
            value={formData.directorsInfo}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="targetMarket">Target Market:</label>
          <input
            type="text"
            id="targetMarket"
            name="targetMarket"
            value={formData.targetMarket}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="annualProfit">Project Annual Profit:</label>
          <input
            type="text"
            id="annualProfit"
            name="annualProfit"
            value={formData.annualProfit}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Generating...' : 'Generate Business Plan'}
          </button>
        </div>
      </form>
      {apiResponse && (
        <div>
          <p>{apiResponse.message}</p>
          <a href={apiResponse.reportUrl} download="generated.pdf">
            Download Report
          </a>
        </div>
      )}
    </div>
  );
};

export default Home;
