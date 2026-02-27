# Style Mail

Style Mail is a lightweight web application for composing and sending styled HTML emails through a simple web interface. It combines a rich-text editor (CKEditor) for message design with PHPMailer for sending messages via SMTP, so users can create visually rich emails without writing HTML by hand.

Demo: https://stylemail.herokuapp.com/

**Features**

- **Rich HTML editor:** Create and style email content using CKEditor.
- **SMTP sending:** Sends email through any SMTP server supported by PHPMailer.
- **Simple web UI:** Minimal form to enter sender credentials, recipient address, subject and message.

**Tech stack**

- **Frontend:** CKEditor 5, Bootstrap, plain JavaScript
- **Backend:** PHP + PHPMailer
- **Build tools:** Node.js + webpack (for custom CKEditor build)

**Requirements**

- PHP 7.2+ with CLI and web support
- Composer (for PHP dependencies)
- Node.js and npm (only required if you want to rebuild the custom CKEditor)

**Quick installation (development)**

1. Clone the repository:

   git clone https://github.com/your-user/style-mail.git
   cd style-mail

2. Install PHP dependencies with Composer:

   composer install

3. (Optional) Install Node dependencies and build CKEditor if you make editor changes:

   npm install
   npm run build

4. Serve the app locally using PHP's built-in server:

   php -S localhost:8000

   Then open http://localhost:8000 in your browser.

**Configuration**

- The mail sending logic is in [mailer.php](mailer.php). By default it expects a JSON POST with the following fields:
  - `email_remetente` — sender email (used as SMTP username)
  - `senha_remetente` — sender password (SMTP password)
  - `email_destinatario` — recipient email
  - `assunto` — subject
  - `mensagem` — HTML message body

- SMTP defaults in `mailer.php` are set to `smtp.office365.com` with TLS on port `587`. To use a different SMTP provider, edit the `Host`, `Port`, and `SMTPSecure` settings in [mailer.php](mailer.php).

**Usage**

- Open the web UI, fill in sender credentials (email and password), recipient email, subject and compose the message using the editor. Click "Send" to dispatch the email.
- The frontend posts a JSON payload to `mailer.php`, which uses PHPMailer to perform the SMTP transaction.

**Security notes**

- The app currently asks users to provide their email password in the browser and forwards it to the server for SMTP authentication. This is insecure for production use. Consider using:
  - a dedicated SMTP account with restricted privileges,
  - OAuth2-based SMTP authentication where supported,
  - or a server-side, environment-based SMTP credential configuration (do not transmit passwords from clients).

**Deployment**

- A `Procfile` is included for deploying to Heroku using the PHP buildpack. Ensure environment variables and SMTP credentials are configured securely in your hosting environment.

**Contributing**

- Contributions are welcome. Fork the repo, create a feature branch, and open a pull request. If you modify the CKEditor build, run `npm run build` and include the updated `js/build/ckeditor.js` output.

**License**

- This project is licensed under GNU GPL v3.0 (see [composer.json](composer.json)).

**Author**

- Mateus Pereira
