// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

let msg = {
  to: 'mauriciorivera+test@wearealexander.com',
  from: 'mauriciorivera+test@wearealexander.com',
  subject: '',
  html: ''
}

export default async (req, res) => {
  const data = JSON.parse(req.body);
  const recipients =  data.recipients;
  const htmlEmail = JSON.parse(data.email)
  const subject = data.subject

  msg = {...msg,
    to: recipients,
    subject: subject,
    html: htmlEmail
  }

  let senderResponse;
  try {
    senderResponse = await sgMail.send(msg);
    console.log(senderResponse);
    return res.status(200).json({senderResponse})
  } catch (error) {
    console.log(error);
    if(error.response){
      return res.status(error.code).send(JSON.stringify(error))
    }
    return res.status(400).send(error)
  }

}