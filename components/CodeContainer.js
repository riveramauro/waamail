import React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { shadesOfPurple } from 'react-syntax-highlighter/dist/cjs/styles/hljs';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import { Button } from 'grommet';
import { Copy, Code } from 'grommet-icons';

export default function CodeContainer(props) {

  const html = JSON.parse(props.code);

  return (
    <div>
      {props.code ?
        <div className='code__container'>
        <CopyToClipboard text={html}
          onCopy={() => console.log('copied')}>
          <Button icon={<Copy />} label="Copy to Clipboard" primary />
        </CopyToClipboard>
        <SyntaxHighlighter language="html" style={shadesOfPurple}>
          {html}
        </SyntaxHighlighter>
        </div>
        :
        <Code size='xlarge' />
      }
      <style jsx>{`
      .code__container{
        max-width:800px;
        font-size: 0.75rem;
      }
      `}</style>
    </div>
  )
}
