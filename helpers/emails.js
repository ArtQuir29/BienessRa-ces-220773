import nodemailer from 'nodemailer'
import dotenv from 'dotenv'

dotenv.config({path: '.env'})

const emailAfterRegister = async (newUserData) => {
    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST, 
        port: process.env.EMAIL_PORT,
        auth:{
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    })

    //console.log(data)
    const {email, name, token} = newUserData

     // Enviar el email
   //Enviar el email
   await transport.sendMail({
    from: 'BienesRaices_220773',
    to: email,
    subject: 'Bienvenido/a al BienesRaices_220773',
    text: `Hola ${name}, bienvenido/a a la plataforma de Bienes Raíces. Solo necesitamos que confirmes tu cuenta dando click en el siguiente enlace: ${process.env.BACKEND_DOMAIN}:${process.env.BACKEND_PORT}/auth/confirmAccount/${token}. Si no has creado esta cuenta, ignora este mensaje.`,
    html: `
        <div style="background-color: #FFEEDD; padding: 20px; font-family: Arial, sans-serif; border: 1px solid #FFD8BE; border-radius: 5px;">
            <p style="color: #444; font-size: 18px;">
                Hola, <span style="font-weight: bold; color: #FF5733;">${name}</span>,
            </p>
            <p style="color: #444; font-size: 16px;">
                Bienvenido/a a la plataforma de <strong>Bienes Raíces</strong>, el sitio seguro donde podrás buscar, comprar y ofertar propiedades a través de internet.
            </p>
            <p style="color: #444; font-size: 16px;">
                Ya solo necesitamos que confirmes la cuenta que creaste dando click en el siguiente botón:
            </p>
            <p style="text-align: center;">
                <a href="${process.env.BACKEND_DOMAIN}:${process.env.BACKEND_PORT}/auth/confirmAccount/${token}" 
                   style="display: inline-block; background-color: #FFD8BE; color: #333; text-decoration: none; padding: 10px 20px; border-radius: 5px; font-size: 16px; font-weight: bold; border: 1px solid #FF5733;">
                    Confirmar Cuenta
                </a>
            </p>
            <p style="color: #444; font-size: 16px;">
                Si tú no has creado esta cuenta, por favor ignora este mensaje.
            </p>
        </div>
    `
}); }


const emailChangePassword = async (userData) => {
    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST, 
        port: process.env.EMAIL_PORT,
        auth:{
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    })

    //console.log(data)
    const {email, name, token} = userData

    //Enviar el email
    await transport.sendMail({
        from: '"BienesRaíces_220773"', // Correo y nombre visible
        to: email,
        subject: 'Solicitud de actualización de contraseña en BienesRaíces_220773',
        text: `Hola ${name}, haz reportado el olvido o pérdida de tu contraseña para acceder a tu cuenta de Bienes Raíces. Por favor, actualiza tu contraseña usando el siguiente enlace: ${process.env.BACKEND_DOMAIN}:${process.env.BACKEND_PORT}/auth/passwordRecovery/${token}`,
        html: `
            <div style="background-color: #FFEEDD; padding: 20px; font-family: Arial, sans-serif; border: 1px solid #FFD8BE; border-radius: 5px;">
                <p style="color: black; font-size: 18px;">Hola, <span style="font-weight: bold; color: black;">${name}</span>,</p>
                <p style="color: #444; font-size: 16px;">
                    Haz reportado el olvido o pérdida de tu contraseña para acceder a tu cuenta de <strong>Bienes Raíces</strong>.
                </p>
                <p style="color: #444; font-size: 16px;">
                    Por favor, ingresa al siguiente enlace para actualizar tu contraseña:
                </p>
                <p>
                    <a href="${process.env.BACKEND_DOMAIN}:${process.env.BACKEND_PORT}/auth/passwordRecovery/${token}" 
                       style="background-color: #FFD8BE; color: #333; text-decoration: none; padding: 10px 15px; border-radius: 5px; font-size: 16px;">
                        Actualizar Contraseña
                    </a>
                </p>
            </div>
        `
    });
}    
export {emailAfterRegister, emailChangePassword}