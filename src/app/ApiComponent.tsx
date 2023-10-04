// ApiComponent.tsx
"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface ApiComponentProps {
    data: any; // Define the data prop
  }

const ApiComponent: React.FC<ApiComponentProps> = ({data}) => {
  const [apiData, setApiData] = useState<any>(null);

  useEffect(() => {
    // Make an API request when the component mounts
    axios.get('https://fynoih10s8.execute-api.us-east-1.amazonaws.com/Prod/reports')
      .then((response) => {
        setApiData(response.data);
      })
      .catch((error) => {
        console.error('API request failed:', error);
      });
  }, []);

  return (
    <div>
      <h1>API Data</h1>
      {apiData ? (
        <div>
          <p>{apiData.message}</p>
          <a href={apiData.reportUrl} download="generated.pdf">
            Download Report
          </a>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ApiComponent;


