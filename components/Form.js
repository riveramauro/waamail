import React, { useState, useEffect } from 'react';
import {
  Box,
  Form,
  TextInput,
  FormField,
  Select,
  Button,
  List
} from 'grommet';
import FileDropzone from "../components/FileDropzone";

export default function EmailForm(props) {

  const defaultValues = {
    server: 'Seattle',
    jobNum: '858183'
  }
  const serverOptions = ['Horsham','Raritan','Titusville', 'Seattle'];

  const [file, setFile] = useState(null);
  const [emailHTML, setEmailHTML] = useState(null)
  const [isHTMLModified, setisHTMLModified] = useState(false)
  const [fileName, setFileName] = useState(null);
  const [recipientField, setRecipientField] = useState('')
  const [recipientList, setRecipientList] = useState([])
  const [formValues, setFormValues] = useState(defaultValues)

  useEffect(() => {
    props.modifiedHtml(emailHTML)
  }, [emailHTML])

  const sendMail = () => {

    const data = {
      recipients: recipientList,
      email: emailHTML
    }
    
    fetch('/api/hello', {
      method: 'POST',
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(data => console.log(JSON.parse(data.data)))
      .catch(res => console.log(res))
  }

  const modifyHTML = () => {

    const formData = formValues;
    const html = file;
    
    const filereader = new FileReader();
    filereader.readAsText(html);
    // Runs after the file is read at filereader.readAsText
    filereader.onload = function(e){
      let html = JSON.stringify(e.target.result);
      const path = `http://www.grp360.net/${formData.server}/${formData.jobNum}/images/`
      let updatedHtml = html.replace(/images\//gi, path);
      setEmailHTML(updatedHtml)
      setisHTMLModified(true)
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
      <Form
        value={formValues}
        onChange={nextVal => setFormValues(nextVal)}
        onSubmit={e => {
          console.log(e.value)
          sendMail(recipientList)
        }}
      >
        <FileDropzone getFile={handleFileDrop} />
        <FormField label="Server" name="server">
          <Select
            name="server"
            placeholder="Pick a server"
            options={serverOptions}
          />
        </FormField>
        <FormField label="Job Number" name="jobNum">
          <TextInput placeholder="555555" type="text" name="jobNum" />
        </FormField>
        <FormField label="Recepient">
          <Box direction="row" margin={{top: '10px'}}>
            <TextInput
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
        </FormField>
        <Box direction="row" justify="between" margin={{top: 'medium'}}>
          <Button
            label="Preview"
            disabled={!file ? true : false}
            onClick={() => modifyHTML()}
          />
          <Button
            type="submit"
            label="Submit"
            disabled={!isHTMLModified ? true : false}
            primary
          />
        </Box>
        
      </Form>
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
