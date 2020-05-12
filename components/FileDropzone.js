import React, {useCallback, useState} from 'react'
import {useDropzone} from 'react-dropzone'

export default function FileDropzone(props) {

  const [erroFileType, setErroFileType] = useState(false);


  const onDrop = useCallback(acceptedFiles => {
    // Do something with the files
    // console.log(acceptedFiles[0].type);
    (acceptedFiles[0].type == 'text/html') ? setErroFileType(false) : setErroFileType(true) ;
    props.getFile(acceptedFiles);
  }, [])
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop, multiple: false})

  return (
    <div>
      <div>
      {
        erroFileType ? <h5>HTML files only please!</h5> : '' 
      }
      </div>
      <div className='dragContainer' {...getRootProps()}>
      <input accept={'text/html'} {...getInputProps()} />
      {
        isDragActive ?
          <p>Drop the files here ...</p> :
          <p>Drag 'n' drop some files here, <br/> or click to select files</p>
      }
      </div>
    <style jsx>{`
    .dragContainer {
      background: #efefef;
      color: #673AB7;
      height: 20vh;
      width: 100%;
      display: flex;
      align-items: center;
      padding: 20px;
      text-align: center;
      justify-content: center;
      border: 2px dashed #673AB7;
    `}</style>
    </div>
  )
}