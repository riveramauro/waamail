import Head from 'next/head';
import Form from "../components/Form";
import CodeContainer from "../components/CodeContainer";
import { Grommet, Box, Heading } from "grommet";
import { useState } from 'react';

export default function Home() {

  const [code, setCode] = useState(null)

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

 function handleModifiedHtml(html){
   setCode(html);
 }

  return (
    <Grommet full theme={myTheme}>
      <Head>
        <title>WAAMail</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500" />
      </Head>
      <Box direction='row' flex fill>
        <Box flex={{'grow':1}} pad='small' align='center' justify='start'>
          <Heading>WAAMail</Heading>
          <Form modifiedHtml={handleModifiedHtml} />
        </Box>
        <Box flex={{'grow':2}} pad='small' background='brand' align='center' overflow='scroll'>
          <CodeContainer code={code}></CodeContainer>
        </Box>
      </Box>
    </Grommet>
  )
}
