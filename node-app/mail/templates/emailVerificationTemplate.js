const otpTemplate = (otp) => {
	return `<!DOCTYPE html>
	<html>
	
	<head>
		<meta charset="UTF-8">
		<title>OTP Verification Email - Boookish</title>
		<style>
			body {
				background-color: #f4f7f6;
				font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
				font-size: 16px;
				line-height: 1.6;
				color: #1e293b;
				margin: 0;
				padding: 0;
			}
	
			.container {
				max-width: 600px;
				margin: 40px auto;
				padding: 0;
				background-color: #ffffff;
				border-radius: 12px;
				overflow: hidden;
				box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
			}
	
			.header {
				
				text-align: center;
			}
	
			.logo {
				max-width: 220px;
				height: auto;
				display: block;
				margin: 0 auto;
			}
	
			.content {
				padding: 40px 30px;
				text-align: center;
			}
	
			.message {
				font-size: 24px;
				font-weight: 700;
				margin-bottom: 20px;
				color: #1e293b;
			}
	
			.body {
				font-size: 16px;
				color: #475569;
				margin-bottom: 30px;
				text-align: left;
			}
	
			.otp-box {
				background-color: #fef2f2;
				border: 2px dashed #E74C3C;
				border-radius: 8px;
				padding: 20px;
				margin: 30px 0;
				display: inline-block;
				min-width: 200px;
			}
	
			.highlight {
				font-size: 36px;
				font-weight: 800;
				color: #E74C3C;
				letter-spacing: 6px;
				margin: 0;
			}
	
			.footer {
				background-color: #f8fafc;
				padding: 30px;
				text-align: center;
				font-size: 14px;
				color: #94a3b8;
				border-top: 1px solid #e2e8f0;
			}
	
			.support {
				color: #94a3b8;
				margin-bottom: 10px;
			}
	
			.support a {
				color: #E74C3C;
				text-decoration: none;
				font-weight: 600;
			}
	
			.social-links {
				margin-top: 20px;
			}
	
			@media only screen and (max-width: 600px) {
				.container {
					margin: 0;
					width: 100%;
					border-radius: 0;
				}
				.content {
					padding: 30px 20px;
				}
			}
		</style>
	
	</head>
	
	<body>
		<div class="container">
			<div class="header">
				<!-- Replace with your hosted logo URL: https://i.ibb.co/.../Bookish-logo.png -->
				<img class="logo" src="https://i.ibb.co/FbKb4T1T/Bookish-logo1.png" alt="Boookish Logo">
			</div>
			<div class="content">
				<div class="message">Verify Your Account</div>
				<div class="body">
					<p>Hi there,</p>
					<p>Welcome to <strong>Boookish</strong>! We're thrilled to have you join our community of book lovers. To get started and unlock all features, please verify your email address using the code below:</p>
					<center>
						<div class="otp-box">
							<h2 class="highlight">${otp}</h2>
						</div>
					</center>
					<p>This code is valid for <strong>5 minutes</strong>. If you didn't create an account with us, you can safely ignore this email.</p>
				</div>
			</div>
			<div class="footer">
				<div class="support">
					Questions? We're here to help! <br>
					Email us at <a href="mailto:support@boookish.com">support@boookish.com</a>
				</div>
				<p>&copy; ${new Date().getFullYear()} Boookish. All rights reserved.</p>
			</div>
		</div>
	</body>
	
	</html>`;
};
module.exports = otpTemplate;
