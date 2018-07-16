var nodemailer = require('nodemailer');
module.exports = {
    transporter : nodemailer.createTransport({
                                                service: 'gmail',
                                                auth: {
                                                    user: 'hp.project.ut@gmail.com',
                                                    pass: '123ewq!@#'
                                                }
                                            }),
    mailOptions: {
         from: 'hp.project.ut@gmail.com',
         to: 'email@gmail.com',
         subject: 'New Account Created',
         html: '<h1>Hi ,</h1><p> Your Account is  Created Successfully. You can now apply unlimited to open positions using HP(Hiring Portal).</p> <p>>>>Enjoy the experience!!</p>'
     },
    sendEmail : function (){
        this.transporter.sendMail(this.mailOptions, function(error, info){
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        })
    }

}
