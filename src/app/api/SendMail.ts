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
  // const mailGenerator = new Mailgen({
  //   theme: "default",
  //   product: {
  //     name: "Joydeep Debnath", 
  //     link: "youtube.com", // in this you have to enter your website email
  //   },
  // });

  // const emailTextual = mailGenerator.generatePlaintext(mailgenContent);

  // Generate an HTML email with the provided contents
  // const emailHtml = mailGenerator.generate(mailgenContent);

  // Create a nodemailer transporter instance which is responsible to send a mail
  const transporter = nodemailer.createTransport({
    host:"Joydeep", // Enter Your Name 
    service: 'Gmail',
    port:456,
    secure:true,
    auth: {
        user: "fakegamil32@gmail.com", // Just enter Your email // in which You want to share your email
        pass:"coinpjqbzbhwfjbl",  // You Have To Create Password  Stepts --> go to Email Click your gmail and after that manage my account and after that click on security and find App PassWord And Create A Password And Paste Here Or .env File 
    
    },
  });

  const mail = {
    from: `Joydeep Debanth   <fakegamil32@gmail.com>`, // We can name this anything. The mail will go to your Mailtrap inbox
    to: email, // receiver's mail
    subject, // mail subject
    text:"OnBording mail", // mailgen content textual variant
    html:await String(html), // mailgen content html variant
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
  const websiteName = "https://expense-tracker-5ojq.vercel.app/"

  return {
    body: {
      name:`Hello ${name}`,
      intro: `<h3 style=color:#525f7f>Please reset your password</h3>.`,
      action: {
        instructions:` <hr style="width:100%;border:none;border-top:1px solid #eaeaea;border-color:#e6ebf1;margin:20px 0" />
        <p style="font-size:16px;line-height:24px;margin:16px 0;color:#525f7f;text-align:left">Thanks you for using our services </p>
        <p style="font-size:16px;line-height:24px;margin:16px 0;color:#525f7f;text-align:left">Please reset your password </p>
        <h1 style="background-color:#656ee8;border-radius:5px;color:#fff;font-size:16px;font-weight:bold;text-decoration:none;text-align:center;display:inline-block;width:100%;padding:10px 10px 10px 10px;line-height:100%;max-width:100%"><span><!--[if mso]><i style="letter-spacing: 10px;mso-font-width:-100%;mso-text-raise:15" hidden>&nbsp;</i><![endif]--></span><span style="max-width:100%;display:inline-block;line-height:120%;mso-padding-alt:0px;mso-text-raise:7.5px"> OPT ${resetLink}</span><span><!--[if mso]><i style="letter-spacing: 10px;mso-font-width:-100%" hidden>&nbsp;</i><![endif]--></span></h1>

        <hr style="width:100%;border:none;border-top:1px solid #eaeaea;border-color:#e6ebf1;margin:20px 0" />


        <p style="font-size:16px;line-height:24px;margin:16px 0;color:#525f7f;text-align:left">if you reset your password you can restart your services <!-- -->.</p>


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


// export const WelcomeEmailSend = (name:string, redirectLink:string) => {
//   const websiteUrl = "http"
//   const websiteName = "Tripura Ecom "
//   return {
//     body: {
//       name:`${name}`,
//       intro: `<h3 style=color:#525f7f>Welcome to our app ${name} ! We're very excited to have you on board</h3>.`,
//       action: {
//         instructions:` <hr style="width:100%;border:none;border-top:1px solid #eaeaea;border-color:#e6ebf1;margin:20px 0" />
//         <p style="font-size:16px;line-height:24px;margin:16px 0;color:#525f7f;text-align:left">Thanks for submitting your account information. You&#x27;re now ready to make live orders in our website!</p>

//         <p style="font-size:16px;line-height:24px;margin:16px 0;color:#525f7f;text-align:left">You can access Your Account from The Website</p>

//         <a href=${websiteUrl} style="background-color:#656ee8;border-radius:5px;color:#fff;font-size:16px;font-weight:bold;text-decoration:none;text-align:center;display:inline-block;width:100%;padding:10px 10px 10px 10px;line-height:100%;max-width:100%" target="_blank"><span><!--[if mso]><i style="letter-spacing: 10px;mso-font-width:-100%;mso-text-raise:15" hidden>&nbsp;</i><![endif]--></span><span style="max-width:100%;display:inline-block;line-height:120%;mso-padding-alt:0px;mso-text-raise:7.5px">View Your Account</span><span><!--[if mso]><i style="letter-spacing: 10px;mso-font-width:-100%" hidden>&nbsp;</i><![endif]--></span></a>

//         <hr style="width:100%;border:none;border-top:1px solid #eaeaea;border-color:#e6ebf1;margin:20px 0" />

//         <p style="font-size:16px;line-height:24px;margin:16px 0;color:#525f7f;text-align:left">You havn't finished your email verification yet <!-- --> <a href=${websiteUrl} style="color:#556cd6;text-decoration:none" target="_blank">click here to verify email </a>.</p>

//         <p style="font-size:16px;line-height:24px;margin:16px 0;color:#525f7f;text-align:left">Once you&#x27;re verify email, you can recive the order conformation email <!-- -->.</p>


//         <p style="font-size:16px;line-height:24px;margin:16px 0;color:#525f7f;text-align:left">— ${websiteName} </p>
//         <hr style="width:100%;border:none;border-top:1px solid #eaeaea;border-color:#e6ebf1;margin:20px 0" />
//         <p style="font-size:12px;line-height:16px;margin:16px 0;color:#8898aa">${websiteName} Agartala Tripura West </p>
// `,
//         button: {
          
//           color: "#525f7f", // Optional action button color
//           text: "Thank You ",
//           // link: verificationUrl,
//           link:redirectLink
//         },
//       },
//       outro:
//         "Need help, or have questions? Just reply to this email, we'd love to help.",
//     },
//   };
// };

