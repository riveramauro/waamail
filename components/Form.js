import React, { useState, useEffect } from 'react';
import {
  Box,
  TextInput,
  Grommet,
  FormField,
  Select,
  Button
} from 'grommet';
import FileDropzone from "../components/FileDropzone";


export default function Form(props) {

  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState(null);

  const serverOptions = ['Horsham','Raritan','Titusville', 'Seattle'];

  function handleForm(e) {
    e.preventDefault();
    // Save form field to obj
    let formData = new FormData(e.target);
    formData = Object.fromEntries(formData);
  
    let html = file;
    
    const filereader = new FileReader();
    filereader.readAsText(html);
    // Runs after the file is read at filereader.readAsText
    filereader.onload = function(e){
      let html = JSON.stringify(e.target.result);
      const path = `http://www.grp360.net/${formData.server}/${formData.jobNum}/images/`
      let updatedHtml = html.replace(/images\//gi, path);
      props.modifiedHtml(updatedHtml);
    }
  }

  function handleFileDrop(incomingFile) {
    setFile(incomingFile[0]);
    setFileName(incomingFile[0].name);
  }
  return (      
    <Box>
      {file ? <p>{fileName}</p> : ''}
      <form onSubmit={handleForm}>
        <FileDropzone getFile={handleFileDrop} />
        <div>
          <FormField label="Server" name="server">
            <Select
              name="server"
              placeholder="Pick a server"
              options={serverOptions}
            />
          </FormField>
        </div>
        <div>
          <TextInput placeholder="555555" type="text" name="jobNum" id="jobNum" />
        </div>
        <Box direction="row" justify="between" margin={{top: 'medium'}}>
          <Button
            label="Preview"
            disabled={!file ? true : false}
          />
          <Button
            type="submit"
            label="Submit"
            disabled={!file ? true : false}
            primary
          />
        </Box>
        
      </form>
      </Box>
  )
}
