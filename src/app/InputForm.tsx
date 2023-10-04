// InputForm.tsx
import React, { useState } from 'react';
import axios from 'axios';

const InputForm: React.FC<{ onDataUpdate: (data: any) => void }> = ({ onDataUpdate }) => {
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post('https://fynoih10s8.execute-api.us-east-1.amazonaws.com/Prod/reports', {
        prompt,
      });

      if (response.data) {
        onDataUpdate(response.data);
      }
    } catch (error) {
      console.error('API request failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h2>Enter a Prompt</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter your prompt"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          required
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Loading...' : 'Submit'}
        </button>
      </form>
    </div>
  );
};

export default InputForm;
