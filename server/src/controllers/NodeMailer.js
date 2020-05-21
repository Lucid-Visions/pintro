import nodemailer from "nodemailer";

// async..await is not allowed in global scope, must use a wrapper
export default async function main(recipient, content) {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: "segwayteamkcl@gmail.com", // generated ethereal user
      pass: "lkmhkupxrpzfnvcw" // generated ethereal password
    }
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Pintro 👻" <segwayteamkcl@gmail.com>', // sender address
    to: recipient, // list of receivers
    subject: content.subject, // Subject line
    text: content.text, // plain text body
    html: content.html // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  //console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  return info.messageId
}

