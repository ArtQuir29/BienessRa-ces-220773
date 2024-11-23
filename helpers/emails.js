import nodemailer from 'nodemailer';

const registerEmail = async (data) => {
    const transport = nodemailer.createTransport({
        host: process.env.Email_HOST,
        port: process.env.Email_PORT,
        auth: {
            user: process.env.Email_USER,
            pass: process.env.Email_PASS,
        },
    });

    const { email, name, token } = data;

    // Enviar el email
    await transport.sendMail({
        from: 'BienesRaices_220773',
        to: email,
        subject: 'Confirma tu cuenta...',
        text: `Estimado ${name}, es necesario que confirme su cuenta para poder acceder.`,
        html: `
            <header style="font-family: bold; text-align: center; line-height: 0.5;">
                <h2>Bienes Raices</h2>
                <h3>Confirmación de correo</h3>
            </header>
            <div style="font-family: sans-serif; text-align: justify; line-height: 1.6; color: #333; background-color: #F8F7FF; padding: 25px; border: 10px solid #FFD8BE; border-radius: 5px;">
                <h2 style="color: black;">¡Hola, <span style="color: black;">${name}</span>!</h2>
                <div style="padding: 35px; border: dashed #FFD8BE; border-radius: 30px;">
                    <p style="font-size: 18px; color:black;">
                        ¡Gracias por registrarte en <strong>BienesRaices_220773</strong>! Para completar el proceso de confirmación de tu cuenta y acceder a todos nuestros servicios, necesitamos la confirmación de tu correo electrónico.
                    </p>
                    <div style="text-align: center; background: #FFD8BE; border: 1px solid #000; padding: 15px;">
                        <p style="font-size: 20px;">
                            Haz clic en el botón de abajo para confirmar tu cuenta:
                        </p>
                        <div style="text-align: center; margin: 20px 0;">
                            <a href="${process.env.BACKEND_URL}:${process.env.PORT ?? 3002}/auth/confirm/${token}" 
                               style="background-color: black; color: white; text-decoration: none; padding: 10px 20px; border-radius: 5px; font-size: 16px;">
                               Confirmar Cuenta
                            </a>
                        </div>
                    </div>
                    <p style="font-size: 18px; color: #666;">
                        Si no reconoces esta solicitud o no creaste la cuenta, puedes ignorar este mensaje. ¡Gracias por elegirnos! Estamos emocionados por poder ayudarte a encontrar la propiedad deseada.
                    </p>
                    <div style="text-align: center; line-height: 1.6;">
                        <p style="font-size: 20px; color: #666;">
                            Atentamente, <br>
                            <strong>Ailton Artiaga</strong>
                        </p>
                         <div style="margin-bottom: 15px;">
                            <img src="cid:firma" alt="Firma" style="max-width: 150px; border-radius: 5px;">
                        </div>
                    </div>
                </div>
            </div>
            <footer style="text-align: center;">
                @Todos los derechos reservados de BienesRaices_220773
            </footer>
        `,
    });
    
    
}    

attachments: [
    {
        filename: 'casa.png', 
        path: './public/assets/casa.png', 
        cid: 'casa' 
    },
    {
        filename: 'firma.png', 
        path: './public/assets/firma.png', 
        cid: 'firma'
    },
    {
        filename: 'tache.png', 
        path: './public/assets/tache.png', 
        cid: 'tache'
    }
]



export { registerEmail };
