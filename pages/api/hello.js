// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import nodemailer from "nodemailer";

let transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "9fb7f1504556a5",
    pass: "fb0e5c2c4bec94"
  }
});

let main = async (html) => {
  let info = await transport.sendMail({
    from: '"Mauricio Rivera" <me+1@mauriciorivera.co>', // sender address
    to: "me@mauriciorivera.co", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "N/A", // plain text body
    html: html // html body
  });
  console.log(info);
}

export default (req, res) => {
  const html = JSON.parse(req.body);
  // console.log(html);
  main(html).catch(console.error)
  res.statusCode = 200
  res.json({ name: 'John Doe' })
}
