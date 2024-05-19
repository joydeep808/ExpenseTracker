"use server"
import Mailgen from 'mailgen';
import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
dotenv.config({
  path:"../.env"
})

const websiteUrl = "https://expense-tracker-5ojq.vercel.app/"
  const websiteName = "Expense Tracker By Joydeep"
export const sendEmail = async (email: string ,  subject: string , html:string) => {

  const transporter = nodemailer.createTransport({
    host:`${process.env.EMAIL_NAME}`, // Enter Your Name 
    service: 'Gmail',
    port:process.env.EMAIL_PORT,
    secure:true,
    auth: {
        user: `${process.env.EMAIL}`,
        pass:`${process.env.EMAIL_PASSWORD}`, 
    
    },
  });

  const mail = {
    from: `${process.env.EMAIL_NAME}   <${process.env.EMAIL}>`,
    to: email, 
    subject, 
    text:"OnBording mail",
    html:await String(html), 
  };

  try {
    await transporter.sendMail(mail)  
  } catch (error) {
    console.log(
      "Email service failed silently. Make sure you have provided your Valid Details On .env file "
    );
    console.log("Error: ", error);

  }
};



export const WelcomeEmailSend = (name:string) => {
  return `<h1 style="text-align:center; color:black;">Hello ${name}</h1>
        
        <h3 style=color:#525f7f>Welcome to our website ${name} ! We're very excited to have you on board</h3>.
        <hr style="width:100%;border:none;border-top:1px solid #eaeaea;border-color:#e6ebf1;margin:20px 0" />
        <p style="font-size:16px;line-height:24px;margin:16px 0;color:#525f7f;text-align:left">Thanks for submitting your account information. You&#x27;re now ready to manage your expense smoothly!</p>

        <p style="font-size:16px;line-height:24px;margin:16px 0;color:#525f7f;text-align:left">You can access Your Account from The Website Fully</p>

        <a href=${websiteUrl} style="background-color:#656ee8;border-radius:5px;color:#fff;font-size:16px;font-weight:bold;text-decoration:none;text-align:center;display:inline-block;width:100%;padding:10px 10px 10px 10px;line-height:100%;max-width:100%" target="_blank"><span><!--[if mso]><i style="letter-spacing: 10px;mso-font-width:-100%;mso-text-raise:15" hidden>&nbsp;</i><![endif]--></span><span style="max-width:95%;display:inline-block;line-height:120%;mso-padding-alt:0px;mso-text-raise:7.5px">View Your Account</span><span><!--[if mso]><i style="letter-spacing: 10px;mso-font-width:-100%" hidden>&nbsp;</i><![endif]--></span></a>
<hr style="width:100%;border:none;border-top:1px solid #eaeaea;border-color:#e6ebf1;margin:20px 0" />

        <p style="font-size:16px;line-height:24px;margin:16px 0;color:#525f7f;text-align:left">Once you&#x27;re verify email, you can start  <!-- -->.</p>
        <p style="font-size:16px;line-height:24px;margin:16px 0;color:#525f7f;text-align:left">— ${websiteName} </p>
        <hr style="width:100%;border:none;border-top:1px solid #eaeaea;border-color:#e6ebf1;margin:20px 0" />
        <p style="font-size:12px;line-height:16px;margin:16px 0;color:#8898aa">${websiteName} Agartala Tripura West </p>
        <h3>Need help, or have questions? Just reply to this email, we'd love to help.</h3>
        
`
}




export const  emailVerificationEmailProducer= (name:string , Otp:string ) => {
  const websiteName = "Expense Tracker by Joydeep"
  
  return {
    body: {
      name:`Hello ${name} `,
      intro: `<h3 style=color:#525f7f>Please verify your email</h3>.`,
      action: {
        instructions:` <hr style="width:100%;border:none;border-top:1px solid #eaeaea;border-color:#e6ebf1;margin:20px 0" />
        <p style="font-size:16px;line-height:24px;margin:16px 0;color:#525f7f;text-align:left">Thanks you for using our services </p>

        <p style="font-size:16px;line-height:24px;margin:16px 0;color:#525f7f;text-align:left">Please verify your email from the given link before expire </p>

         <h1 style="background-color:#656ee8;border-radius:5px;color:#fff;font-size:16px;font-weight:bold;text-decoration:none;text-align:center;display:inline-block;width:100%;padding:10px 10px 10px 10px;line-height:100%;max-width:100%" ><span><!--[if mso]><i style="letter-spacing: 10px;mso-font-width:-100%;mso-text-raise:15" hidden>&nbsp;</i><![endif]--></span><span style="max-width:100%;display:inline-block;line-height:120%;mso-padding-alt:0px;mso-text-raise:7.5px">OTP ${Otp}</span><span><!--[if mso]><i style="letter-spacing: 10px;mso-font-width:-100%" hidden>&nbsp;</i><![endif]--></span></h1>

        <hr style="width:100%;border:none;border-top:1px solid #eaeaea;border-color:#e6ebf1;margin:20px 0" />


        <p style="font-size:16px;line-height:24px;margin:16px 0;color:#525f7f;text-align:left">Once you&#x27;re verify email, you can check our great students <!-- -->.</p>


        <p style="font-size:16px;line-height:24px;margin:16px 0;color:#525f7f;text-align:left">— ${websiteName} </p>
        <hr style="width:100%;border:none;border-top:1px solid #eaeaea;border-color:#e6ebf1;margin:20px 0" />
        <p style="font-size:12px;line-height:16px;margin:16px 0;color:#8898aa">${websiteName} Agartala Tripura West </p>`,
        button: {
          
          color: "#525f7f", // Optional action button color
          text: "Go to website",
          link:"https://expense-tracker-5ojq.vercel.app/"
        },
      outro:
        "Need help, or have questions? Just reply to this email, we'd love to help.",
    },
  }
};
}



