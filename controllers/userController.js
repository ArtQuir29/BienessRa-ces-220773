import { check, validationResult } from "express-validator";
import User from "../models/User.js";
import { generateId } from "../helpers/tokens.js";
import { registerEmail } from "../helpers/emails.js";

const formularioLogin = (req, res) => {
    res.render('auth/login', {
        autenticado: true,
        page: "Ingresa a la Plataforma"
    });
};

const formularioRegister = (req, res) => {
    res.render('auth/register', {
        page: "Crea una Nueva Cuenta...",
        csrfToken: req.csrfToken()
    });
};

const formularioPasswordRecovery = (req, res) => {
    res.render('auth/passwordRecovery', {
        page: "Recuperación de Contraseña",
        csrfToken: req.csrfToken()
    });
};

const createNewUser = async (req, res) => {
    // Validación de los campos que se reciben del formulario
    await check('name').notEmpty().withMessage('El nombre no puede ir vacío').run(req); 
    await check('email').isEmail().withMessage('El correo electrónico no tiene el formato correcto').run(req);
    await check('password')
        .notEmpty().withMessage('La contraseña es un campo obligatorio')
        .isLength({ min: 8 }).withMessage('El Password debe ser de al menos 8 caracteres')
        .run(req);
    await check('confirmPassword')
        .equals(req.body.password).withMessage('La contraseña debe coincidir con la anterior')
        .run(req);

    const resultado = validationResult(req);

    // Verificamos si hay errores de validación
    if (!resultado.isEmpty()) {
        return res.render('auth/register', {
            page: 'Error al intentar crear una cuenta',
            csrfToken: req.csrfToken(),
            errors: resultado.array(),
            user: {
                name: req.body.name,
                email: req.body.email
            }
        });
    }

    const { name, email, password } = req.body;

    // Verificar si el usuario ya está registrado
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
        return res.render('auth/register', {
            page: 'Error al intentar crear una cuenta',
            csrfToken: req.csrfToken(),
            errors: [{ msg: 'El usuario ya está registrado' }],
            user: {
                name: req.body.name,
                email: req.body.email
            }
        });
    }

    // Crear nuevo usuario
    const newUser = await User.create({
        name,
        email,
        password,
        token: generateId()
    });

    // Enviar email de confirmación
    registerEmail({
        name: newUser.name,
        email: newUser.email,
        token: newUser.token
    });

    // Mostrar mensaje de confirmación
    res.render('templates/message.pug', {
        page: 'Cuenta Creada Correctamente',
        msg: `Hemos enviado un Email de Confirmación a ${email}. Presione en el enlace para confirmar su cuenta.`
    });
};

const confirm = async (req, res) => {
    const { token } = req.params;

    // Verificar si el token es válido
    const user = await User.findOne({ where: { token } });
    if (!user) {
        return res.render('auth/confirmAccount', {
            page: 'Error al confirmar tu cuenta',
            msg: 'Hubo un error al confirmar tu cuenta, intenta de nuevo.',
            error: true
        });
    }

    // Confirmar cuenta
    user.token = null;
    user.confirmed = true;
    await user.save();
    res.render('auth/confirmAccount', {
        page: 'Cuenta Confirmada',
        msg: 'La cuenta se ha confirmado correctamente.',
        
    });
};

export {
    formularioLogin,
    formularioRegister,
    formularioPasswordRecovery,
    createNewUser,
    confirm, // Cambiar confirmAccount a confirm
};
