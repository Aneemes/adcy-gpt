const axios = require('axios');

exports.handler = async (event, context) => {
  try {
    const response = await axios.post('https://fynoih10s8.execute-api.us-east-1.amazonaws.com/Prod/reports', event.body);

    return {
      statusCode: 200,
      body: JSON.stringify(response.data),
      headers: {
        'Access-Control-Allow-Origin': 'https://adcy-gpt.netlify.app',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    };
  } catch (error) {
    return {
      statusCode: error.response ? error.response.status : 500,
      body: JSON.stringify({ error: 'Request failed' }),
      headers: {
        'Access-Control-Allow-Origin': 'https://adcy-gpt.netlify.app',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    };
  }
};
