// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const msg = {
  to: 'mauriciorivera+test@wearealexander.com',
  from: 'mauriciorivera+test@wearealexander.com',
  subject: 'Testing',
  html: '<strong>Testing</strong>'
}

export default async (req, res) => {
  return res.status(500).json(res)
}
//   let response
//   try {
//     // response = await sgMail(msg)
//     response = false
//     throw new Error('Error here')
//   } catch (err) {
//     // console.log(err)
//     return res.status(500).send(err)
//       // statusCode: err.statusCode || 500,
//       // body: JSON.stringify({
//       //   error: err.message
//       // })
//   }
//   console.log(res, response);
//   return res.status(200).send(response)
// }

// export default (req, res) => {
//   // const html = JSON.parse(req.body);
//   // console.log(JSON.parse(req.body));
//   // main(html).catch(console.error)
//   res.statusCode = 200
//   res.json({ data: req.body})
// }

// export default (req, res) => {
  
//   const msg = {
//     to: 'me+waatesting@mauriciorivera.co',
//     from: 'me+waatesting@mauriciorivera.co',
//     subject: 'Testing Subject',
//     text: 'someting nice',
//     html: req.body
//   }
  
//   sgMail
//     .send(msg)
//     .then((response) => {
//       console.log(response)
//       res.statusCode = 200
//       res.end(JSON.stringify({ name: 'John Doe 2', data: response })) 
//     })
//     .catch((error) => {
//       console.error(error)
//       return error
//   }) 
  
// }