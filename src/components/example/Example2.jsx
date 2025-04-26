
func
const response = await axios.get(`https://api.opencagedata.com/geocode/v1/json`, {
    params: {
      key: 'ca64140136e24d29b40a68933e5f83ab',
      q: `${latitude}+${longitude}`,
      pretty: 1
    }
  });
  
  const data = response.data;  