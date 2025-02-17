export const emailContent = `<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <title>Verify Your Email</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4
        }

        .container {
            max-width: 600px;
            margin: 20px auto;
            background-color: #fff;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 2px 10px rgba(0, 0, 0, .1)
        }

        .header {
            background-color: #fff;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 10px 20px
        }

        .header .logo svg {
            width: 150px
        }

        .header .login-button {
            background-color: #f7931e;
            color: #fff;
            text-decoration: none;
            padding: 8px 16px;
            border-radius: 4px;
            font-size: 14px
        }

        .verifybtn {
            width: 80%;
            padding: 19px 24px !important;
            border-radius: 8px !important
        }

        .hero {
            background-color: #007bff;
            color: #fff;
            text-align: center;
            padding: 30px;
            margin: 20px;
            border-radius: 8px
        }

        .hero h1 {
            margin: 0;
            font-size: 24px
        }

        .content {
            text-align: center;
            padding: 20px
        }

        .content h2 {
            font-size: 20px;
            color: #333;
            margin-bottom: 20px
        }

        .content p {
            font-size: 16px;
            color: #555;
            margin-bottom: 20px
        }

        .button {
            display: inline-block;
            background-color: #f7931e;
            color: #fff;
            text-decoration: none;
            padding: 12px 24px;
            border-radius: 4px;
            font-size: 16px
        }

        .button:hover {
            background-color: #d67812
        }

        .footer {
            text-align: center;
            padding: 20px;
            font-size: 14px;
            color: #999
        }

        .footer a {
            color: #007bff;
            text-decoration: none
        }

        .social-icons {
            margin: 20px 0
        }

        .social-icons img {
            width: 24px;
            margin: 0 10px
        }

        .language-options {
            font-size: 12px;
            margin-top: 10px
        }

        .hero img {
            max-width: 375px
        }

        .svg-hover svg path {
            fill: #8cb9ff;
            transition: fill .3s ease
        }

        .svg-hover:hover svg path {
            fill: #1554ff
        }
    </style>
</head>

<body>
    <div class="container">
        <div class="header">
            <div class="logo"><img src="{{frontendUrl}}logo.svg"></div><a
                href="#" class="login-button">Log In</a>
        </div>
        <div class="hero"><img src="{{frontendUrl}}hero.svg"></div>
        <div class="content">
            <p style="font-size:32px;margin:0 auto 30px auto;max-width:419px;color:#171717">Welcome! Please verify your
                email to activate your account.</p><a href="{{verificationLink}}" class="button verifybtn">Verify Your
                Email</a>
            <p style="color:#171717;margin-top:30px">If the button doesn’t work, click this link:<a
                    style="color:#171717" href="{{verificationLink}}">Verify Your Email</a></p>
        </div>
        <div class="footer">
            <div class="social-icons"><a href="#" class="svg-hover"><img
                        src="{{frontendUrl}}linkedin_on.svg"></a><a href="#"
                    class="svg-hover"><img
                        src="{{frontendUrl}}wahtsapp_off.svg"></a><a href="#"
                    class="svg-hover"><img
                        src="{{frontendUrl}}twitter_off.svg"></a><a href="#"
                    class="svg-hover"><img
                        src="{{frontendUrl}}infinity_off.svg"></a></div>
            <p>113 Cherry St, Seattle, WA 98014</p>
            <p><a href="#">Unsubscribe</a>|<a href="#">Manage Preferences</a></p>
            <p class="language-options">Update language | Cambiar el idioma | Changer la langue | Sprache ändern |
                言語を変更する</p>
        </div>
    </div>
</body>

</html>

`;