export const  passwordResetEmail= (name:string , resetLink:string ) => {
return ` 
<h1 style="text-align:center; color:black;">Hello ${name}</h1>
<h3 style=color:#525f7f>Welcome to our website ${name} ! We're very excited to have you on board</h3>.
<hr style="width:100%;border:none;border-top:1px solid #eaeaea;border-color:#e6ebf1;margin:20px 0" />
<hr style="width:100%;border:none;border-top:1px solid #eaeaea;border-color:#e6ebf1;margin:20px 0" />
<p style="font-size:16px;line-height:24px;margin:16px 0;color:#525f7f;text-align:left">Thanks you for using our services </p>
<p style="font-size:16px;line-height:24px;margin:16px 0;color:#525f7f;text-align:left">Please reset your password </p>



<hr style="width:100%;border:none;border-top:1px solid #eaeaea;border-color:#e6ebf1;margin:20px 0" />


<p style="font-size:16px;line-height:24px;margin:16px 0;color:#525f7f;text-align:left">if you reset your password you can restart your services <!-- -->.</p>


<p style="font-size:16px;line-height:24px;margin:16px 0;color:#525f7f;text-align:left">— ${websiteName} </p>
<hr style="width:100%;border:none;border-top:1px solid #eaeaea;border-color:#e6ebf1;margin:20px 0" />
<p style="font-size:12px;line-height:16px;margin:16px 0;color:#8898aa">${websiteName} Agartala Tripura West </p>
<a href=${`${websiteName}/forgot-password/${resetLink}`} style="background-color:#656ee8;border-radius:5px;color:#fff;font-size:16px;font-weight:bold;text-decoration:none;text-align:center;display:inline-block;width:100%;padding:10px 10px 10px 10px;line-height:100%;max-width:100%" target="_blank"><span><!--[if mso]><i style="letter-spacing: 10px;mso-font-width:-100%;mso-text-raise:15" hidden>&nbsp;</i><![endif]--></span><span style="max-width:95%;display:inline-block;line-height:120%;mso-padding-alt:0px;mso-text-raise:7.5px">Reset your password</span><span><!--[if mso]><i style="letter-spacing: 10px;mso-font-width:-100%" hidden>&nbsp;</i><![endif]--></span></a>
<hr style="width:100%;border:none;border-top:1px solid #eaeaea;border-color:#e6ebf1;margin:20px 0" />

        
        <p style="font-size:16px;line-height:24px;margin:16px 0;color:#525f7f;text-align:left">— ${websiteName} </p>
        <hr style="width:100%;border:none;border-top:1px solid #eaeaea;border-color:#e6ebf1;margin:20px 0" />
        <p style="font-size:12px;line-height:16px;margin:16px 0;color:#8898aa">${websiteName} Agartala Tripura West </p>
        <h3>Need help, or have questions? Just reply to this email, we'd love to help.</h3>


`
}
//  <a href=${resetLink} style="background-color:#656ee8;border-radius:5px;color:#fff;font-size:16px;font-weight:bold;text-decoration:none;text-align:center;display:inline-block;width:100%;padding:10px 10px 10px 10px;line-height:100%;max-width:100%"><span><!--[if mso]><i style="letter-spacing: 10px;mso-font-width:-100%;mso-text-raise:15" hidden>&nbsp;</i><![endif]--></span><span style="max-width:100%;display:inline-block;line-height:120%;mso-padding-alt:0px;mso-text-raise:7.5px">reset now</span><span><!--[if mso]><i style="letter-spacing: 10px;mso-font-width:-100%" hidden>&nbsp;</i><![endif]--></span> />

