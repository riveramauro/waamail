import React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { shadesOfPurple } from 'react-syntax-highlighter/dist/cjs/styles/hljs';

export default function CodeContainer(props) {

  const html = `
  <h1>Hello</h1>
  <p>My Nombre es chancho</p>
  `;

  return (
    <div>
      {/* {JSON.parse(props.code)} */}
      {/* {console.log(JSON.parse(props.code))} */}
      {props.code ?
        <div className='code__container'>
        <SyntaxHighlighter language="html" style={shadesOfPurple}>
          {JSON.parse(props.code)}
        </SyntaxHighlighter>
        </div>
        :
        null
      }
      <style jsx>{`
      .code__container{
        max-width:800px;
        height:100%;
      }

      `}</style>
    </div>
  )
}
