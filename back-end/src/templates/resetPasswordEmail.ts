export const getResetPasswordTemplate = (code:string, name:string) =>{
    return `<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Reset Your Password</title>
                <style>
            
                    body {
                        font-family: Arial, sans-serif;
                        background-color: #f4f4f4;
                        margin: 0;
                        padding: 0;
                        color: #333;
                    }
                    .email-container {
                        width: 100%;
                        max-width: 600px;
                        margin: 0 auto;
                        background-color: #ffffff;
                        padding: 20px;
                        border-radius: 10px;
                        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
                    }
                    .email-header {
                        text-align: center;
                        padding-bottom: 20px;
                    }
                    .email-header h1 {
                        margin: 0;
                        color: #333;
                    }
                    .email-body {
                        padding: 20px;
                        line-height: 1.6;
                    }
                    .email-body p {
                        margin: 0 0 15px 0;
                    }
                    .activate-button {
                        display: inline-block;
                        padding: 12px 25px;
                        font-size: 16px;
                        color: #ffffff;
                        background-color: #4da136;
                        text-decoration: none;
                        border-radius: 5px;
                        margin-top: 20px;
                        transition: background-color 300ms;
                    }
                    .activate-button:hover {
                        background-color: #397c27;
                    }
                    a{
                    color: white;
                    }
                </style>
            </head>
            <body>
            <div class="email-container">
                <div class="email-header">
                    <h1>Reset Your Password</h1>
                </div>
                <div class="email-body">
                    <p>Hi ${name},</p>
                    <p>We received a request to reset your password. Your personal code is below.</p>
                    <p>If you did not create an account with us, please ignore this email.</p>
                    <p style="text-align: center;">
                       ${code}
                    </p>
                </div>
            
            </div>
            </body>
            </html>`
}