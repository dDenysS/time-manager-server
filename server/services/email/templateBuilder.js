const path = require('path')
const ejs = require('ejs')

let templates = {
    resetPassword: path.join(__dirname, 'views', 'resetPassword.ejs'),
    confirmEmail: path.join(__dirname, 'views', 'confirmEmail.ejs'),
}


module.exports.templateBuilder = (tplName, link, password) => {
    return new Promise((resolve, reject) => {
        console.log(password)
        ejs.renderFile(templates[tplName], {link, password}, (err, html) => {
            if (err) {
                console.error(err)
                return reject(err)
            }
            resolve(html)
        })
    })
}



