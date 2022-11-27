
const nodemailer = require('nodemailer');
const dotenv = require('dotenv').config();


    //Create Transport
    const transport = nodemailer.createTransport({
        host : process.env.EMAIL_HOST,
        port :  process.env.EMAIL_PORT,
        auth : {
            user : process.env.EMAIL_USER,
            pass : process.env.EMAIL_PASS
        }
    });

const verifyAccountMail = async (to, sub, data = { }) => {

    await transport.sendMail({
        from : `"Verify Account" <${process.env.EMAIL_USER}>`,
        to : to,
        subject : sub,
        text : ``,
        html : `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Verify Your Account</title>
            <link rel="shortcut icon" href="https://www.payoneer.com/wp-content/uploads/stacked-light-thumb.jpg" type="image/x-icon">
        
            <style>
                *{
                    margin: 0;
                    padding: 0;
                }
                .main-wrap {
                    margin: 0;
                    padding: 0;
                    background: #e9e9ee;
                    height: 100vh;
                    overflow: hidden;
                }
                .main {
                    width: 500px;
                    margin: 150px auto;
                    background: white;
                    padding: 30px;
                    
                }
                .main .header img {
                    width: 200px;
                }
                .main .body a {
                   padding: 10px 14px;
                   background-color: tomato;  
                   color: white;
                   text-decoration: none;
                   border-radius: 2px;
                   overflow: hidden;
                   text-transform: uppercase;
                }
                .main .body  {
                   padding: 50px 0px;
                }
                .social ul li {
                    display: inline-block;
                }
                .social ul li img {
                   width: 30px;
                   height: 30px;
                }
            </style>
        
        </head>
        <body>
        
            <div class="main-wrap">
                <div class="main">
                    <div class="header">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Payoneer_logo.svg/1200px-Payoneer_logo.svg.png" alt="">
                    </div>
                    <hr>
                    <div class="body">
                        <h2>Hi ${data.name}, Please verify your account</h2>
                        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Mollitia aut voluptatibus voluptas, excepturi et possimus facilis sed? Architecto, non nihil.</p>
                        <br>
                        <a class="btn" href="http://localhost:5050/student/verify/${ data.token }"> Verify Now</a>
                        <br>
                        <br>
        
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero nisi, </p>
                    </div>
                    <div class="footer">
                        Thaks for your signup! Your cell number is ${data.cell}
                        <div class="social">
                            <br>
                            <ul>
                                <li> <img src="https://www.pngitem.com/pimgs/m/0-6762_circle-fb-logo-icon-photos-facebook-circle-fb.png" alt=""> </li>
                                
                                <li> <img src="https://www.pngitem.com/pimgs/m/0-6762_circle-fb-logo-icon-photos-facebook-circle-fb.png" alt=""> </li>
                                
                                <li> <img src="https://www.pngitem.com/pimgs/m/0-6762_circle-fb-logo-icon-photos-facebook-circle-fb.png" alt=""> </li>
                                
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </body>
        </html>`
    });


}

//Module exports
module.exports = {
    verifyAccountMail
}