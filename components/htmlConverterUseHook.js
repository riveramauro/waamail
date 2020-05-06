import React, { useState, useEffect } from 'react'

export default function HtmlConverterUseHook(props) {

  const [banan, setBanan] = useState('hello banananon');

  return (
    <div>
      <h1>wowww mate {banan}</h1>
      <h3>{props.something}</h3>
    </div>
  )
}
