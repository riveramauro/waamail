import React, { useState, useEffect } from 'react'

export default function Form() {

  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState(null)

  function handleChange(e){
    setFileName(e.target.files[0].name);
  }

  function handleForm(e) {
    e.preventDefault();
    let formData = new FormData(e.target);
    formData = Object.fromEntries(formData);
    console.log(formData);
    // return;
    let html = formData.file;
    
    let filereader = new FileReader();
    filereader.readAsText(html);
    filereader.onload = function(e){
      let html = JSON.stringify(e.target.result);
      const path = `http://www.grp360.net/${formData.server}/${formData.jobNum}/images/`
      console.log(path);

      let updatedHtml = html.replace(/images\//gi, path);
      console.log( JSON.parse(updatedHtml) );
    }
  }

  return (
    <div>
      <h2>{fileName}</h2>
      <h3>Form</h3>
        <form onSubmit={handleForm}>
          <div>
            <input type="file" name="file" id="file" onChange={handleChange} />
          </div>
          <div>
            <select name="server" id="server">
            <option value="horsham">Horsham</option>
            <option value="raritan">Raritan</option>
            <option value="titusville">Titusville</option>
            </select>
          </div>
          <div>
            <input type="text" name="jobNum" id="jobNum" placeholder="8123456" />
          </div>
          <button className="button" type="submit">Submit</button>
        </form>
        <div>
          <p>{file}</p>
        </div>
    </div>
  )
}
