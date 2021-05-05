import React, { useState, useEffect } from 'react';
import {
  Box,
  TextInput,
  FormField,
  Select,
  Button,
  List
} from 'grommet';
import FileDropzone from "../components/FileDropzone";


export default function Form(props) {

  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState(null);
  const [recipientField, setRecipientField] = useState('')
  const [recipientList, setRecipientList] = useState([])

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

  const handleFileDrop = (incomingFile) => {
    setFile(incomingFile[0]);
    setFileName(incomingFile[0].name);
  }

  const addRecipient = () => {
    if(recipientField){
      console.log('adding to list');
      setRecipientList(recipientList => [...recipientList, recipientField])
      setRecipientField('')
    }
  }

  const removeRecipient = (indexNum) => {
    console.log(`remove recipient indexed: ${indexNum}.`);
    const updatedList = recipientList.filter((item, index) => index !== indexNum)
    setRecipientList([...updatedList])
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
        <Box direction="row" margin={{top: '10px'}}>
          <TextInput
            name="recipient"
            type="email"
            placeholder="email@domain.com"
            value={recipientField}
            onChange={e => setRecipientField(e.target.value)}
           />
           <Button
            label="Add"
            onClick={addRecipient}
           />
        </Box>
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
      <List
        data={recipientList}
        action={(item, index) => (
          <Button
          key={index}
          hoverIndicator
          label="X"
          onClick={() => removeRecipient(index)}
          />
        )}
      />
      </Box>
  )
}
