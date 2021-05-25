const axios = require('axios');
const token = process.env.EMAILONACID_API_KEY;
const testing = process.env.TESTING;

let email = {
  subject: "My Email Subject",
  html: "<h1>This is a test</h1>",
  charset: "utf-8",
  free_test:  (testing ? true : false),
  clients: ["gmailw10_ff21_win"]
}
const options = {
  headers: {
    'Accept': 'application/json',
    'Authorization': `Basic ${token}`,
    'Content-Type': 'application/json',
  }
}

const testAuth = async () => {
  try {
    const response = await axios.get('https://api.emailonacid.com/v5/auth', options)
    return response.data;
  } catch (error) {
    return error.response.data
  }
}

const getClients = async () => {
  let response;
  try {
    response = await axios.get(
      'https://api.emailonacid.com/v5/email/clients/default', options)
    return response.data.clients  
  } catch (error) {
    console.log(`getClient error: ${error}`); 
  }
}

const sendTestEmail = async (emailData) => {
  let response;
  try {
    response = await axios.post(
      'https://api.emailonacid.com/v5/email/tests', emailData, options);
    return response.data;
  } catch (error) {
    console.log(`sendTest eror: ${error}`);
  }
}

export default async (req, res) => {

  const auth = await testAuth();
  if (auth.error) {
    console.log('Authorization error');
    return res.status(400).send(auth)
  }

  let emailTest;
  const requestBody = JSON.parse(req.body)
  let emailData = {...email,
    html: JSON.parse(requestBody.email),
    subject: requestBody.subject,
    clients: (testing ? email.clients : await getClients())
  }
  try {
    emailTest = await sendTestEmail(emailData)
    console.log('success:', emailTest);
    return res.status(200).json(JSON.stringify(emailTest.data))
  } catch (error) {
    console.log('Error:', error.response)
    return res.status(400).send(error)
  }
}