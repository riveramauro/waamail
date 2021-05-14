const axios = require('axios');

const token = process.env.EMAILONACID_API_KEY

export default async (req, res) => {
  let dataCall;
  try {
    dataCall = await axios.get('https://api.emailonacid.com/v5/auth', {
      headers: {
        'Authorization': `Basic ${token}` 
      }    
    })
    console.log('sucess:', dataCall);
    return res.status(200).send(dataCall)
  } catch (error) {
    console.log('Error:', error)
    return res.status(400).send(error)
  }
}

// const onAcidApi = async () => {
  

// }