export const sendUserInvitationEmail = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Invitation Email</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; color: #333;">
<table align="center" border="0" cellpadding="0" cellspacing="0" width="600" style="border-collapse: collapse; background-color: #fff; margin: 20px auto; border-radius: 8px; overflow: hidden;">
<tr>
<table style="margin-top: 20px;" align="center" border="0" cellpadding="0" cellspacing="0" width="600">
   <tr>
      <td style="text-align: right;">
        <a href="[Login Link]" style="display: inline-block; padding: 10px 15px; font-size: 16px; color: #fff; text-decoration: none; border-radius: 5px; background-color: #ffa500; margin-bottom:10px; margin-right:10px;">
          Login
        </a>
      </td>
    </tr>
    <tr>
      <td style="padding: 20px; text-align: center; background-color: #0078f3; color: #fff;">
        <h1 style="margin: 0; font-size: 24px;">Welcome to Customer City</h1>
        <p style="margin: 5px 0 0; font-size: 18px; font-style: italic;">You're Invited!</p>
      </td>
    </tr>
    <tr>
      <td style="padding: 20px;">
        <p>Hi <strong>[First Name]</strong>,</p>
        <p>You’ve been invited to join Customer City! Your Data workspace for RevOps success.</p>
        <p>Here are your details:</p>
        <ul style="list-style-type: none; padding: 0;">
          <li style="margin-left:0">Email: <strong>[Email Address]</strong></li>
          <li style="margin-left:0">Assigned Role: <strong>[Role Name]</strong></li>
        </ul>
        <p>Click the button below to accept the invitation and complete your setup:</p>
        <table border="0" cellpadding="0" cellspacing="0" style="margin: 20px auto;">
          <tr>
            <td align="center" bgcolor="#ffa500" style="border-radius: 5px;">
              <a href="[Invitation Link]" style="display: inline-block; padding: 10px 20px; font-size: 16px; color: #fff; text-decoration: none; border-radius: 5px; background-color: #ffa500;">
                Accept Invitation
              </a>
            </td>
          </tr>
        </table>
      </td>
    </tr>
    <tr>
     <td style="padding: 20px; text-align: center; font-size: 16px; color: #666; font-weight: bold;">
        <p>If you’ve questions reach out to - <a href="mailto:support@customercity.com" style="color: #0078f3; text-decoration: none;">support@customercity.com</a></p>
    </td>
    </tr>
    <tr>
      <td style="padding: 20px; text-align: center; font-size: 12px; color: #666;">
        <div style="margin: 10px 0;">
          <a href="#" style="margin-right: 10px; color: #0078f3; text-decoration: none;">LinkedIn</a>
          <a href="#" style="margin-right: 10px; color: #0078f3; text-decoration: none;">Facebook</a>
          <a href="#" style="margin-right: 10px; color: #0078f3; text-decoration: none;">Twitter</a>
        </div>
        <p style="margin: 10px 0 0;">123 Cherry St, Seattle, WA 98014</p>
      </td>
    </tr>
    <tr>
    <td style="padding: 20px; text-align: center; font-size: 12px; color: #666;">
     <p><a href="#" style="margin-right:10px">Unsubscribe</a><a href="#"  style="margin-left:10px">Manage Preferences</a></p>
     <p class="language-options">Update language | Cambiar el idioma | Changer la langue | Sprache ändern |
                言語を変更する</p>
     </td>
    </tr>
  </table>
</body>
</html>`;


export const cancelUserInvitationEmail = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Invitation Cancelled</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; color: #333;">
<table align="center" border="0" cellpadding="0" cellspacing="0" width="600" style="border-collapse: collapse; background-color: #fff; margin: 20px auto; border-radius: 8px; overflow: hidden;">
<tr>
<table style="margin-top: 20px;" align="center" border="0" cellpadding="0" cellspacing="0" width="600">
   <tr>
      <td style="text-align: right;">
        <a href="[Login Link]" style="display: inline-block; padding: 10px 15px; font-size: 16px; color: #fff; text-decoration: none; border-radius: 5px; background-color: #ffa500; margin-bottom:10px; margin-right:10px;">
          Login
        </a>
      </td>
    </tr>
    <tr>
      <td style="padding: 20px; text-align: center; background-color: #0078f3; color: #fff;">
        <h1 style="margin: 0; font-size: 24px;">Invitation Cancelled</h1>
      </td>
    </tr>
    <tr>
      <td style="padding: 20px;">
        <p style="font-size:20px">Hi <strong>[First Name]</strong>,</p>
        <p style="font-size:20px"><strong>We wanted to inform you that your recent invitation has been cancelled.</strong></p>
      </td>
    </tr>
    <tr>
     <td style="padding: 20px; font-size: 20px; color: #666">
        <p>If you’ve questions or need further assistance, feel free to reach out to us at - <a href="mailto:support@customercity.com" style="color: #0078f3; text-decoration: underline;">support@customercity.com</a></p>
        <p>Thank you for understanding.</p>
      </td>
    </tr>
    <tr>
      <td style="padding: 20px; text-align: center; font-size: 12px; color: #666;">
        <div style="margin: 10px 0;">
          <a href="#" style="margin-right: 10px; color: #0078f3; text-decoration: none;">LinkedIn</a>
          <a href="#" style="margin-right: 10px; color: #0078f3; text-decoration: none;">Facebook</a>
          <a href="#" style="margin-right: 10px; color: #0078f3; text-decoration: none;">Twitter</a>
        </div>
        <p style="margin: 10px 0 0;">123 Cherry St, Seattle, WA 98014</p>
      </td>
    </tr>
    <tr>
    <td style="padding: 20px; text-align: center; font-size: 12px; color: #666;">
     <p><a href="#" style="margin-right:10px">Unsubscribe</a><a href="#"  style="margin-left:10px">Manage Preferences</a></p>
     <p class="language-options">Update language | Cambiar el idioma | Changer la langue | Sprache ändern |
                言語を変更する</p>
     </td>
    </tr>
  </table>
</body>
</html>`;
