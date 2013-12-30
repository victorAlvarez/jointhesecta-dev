
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

/*
var mailOptions = {
    from: "", // sender address
    to: "Administrador ✔ <info@jointhesecta.com>", // list of receivers
    subject: "Bienvenido a join the secta", // Subject line
    text: "Hello world", // plaintext body
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
*/

exports.enviarCorreo = function(mailOptions){
    transport.sendMail(mailOptions, function(error, response){
        if(error){
            console.log(error);
        }else{
            console.log("Mensaje enviado: " + response.message);
        }
    });
};

