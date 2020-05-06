import Head from 'next/head';
import Form from "../components/Form";
import { Grommet, Box, Heading } from "grommet";


export default function Home() {

  const sendMail = (file) => {
    
    fetch('/api/hello', {
      method: 'POST',
      body: file
    })
      .then(res => res.json())
      .then(data => console.log(data))
      .catch(res => console.log(res))
  }

  const handleChange = (event) => {
    event.preventDefault();
    console.log(event);
  }

  const myTheme = {
    global: {
      font: {
        family: 'Roboto'
      }
    }
  }


  return (
    <Grommet full theme={myTheme}>
      <Head>
        <title>WAAMail</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500" />
      </Head>
      <Box direction='row' flex fill='vertical'>
        <Box flex pad='small' align='center' justify='center'>
          <Heading>WAAMail</Heading>
          <Form />
        </Box>
        <Box flex pad='large' background='brand' align='center'>
          <p>Code editor here</p>
        </Box>
      </Box>
    </Grommet>
  )
}
