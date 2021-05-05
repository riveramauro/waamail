import Head from 'next/head';
import EmailForm from "../components/Form";
import CodeContainer from "../components/CodeContainer";
import { Grommet, Box, Heading, Grid } from "grommet";
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
        <script async src="https://www.googletagmanager.com/gtag/js?id=UA-166351780-1" />
        <script
            dangerouslySetInnerHTML={{
              __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'UA-166351780-1');
          `,
            }}
          />

      </Head>
      <Grid
        fill
        columns={['flex', 'flex']}
        rows={['flex']}
        areas={[
          {name: 'docDrop', start: [0,0], end: [0,0]},
          {name: 'preview', start: [1,0], end: [1,0]},
        ]}
      >
        <Box
          gridArea="docDrop"
          background="brand"
          direction="column"
          pad="medium"
        >
          <Box pad="medium" background="light-1" height="100%">
            <Heading size="small">WAAMail</Heading>
            <EmailForm modifiedHtml={handleModifiedHtml} />
          </Box>
          {/* <Box pad="small" overflow="scroll" height="40%">
            <CodeContainer code={code}></CodeContainer>
          </Box> */}
        </Box>
        <Box gridArea="preview" background="light-2" overflow="scroll">
          <div dangerouslySetInnerHTML={{__html: JSON.parse(code)}}></div>
        </Box>
        
      </Grid>
    </Grommet>
  )
}
