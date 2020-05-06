import React, {useCallback} from 'react'
import {useDropzone} from 'react-dropzone'

export default function FileDropzone(props) {
  const onDrop = useCallback(acceptedFiles => {
    // Do something with the files
    props.getFile(acceptedFiles);
  }, [])
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

  return (
    <div className='dragContainer' {...getRootProps()}>
      <input {...getInputProps()} />
      {
        isDragActive ?
          <p>Drop the files here ...</p> :
          <p>Drag 'n' drop some files here, <br/> or click to select files</p>
      }
    
    <style jsx>{`
    .dragContainer {
      background: #efefef;
      color: #673AB7;
      height: 200px;
      width: 100%;
      display: flex;
      align-items: center;
      padding: 20px;
      text-align: center;
      border: 2px dashed #673AB7;
    `}</style>
    </div>
  )
}