const axios = require('axios');
const token = process.env.EMAILONACID_API_KEY;

const url = 'https://api.emailonacid.com/v5/email/tests';
const testing = true;
const clients = {"clients": ["gmailw10_ff21_win"]}

let email = {
  "subject": "My Email Subject",
  "html": "<h1>This is a test</h1>",
  "charset": "utf-8",
  "free_test":  (testing ? true : false)
}
const options = {
  headers: {
    'Accept': 'application/json',
    'Authorization': `Basic ${token}`,
    'Content-Type': 'application/json',
  }
}

const getClients = async () => {
  let response;
  try {
    response = await axios.get('https://api.emailonacid.com/v5/email/clients/default', options)
    return response.data  
  } catch (error) {
    console.log(`getClient error: ${error}`); 
  }
}

export default async (req, res) => {

  let defaultClients;
  let emailTest;

  const requestBody = JSON.parse(req.body)
  
  email = {...email,
    html: JSON.parse(requestBody.email),
    subject: requestBody.subject
  }

  try {
    
    defaultClients = (testing ? clients : await getClients())
    email  = {...email, ...defaultClients}
    
    emailTest = await axios.post(url, email, options)
    console.log('success:', emailTest);
    return res.status(200).json(JSON.stringify(emailTest.data))
  } catch (error) {
    console.log('Error:', error.response)
    return res.status(400).send(error)
  }
}