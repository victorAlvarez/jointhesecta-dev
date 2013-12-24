
var nodemailer = require("nodemailer");

var transport = nodemailer.createTransport("SMTP", {
    host: "mail.jointhesecta.com", // hostname
    secureConnection: false, // use SSL
    port: 25, // port for secure SMTP
    auth: {
        user: "info@jointhesecta.com",
        pass: "Admin@2013"
    }
});

var mailOptions = {
    from: "Administrador ✔ <info@jointhesecta.com>", // sender address
    to: "mrtnz.rcrd@gmail.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world ✔", // plaintext body
    html: "<b>Hello world ✔</b>" // html body
}

module.exports = function(){
    transport.sendMail(mailOptions, function(error, response){
        if(error){
            console.log(error);
        }else{
            console.log("Message sent: " + response.message);
        }
    });
};

