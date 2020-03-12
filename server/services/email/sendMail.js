const nodemailer = require('nodemailer')
const sgMail = require('@sendgrid/mail')
const {templateBuilder} = require('./templateBuilder')
const jwt = require('jwt-simple')
const config = require('../../../config')


sgMail.setApiKey(process.env.SENDGRID_MAIL_KEY)

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_LOGIN,
        pass: process.env.GMAIL_PASSWORD
    }
})

module.exports.confirmEmail = (data, password) => {
    return new Promise((res, rej) => {
        const payload = {
            ...data
        }
        const token = jwt.encode(payload, config.jwtSecretEmail)
        templateBuilder('confirmEmail', `http://${config.host}/api/public/verify/email?id=${token}`, password)
            .then(template => {
                const msg = {
                    to: data.email,
                    from: 'pharmcommunity@gmail.com',
                    subject: 'Активація акаунту 👻',
                    text: 'and easy to do anywhere, even with Node.js',
                    html: template,
                }
                sgMail.send(msg).then(data => {
                    res()
                    console.log(JSON.parse(JSON.stringify(data)))
                }).catch(rej)
            }).catch(rej)
    })
}

const resetPassword = email => {
    return new Promise((res, rej) => {
        const token = 'token'
        templateBuilder('resetPassword', `http://localhost:1111/verify/email?id=${token}`)
            .then(template => {
                let mailOptions = {
                    from: 'denv928@gmail.com', // sender address
                    to: email, // list of receivers
                    subject: 'Відновлення паролю 👻', // Subject line
                    html: template
                }

                transporter.sendMail(mailOptions)
                    .then(info => {
                        res(info)
                    })
                    .catch(rej)

            }).catch(rej)
    })
}


