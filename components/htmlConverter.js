import React, { Component } from 'react'

export default class HtmlConverter extends Component {
  constructor(props){
    super(props);
    this.state = {
      htmlFile: null,
    }
  }

  handleFile(event){
    event.preventDefault();
    let html = document.querySelector('#file').files[0];
    // console.log(form);
    // return;
    // let html = event.target.files[0];

    let filereader = new FileReader();
    filereader.readAsText(html);

    filereader.onload = function(e){
      let html = JSON.stringify(e.target.result);
      // console.log(html);
      let test = html.replace(/images/gi, "http://www.grp360.net/Horsham/845990/images");
      let test2 = JSON.parse(test);
      console.log( typeof test2, test2);

      // sendMail(html)
    }
    
    // console.log(test);
  }

  render() {
    return (
      <div>
        
      </div>
    )
  }
}
