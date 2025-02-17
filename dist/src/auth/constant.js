"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.emailContent = void 0;
exports.emailContent = `<!DOCTYPE html>
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
//# sourceMappingURL=constant.js.map