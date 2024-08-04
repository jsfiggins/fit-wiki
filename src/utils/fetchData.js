import axios from 'axios';
export const exerciseOptions = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': 'eda8da1fd9msh4d4c744b3fb82abp1081edjsnc3a67edf3d33',
      'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
    }
  };
  


  export const fetchData = async (url, options) => {
    try {
      const response = await axios.request({ url, ...options });
      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  };